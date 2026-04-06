const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/verifyUser');
const foodListingController = require('../../controllers/restaurentsControllers/foodListingController');
const upload = require('../../utils/multerConfig');

// All food listing routes are protected
router.use(protect);

router.get('/available', foodListingController.getAvailableFoodListings);
router.post('/', upload.single('foodImage'), foodListingController.addFood);
router.get('/', foodListingController.getFoods);
router.get('/count', foodListingController.getFoodCount);
router.delete('/delete-all', foodListingController.deleteAllFoods);
router.put('/:id', upload.single('foodImage'), foodListingController.updateFood);
router.delete('/:id', foodListingController.deleteFood);

module.exports = router;