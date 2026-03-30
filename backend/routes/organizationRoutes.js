const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/verifyUser');
const organizationController = require('../controllers/organizationController');

// Return the organization profile for the authenticated user
router.get('/me', protect, organizationController.getMyOrganization);

module.exports = router;
