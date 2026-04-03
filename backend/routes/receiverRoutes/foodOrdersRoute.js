const express = require('express');
const router = express.Router();
const foodOrdersController = require('../../controllers/receiverControllers/foodOrdersController');
const { protect } = require('../../middleware/verifyUser');

// Route to get all orders for the current receiver
router.get('/my-orders', protect, foodOrdersController.getMyOrders);

module.exports = router;
