const express = require('express');
const router = express.Router();
const browseFoodController = require('../../controllers/receiverControllers/browseFoodController');

// Route to get a specific food listing detail by ID
// Added populate to get restaurant details.
router.get('/:id', browseFoodController.getFoodDetails);

module.exports = router;
