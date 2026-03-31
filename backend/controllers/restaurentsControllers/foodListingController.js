const FoodListing = require('../../models/FoodListing');

exports.addFood = async (req, res) => {
  try {
    const { foodName, quantity, unit, price, discountPrice, expiryTime, status, acceptableForDonation } = req.body;
    let { image } = req.body; // Allow passing image url just in case
    const restaurantId = req.user._id;

    if (req.file) {
      image = `http://localhost:5000/uploads/food/${req.file.filename}`;
    }

    const normalizedStatus = status === 'Sold Out' ? 'SoldOut' : status;

    let finalExpiryTime = undefined;
    if (expiryTime && expiryTime.trim() !== '') {
      if (String(expiryTime).includes(':')) {
        const [hours, minutes] = String(expiryTime).split(':');
        const today = new Date();
        today.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
        finalExpiryTime = today;
      } else {
        const parsed = new Date(expiryTime);
        if (!isNaN(parsed.valueOf())) {
          finalExpiryTime = parsed;
        }
      }
    }

    const newFood = new FoodListing({
      restaurantId,
      foodName,
      quantity,
      unit: unit || 'item',
      price,
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
      expiryTime: finalExpiryTime,
      image,
      acceptableForDonation: acceptableForDonation === 'true' || acceptableForDonation === true,
      status: Number(quantity) === 0 ? 'SoldOut' : (normalizedStatus || 'Available')
    });

    await newFood.save();
    res.status(201).json({ message: 'Food item added successfully.', food: newFood });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add food item', error: error.message });
  }
};

exports.getFoods = async (req, res) => {
  try {
    const restaurantId = req.user._id;
    const foods = await FoodListing.find({ restaurantId }).sort({ createdAt: -1 });

    // Auto-update expired items or sold-out items? Example functionality:
    // If you want logic, place it here. For now, just return them.
    
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch food listings', error: error.message });
  }
};

exports.getAvailableFoodListings = async (req, res) => {
  try {
    const foods = await FoodListing.find({ status: 'Available', isExpired: false })
      .populate('restaurantId')
      .sort({ createdAt: -1 });

    const Restaurant = require('../../models/Restaurant');
    
    // Process items and filter out any bad data from non-restaurants
    const processedFoods = [];
    for (const f of foods) {
      if (!f.restaurantId) continue;
      
      const foodObj = f.toObject();
      const profile = await Restaurant.findOne({ userId: f.restaurantId._id });
      
      if (profile) {
        // Enforce pulling the details exclusively from the Restaurant Profile
        foodObj.restaurantId = {
          _id: f.restaurantId._id,
          name: profile.restaurantName || 'Unknown Restaurant',
          location: profile.address || 'Not Provided'
        };
        processedFoods.push(foodObj);
      }
    }
      
    res.status(200).json(processedFoods);
  } catch (error) {
    console.error('Fetch available foods error:', error);
    res.status(500).json({ message: 'Failed to fetch available food listings', error: error.message });
  }
};

exports.getFoodCount = async (req, res) => {
  try {
    const restaurantId = req.user._id;
    const count = await FoodListing.countDocuments({ restaurantId });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch food count', error: error.message });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantId = req.user._id;
    
    // Auto status update on quantity
    let updateData = { ...req.body };
    // Normalize incoming status values (accept 'Sold Out')
    if (updateData.status === 'Sold Out') updateData.status = 'SoldOut';
    if (updateData.quantity !== undefined) {
      if (Number(updateData.quantity) <= 0) {
        updateData.status = 'SoldOut';
        updateData.quantity = 0;
      } else if (updateData.status === 'SoldOut') {
        updateData.status = 'Available';
      }
    }    
    if (updateData.acceptableForDonation !== undefined) {
      updateData.acceptableForDonation = updateData.acceptableForDonation === 'true' || updateData.acceptableForDonation === true;
    }
    const updatedFood = await FoodListing.findOneAndUpdate(
      { _id: id, restaurantId },
      updateData,
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: 'Food item not found.' });
    }

    res.status(200).json({ message: 'Food updated successfully.', food: updatedFood });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update food item', error: error.message });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantId = req.user._id;

    const deletedFood = await FoodListing.findOneAndDelete({ _id: id, restaurantId });
    if (!deletedFood) {
      return res.status(404).json({ message: 'Food item not found.' });
    }

    res.status(200).json({ message: 'Food item deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete food item', error: error.message });
  }
};

exports.deleteAllFoods = async (req, res) => {
  try {
    const restaurantId = req.user._id;
    await FoodListing.deleteMany({ restaurantId });
    res.status(200).json({ message: 'All food items deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete all food items', error: error.message });
  }
};