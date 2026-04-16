const express = require('express');
const router = express.Router();
const orderMonitoringController = require('../../controllers/adminControllers/orderMonitoringController');

router.get('/', orderMonitoringController.getAllOrders);
router.delete('/', orderMonitoringController.deleteAllOrders);
router.get('/:id', orderMonitoringController.getOrderById);

module.exports = router;
