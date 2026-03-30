const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/verifyUser');
const wastageController = require('../../controllers/restaurentsControllers/wastageController');

router.post('/', protect, wastageController.addWastage);
router.get('/today', protect, wastageController.getTodayWastage);

module.exports = router;

