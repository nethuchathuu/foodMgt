const express = require('express');
const router = express.Router();
const { getDashboardSummary, getFinancialLoss, getTodayChart, clearFinancialLoss } = require('../../controllers/restaurentsControllers/dashboardController');
const { protect } = require('../../middleware/verifyUser');

router.get('/dashboard-summary', protect, getDashboardSummary);
router.get('/financial-loss', protect, getFinancialLoss);
router.get('/today-chart', protect, getTodayChart);
router.delete('/clear-financial-loss', protect, clearFinancialLoss);

module.exports = router;