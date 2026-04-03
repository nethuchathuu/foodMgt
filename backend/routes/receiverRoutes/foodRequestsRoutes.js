const express = require('express');
const router = express.Router();
const foodRequestsController = require('../../controllers/receiverControllers/foodRequestsController');
const { protect } = require('../../middleware/verifyUser');

// Route to get all requests for the current receiver
router.get('/my-requests', protect, foodRequestsController.getMyRequests);

module.exports = router;
