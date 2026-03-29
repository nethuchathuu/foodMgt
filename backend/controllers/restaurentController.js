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
