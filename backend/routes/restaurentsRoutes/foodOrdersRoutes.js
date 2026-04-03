const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/verifyUser');
const foodOrdersController = require('../../controllers/restaurentsControllers/foodOrdersController');

// Get all orders for the authenticated restaurant
router.get('/', protect, foodOrdersController.getRestaurantOrders);

// Update order status
router.put('/:id', protect, foodOrdersController.updateOrderStatus);

module.exports = router;

