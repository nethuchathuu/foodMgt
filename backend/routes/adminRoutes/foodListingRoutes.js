const express = require('express');
const router = express.Router();
const foodListingController = require('../../controllers/adminControllers/foodListingController');

router.get('/', foodListingController.getAllFoodListings);
router.delete('/', foodListingController.deleteAllFoods);
router.get('/:id', foodListingController.getFoodListingById);
router.delete('/:id', foodListingController.deleteSingleFood);

module.exports = router;
