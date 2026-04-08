const express = require('express');
const router = express.Router();
const donationRequestController = require('../controllers/restaurentsControllers/donationRequestController');
const { protect } = require('../middleware/verifyUser');

// POST /api/donation-requests - Create a new donation request
router.post('/', protect, donationRequestController.createDonationRequest);

// GET /api/donation-requests/my-requests - Get donation requests placed by the current receiver
router.get('/my-requests', protect, donationRequestController.getMyDonationRequests);

// GET /api/donation-requests/restaurant - Get donation requests for the current restaurant user
router.get('/restaurant', protect, donationRequestController.getRestaurantDonationRequests);

// PATCH /api/donation-requests/:id - Update the status of a donation request
router.patch('/:id', protect, donationRequestController.updateDonationRequestStatus);

// DELETE /api/donation-requests/delete-all - Delete all requests for restaurant
router.delete('/restaurant/delete-all', protect, donationRequestController.deleteAllDonationRequests);

module.exports = router;