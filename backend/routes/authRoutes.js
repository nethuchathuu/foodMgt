const express = require('express');
const router = express.Router();
const { registerUser, loginUser, adminLogin } = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register a user (restaurant, requester)
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login a user
router.post('/login', loginUser);

// @route   POST /api/auth/admin-login
// @desc    Login admin (username: admin, password: admin123)
router.post('/admin-login', adminLogin);

module.exports = router;
