const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/verifyUser');
const financialLossController = require('../../controllers/restaurentsControllers/financialLossController');

router.get('/today', protect, financialLossController.getTodayLoss);

module.exports = router;

