const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/verifyUser');
const orderController = require('../controllers/orderController');

router.post('/', protect, orderController.createOrder);
router.get('/restaurant', protect, orderController.getRestaurantOrders);
router.get('/my-orders', protect, orderController.getMyOrders);
router.get('/:id', protect, orderController.getOrderDetails);
router.patch('/:id', protect, orderController.updateOrderStatus);
router.put('/:id/cancel', protect, orderController.cancelOrder);

module.exports = router;
