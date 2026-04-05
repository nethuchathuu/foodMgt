const FoodListing = require('../../models/FoodListing');

exports.getLatestFoodOffers = async (req, res) => {
  try {
    // Fetch directly from FoodListing to get real-time restaurant posts
    const foodOffers = await FoodListing.find({ 
      expiryTime: { $gt: new Date() },
      status: 'Available'
    })
      .populate('restaurantId', 'restaurantName address phoneNumber restaurantEmail')
      .sort({ createdAt: -1 })
      .limit(5);

    const formattedOffers = foodOffers.map(food => {
      const originalPrice = food.price;
      const discountPrice = food.discountPrice || food.price;
      const discountPercentage = (originalPrice > 0 && discountPrice < originalPrice) 
        ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100) 
        : 0;
      
      const foodObj = food.toObject();
      // Ensure image path is correctly formatted with forward slashes for the frontend
      const formatImage = foodObj.image ? foodObj.image.replace(/\\/g, '/') : null;

      return {
        ...foodObj,
        image: formatImage,
        restaurant: foodObj.restaurantId ? {
          name: foodObj.restaurantId.restaurantName || 'Unknown Provider',
          location: foodObj.restaurantId.address || 'Not provided',
          contact: foodObj.restaurantId.phoneNumber || 'Not provided'
        } : { name: 'Unknown Provider', location: 'Not provided', contact: 'Not provided' },
        discountPercentage
      };
    });

    res.status(200).json(formattedOffers);
  } catch (error) {
    console.error('Error fetching latest food offers:', error);
    res.status(500).json({ message: 'Failed to fetch food offers', error: error.message });
  }
};
