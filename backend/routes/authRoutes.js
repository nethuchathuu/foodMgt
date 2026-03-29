const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { adminLogin } = require('../controllers/adminController');
const upload = require('../utils/multerConfig');

// @route   POST /api/auth/register
// @desc    Register a user (restaurant, requester)
router.post('/register', upload.fields([
  { name: 'documents', maxCount: 10 },
  { name: 'profileImage', maxCount: 1 }
]), registerUser);

// @route   POST /api/auth/login
// @desc    Login a user
router.post('/login', loginUser);

// @route   POST /api/auth/admin-login
// @desc    Login admin
router.post('/admin-login', adminLogin);

module.exports = router;
