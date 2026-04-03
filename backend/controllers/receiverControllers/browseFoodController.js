const FoodListing = require('../../models/FoodListing');
const Restaurant = require('../../models/Restaurant');

// Get food details by ID for the receiver
exports.getFoodDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await FoodListing.findById(id).populate('restaurantId', 'restaurantName address phoneNumber restaurantEmail');

    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    const foodObj = food.toObject();

    if (foodObj.restaurantId) {
      foodObj.restaurantId = {
        _id: foodObj.restaurantId._id,
        name: foodObj.restaurantId.restaurantName || 'Unknown Provider',
        address: foodObj.restaurantId.address || 'Not provided',
        phone: foodObj.restaurantId.phoneNumber || 'Not provided',
        email: foodObj.restaurantId.restaurantEmail || 'Not provided'
      };
    } else {
      foodObj.restaurantId = {
        _id: null,
        name: 'Unknown Provider',
        address: 'Not provided',
        phone: 'Not provided',
        email: 'Not provided'
      };
    }
    
    // Explicitly remove old legacy object
    delete foodObj.providerInfo;

    res.status(200).json(foodObj);
  } catch (error) {
    console.error('Error fetching food details:', error);
    res.status(500).json({ message: 'Failed to fetch food details', error: error.message });
  }
};
