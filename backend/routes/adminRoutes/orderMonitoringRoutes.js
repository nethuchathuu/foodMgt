const express = require('express');
const router = express.Router();
const orderMonitoringController = require('../../controllers/adminControllers/orderMonitoringController');

router.get('/', orderMonitoringController.getAllOrders);
router.get('/:id', orderMonitoringController.getOrderById);

module.exports = router;
