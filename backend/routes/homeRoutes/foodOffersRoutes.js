const express = require('express');
const router = express.Router();
const foodOffersController = require('../../controllers/homeControllers/foodOffersController');

router.get('/', foodOffersController.getLatestFoodOffers);

module.exports = router;
