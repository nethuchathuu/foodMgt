const FoodListing = require('../../models/FoodListing');
const Restaurant = require('../../models/Restaurant');

// Get food details by ID for the receiver
exports.getFoodDetails = async (req, res) => {
  try {
    const { id } = req.params;
    
    // First find the food and populate the base User who owns the restaurant
    const food = await FoodListing.findById(id).populate('restaurantId', 'name email telephone');
    
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    const foodObj = food.toObject();

    // Find the actual Restaurant profile associated with this User
    const restaurantProfile = await Restaurant.findOne({ userId: food.restaurantId._id });

    if (restaurantProfile) {
      foodObj.providerInfo = {
        name: restaurantProfile.restaurantName || 'Unknown Restaurant',
        location: restaurantProfile.address || 'Not provided',
        email: restaurantProfile.restaurantEmail || 'Not provided',
        contact: restaurantProfile.phoneNumber || 'Not provided'
      };
    } else {
      // Fallback only if the profile is unexpectedly missing, but force "Unknown" defaults
      // to avoid leaking regular non-restaurant user details
      foodObj.providerInfo = {
        name: 'Unknown Restaurant',
        location: 'Not provided',
        email: 'Not provided',
        contact: 'Not provided'
      };
    }

    res.status(200).json(foodObj);
  } catch (error) {
    console.error('Error fetching food details:', error);
    res.status(500).json({ message: 'Failed to fetch food details', error: error.message });
  }
};
