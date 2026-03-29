const express = require('express');
const router = express.Router();
const { getDashboardSummary, getFinancialLoss, getTodayChart } = require('../../controllers/restaurentsControllers/dashboardController');
const { protect } = require('../../middleware/verifyUser');

router.get('/dashboard-summary', protect, getDashboardSummary);
router.get('/financial-loss', protect, getFinancialLoss);
router.get('/today-chart', protect, getTodayChart);

module.exports = router;