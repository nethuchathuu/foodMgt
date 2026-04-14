const Restaurant = require('../models/Restaurant');

exports.createRestaurant = async (req, res) => {
  try {
    const { userId, restaurantName, registeredId, address, restaurantEmail, phoneNumber, description, mealTypes, owner } = req.body;

    const newRestaurant = new Restaurant({
      userId,
      restaurantName,
      registeredId,
      address,
      restaurantEmail,
      phoneNumber,
      description,
      mealTypes,
      owner
    });

    await newRestaurant.save();
    res.status(201).json({ message: 'Restaurant profile created successfully', restaurant: newRestaurant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create restaurant profile', error: error.message });
  }
};

exports.getRestaurantDetails = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ userId: req.user.id }).select('-owner');
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getOwnerDetails = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ userId: req.user.id }).select('owner');
    if (!restaurant || !restaurant.owner) {
      return res.status(404).json({ message: 'Owner details not found' });
    }
    
    res.json(restaurant.owner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.getRestaurantByIdAdmin = async (req, res) => {
  try {
    const User = require('../models/User'); // Import User model to get status
    const userId = req.params.id;
    
    const user = await User.findById(userId);
    if (!user || user.role !== 'restaurant') {
      return res.status(404).json({ message: 'Restaurant user not found' });
    }
    
    const restaurant = await Restaurant.findOne({ userId });
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant details not found' });
    }
    
    // Combine data for frontend
    const responseData = {
      id: user._id,
      name: restaurant.restaurantName || user.name,
      regId: restaurant.registeredId || 'N/A',
      status: user.status,
      ownerName: restaurant.owner?.fullName || 'N/A',
      email: restaurant.restaurantEmail || user.email,
      phone: restaurant.phoneNumber || restaurant.owner?.contactNumber || 'N/A',
      address: restaurant.address || 'N/A',
      description: restaurant.description || 'N/A',
      documents: restaurant.documents || []
    };
    
    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
