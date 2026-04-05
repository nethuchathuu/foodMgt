const FoodListing = require('../../models/FoodListing');

exports.getAllFoodListings = async (req, res) => {
  try {
    const foods = await FoodListing.find()
      .populate('restaurantId')
      .sort({ createdAt: -1 });
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch foods', error: error.message });
  }
};

exports.getFoodListingById = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await FoodListing.findById(id).populate('restaurantId');
    if (!food) {
      return res.status(404).json({ message: 'Food listing not found' });
    }
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch food details', error: error.message });
  }
};

exports.deleteSingleFood = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFood = await FoodListing.findByIdAndDelete(id);
    if (!deletedFood) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json({ message: 'Food removed by admin' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
};

exports.deleteAllFoods = async (req, res) => {
  try {
    await FoodListing.deleteMany({});
    res.status(200).json({ message: 'All foods removed' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
};
