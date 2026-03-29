const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Initial setup to create default admin if not exists
exports.setupDefaultAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      const newAdmin = new Admin({ username: 'admin', password: hashedPassword });
      await newAdmin.save();
      console.log('Default admin created (admin / admin123)');
    }
  } catch (error) {
    console.error('Error setting up default admin:', error);
  }
};

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '7d' }
    );

    return res.json({
      message: 'Admin login successful',
      token,
      user: {
        id: admin._id,
        name: admin.username,
        role: admin.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Admin login failed' });
  }
};
