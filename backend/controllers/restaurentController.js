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

