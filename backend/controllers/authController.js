const User = require('../models/User');
const Person = require('../models/Person');
const Organization = require('../models/Organization');
const Restaurant = require('../models/Restaurant');
const Notification = require('../models/Notification');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🔐 Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'secret123',
    { expiresIn: '7d' }
  );
};

// ===============================
// 🟢 REGISTER (Restaurant / Organization / User)
// ===============================
exports.registerUser = async (req, res) => {
  try {
    // When using Multer, JSON payloads from FormData might be in req.body or explicitly parsed
    let { name, email, password, role, profileData } = req.body;
    
    if (typeof profileData === 'string') {
       try {
         profileData = JSON.parse(profileData);
       } catch (e) {
         console.warn("Failed to parse profileData string");
         profileData = {};
       }
    }

    const normalizedEmail = email ? email.trim().toLowerCase() : '';

    // Check existing user
    const existingUser = await User.findOne({ email: new RegExp('^' + normalizedEmail + '$', 'i') });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const isVerified = !(role === 'restaurant' || role === 'requester_org'); // automatically verified unless restaurant or org
    const status = isVerified ? 'Active' : 'Pending';

    // Create user
    const user = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role, 
      isVerified,
      status
    });

    await user.save();

    // Create related profile entity based on role
    if (role === 'requester_person') {
      await Person.create({
         userId: user._id,
         fullName: profileData?.fullName || name,
         email: normalizedEmail,
         gender: profileData?.gender || 'Unknown',
         ...profileData
      });
    } else if (role === 'requester_org') {
      await Organization.create({
         userId: user._id,
         orgName: profileData?.orgName || name,
         officialEmail: normalizedEmail,
         ...profileData
      });

      await Notification.create({
        type: 'Organization Approval',
        category: 'Approvals',
        title: 'Organization Pending Review',
        message: `${profileData?.orgName || name} submitted a request to join the platform.`,
        priority: 'High',
        link: '/admin/organizations'
      });
    } else if (role === 'restaurant') {
      const restaurantPayload = {
         userId: user._id,
         restaurantName: profileData?.restaurantName || name,
         registeredId: profileData?.registeredId,
         address: profileData?.address,
         restaurantEmail: profileData?.restaurantEmail || normalizedEmail,
         phoneNumber: profileData?.phoneNumber,
         description: profileData?.description,
         mealTypes: typeof profileData?.mealTypes === 'string' ? JSON.parse(profileData.mealTypes) : (profileData?.mealTypes || []),
         owner: typeof profileData?.owner === 'string' ? JSON.parse(profileData.owner) : (profileData?.owner || {})
      };

      // Handle Multer files tracking
      if (req.files) {
        if (req.files.documents) {
          restaurantPayload.documents = req.files.documents.map(file => ({
            fileName: file.originalname,
            fileUrl: file.path.replace(/\\/g, '/'),
            fileType: file.mimetype
          }));
        }
        if (req.files.profileImage && req.files.profileImage[0]) {
          const pImage = req.files.profileImage[0];
          restaurantPayload.owner.profileImage = {
            fileName: pImage.originalname,
            fileUrl: pImage.path.replace(/\\/g, '/'),
            fileType: pImage.mimetype
          };
        }
      }
      
      // Prevent Mongoose CastError on empty Date strings
      if (restaurantPayload.owner && !restaurantPayload.owner.dob) {
         delete restaurantPayload.owner.dob;
      }

      await Restaurant.create(restaurantPayload);

      await Notification.create({
        type: 'Restaurant Approval',
        category: 'Approvals',
        title: 'New Restaurant Registration',
        message: `${profileData?.restaurantName || name} has registered and is waiting for your approval.`,
        priority: 'High',
        link: '/admin/restaurants'
      });
    }

    res.status(201).json({
      message: `${role} registered successfully.`,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// ===============================
// 🔵 LOGIN
// ===============================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email ? email.trim().toLowerCase() : '';

    // Find user
    const user = await User.findOne({ email: new RegExp('^' + normalizedEmail + '$', 'i') });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check approval (for restaurant)
    if (user.role === 'restaurant' && !user.isVerified) {
      return res.status(403).json({ message: 'Account not approved yet by admin' });
    }

    // Generate token
    const token = generateToken(user);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
};