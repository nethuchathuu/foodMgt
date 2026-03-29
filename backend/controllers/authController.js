const User = require('../models/User');
const Person = require('../models/Person');
const Organization = require('../models/Organization');
const Restaurant = require('../models/Restaurant');
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
    const { name, email, password, role, profileData } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const isVerified = role !== 'restaurant'; // automatically verified unless restaurant

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role, 
      isVerified
    });

    await user.save();

    // Create related profile entity based on role
    if (role === 'requester_person') {
      await Person.create({
         userId: user._id,
         fullName: profileData?.fullName || name,
         email: email,
         gender: profileData?.gender || 'Unknown',
         ...profileData
      });
    } else if (role === 'requester_org') {
      await Organization.create({
         userId: user._id,
         orgName: profileData?.orgName || name,
         officialEmail: email,
         ...profileData
      });
    } else if (role === 'restaurant') {
      const restaurantPayload = {
         userId: user._id,
         restaurantName: profileData?.restaurantName || name,
         registeredId: profileData?.registeredId,
         address: profileData?.address,
         restaurantEmail: profileData?.restaurantEmail || email,
         phoneNumber: profileData?.phoneNumber,
         description: profileData?.description,
         mealTypes: profileData?.mealTypes || [],
         owner: profileData?.owner || {}
      };
      
      // Prevent Mongoose CastError on empty Date strings
      if (restaurantPayload.owner && !restaurantPayload.owner.dob) {
         delete restaurantPayload.owner.dob;
      }

      await Restaurant.create(restaurantPayload);
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

    // Find user
    const user = await User.findOne({ email });
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