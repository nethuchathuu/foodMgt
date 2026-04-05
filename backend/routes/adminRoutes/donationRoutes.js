const express = require('express');
const router = express.Router();
const donationController = require('../../controllers/adminControllers/donationMonitoringController');

router.get('/', donationController.getAllDonations);
router.get('/:id', donationController.getDonationById);
router.patch('/:id', donationController.updateDonationStatus);

module.exports = router;
