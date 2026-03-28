const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🔐 Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};


// ===============================
// 🟢 REGISTER (Restaurant / Organization / User)
// ===============================
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role, // "restaurant" | "requester"
      isVerified: role === 'requester' ? true : false // only admin approves restaurant
    });

    await user.save();

    res.status(201).json({
      message: `${role} registered successfully. Waiting for admin approval.`,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
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


// ===============================
// 🔴 ADMIN LOGIN (hardcoded as requested)
// ===============================
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (username === 'admin' && password === 'admin123') {
      const token = jwt.sign(
        { id: 'admin_id_hardcoded', role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        message: 'Admin login successful',
        token,
        user: {
          id: 'admin_id_hardcoded',
          name: 'Admin',
          role: 'admin'
        }
      });
    } else {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Admin login failed' });
  }
};