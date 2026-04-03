const express = require('express');
const router = express.Router();
const foodOrdersController = require('../../controllers/receiverControllers/foodOrdersController');
const { protect } = require('../../middleware/verifyUser');

// Route to get all orders for the current receiver
router.get('/my-orders', protect, foodOrdersController.getMyOrders);
router.get('/:id', protect, foodOrdersController.getOrderDetails);

module.exports = router;
