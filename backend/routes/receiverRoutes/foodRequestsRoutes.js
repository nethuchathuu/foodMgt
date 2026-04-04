const express = require('express');
const router = express.Router();
const foodRequestsController = require('../../controllers/receiverControllers/foodRequestsController');
const { protect } = require('../../middleware/verifyUser');

// POST /api/food-requests
router.post('/', protect, foodRequestsController.createFoodRequest);

// GET /api/food-requests/receiver
router.get('/receiver', protect, foodRequestsController.getReceiverRequests);

// GET /api/food-requests/:id
router.get('/:id', protect, foodRequestsController.getReceiverRequestById);

// PATCH /api/food-requests/:id
router.patch('/:id', protect, foodRequestsController.updateFoodRequest);

// DELETE /api/food-requests/:id
router.delete('/:id', protect, foodRequestsController.deleteFoodRequest);

module.exports = router;
