const FoodListing = require('../../models/FoodListing');

exports.addFood = async (req, res) => {
  try {
    const { foodName, quantity, unit, price, discountPrice, expiryTime, status, acceptableForDonation } = req.body;
    let { image } = req.body; // Allow passing image url just in case
    const userId = req.user._id;

    // Get the restaurant _id
    const Restaurant = require('../../models/Restaurant');
    const restaurant = await Restaurant.findOne({ userId });
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant profile not found for this user.' });
    }
    
    const restaurantId = restaurant._id;

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
        
        // If the parsed time is already in the past today, assume it's meant for tomorrow.
        if (today < new Date()) {
          today.setDate(today.getDate() + 1);
        }
        
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
      status: Number(quantity) === 0 ? 'SoldOut' : (normalizedStatus || 'Available'),
      isExpired: false
    });

    await newFood.save();
    res.status(201).json({ message: 'Food item added successfully.', food: newFood });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add food item', error: error.message });
  }
};

exports.getFoods = async (req, res) => {
  try {
    const userId = req.user._id;
    const Restaurant = require('../../models/Restaurant');
    const restaurant = await Restaurant.findOne({ userId });
    
    console.log('getFoods -> userId:', userId);
    console.log('getFoods -> restaurant:', restaurant ? restaurant._id : 'NOT FOUND');
    
    if (!restaurant) return res.status(404).json({ message: 'Restaurant profile not found.' });
    
    const restaurantId = restaurant._id;

    const foodsDb = await FoodListing.find({ restaurantId }).sort({ createdAt: -1 });
    const currentTime = new Date();

    const foods = foodsDb.map(f => {
      const food = f.toObject();
      // Present visually as expired if time has passed, until cron job kicks in and formally processes wastage
      if (!food.isExpired && food.expiryTime && new Date(food.expiryTime) <= currentTime && food.status === 'Available') {
        food.status = 'Expired';
        food.isExpired = true;
        food.quantity = 0;
      }
      return food;
    });

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch food listings', error: error.message });
  }
};

exports.getAvailableFoodListings = async (req, res) => {
  try {
    const currentTime = new Date();
    const foods = await FoodListing.find({ 
      status: 'Available', 
      isExpired: false,
      $or: [
        { expiryTime: null },
        { expiryTime: { $exists: false } },
        { expiryTime: { $gt: currentTime } }
      ]
    })
      .populate('restaurantId')
      .sort({ createdAt: -1 });

    const Restaurant = require('../../models/Restaurant');
    const Organization = require('../../models/Organization');
    const Person = require('../../models/Person');

    // Process items and filter out any bad data from non-restaurants
    const processedFoods = [];
    for (const f of foods) {
      if (!f.restaurantId) continue;

      const foodObj = f.toObject();
      const userId = f.restaurantId._id;
      const role = f.restaurantId.role;

      let providerName = f.restaurantId.name || 'Unknown Provider';
      let providerLocation = 'Not Provided';

      if (role === 'restaurant' || !role) {
        const profile = await Restaurant.findOne({ userId });
        if (profile) {
          providerName = profile.restaurantName || providerName;
          providerLocation = profile.address || providerLocation;
        }
      } else if (role === 'requester_org') {
        const profile = await Organization.findOne({ userId });
        if (profile) {
          providerName = profile.orgName || providerName;
          providerLocation = profile.orgAddress || providerLocation;
        }
      } else if (role === 'requester_person') {
        const profile = await Person.findOne({ userId });
        if (profile) {
          providerName = profile.fullName || providerName;
          providerLocation = profile.homeAddress || providerLocation;
        }
      }

      foodObj.restaurantId = {
        _id: f.restaurantId._id,
        name: providerName,
        location: providerLocation
      };
      processedFoods.push(foodObj);
    }

    res.status(200).json(processedFoods);
  } catch (error) {
    console.error('Fetch available foods error:', error);
    res.status(500).json({ message: 'Failed to fetch available food listings', error: error.message });
  }
};

exports.getFoodCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const Restaurant = require('../../models/Restaurant');
    const restaurant = await Restaurant.findOne({ userId });
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    
    const restaurantId = restaurant._id;
    const count = await FoodListing.countDocuments({ restaurantId });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch food count', error: error.message });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const Restaurant = require('../../models/Restaurant');
    const restaurant = await Restaurant.findOne({ userId });
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    
    const restaurantId = restaurant._id;
    
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

    // Auto reset isExpired flag if someone updates expiryTime to the future
    if (updateData.expiryTime) {
       if (String(updateData.expiryTime).includes(':') && !String(updateData.expiryTime).includes('T')) {
         const [hours, minutes] = String(updateData.expiryTime).split(':');
         const target = new Date();
         target.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
         if (target < new Date()) target.setDate(target.getDate() + 1);
         updateData.expiryTime = target;
       } else {
         updateData.expiryTime = new Date(updateData.expiryTime);
       }
       if (new Date(updateData.expiryTime) > new Date()) {
          updateData.isExpired = false;
          if (updateData.status === 'Expired' && Number(updateData.quantity || req.body.quantity) > 0) {
             updateData.status = 'Available';
          }
       }
    } else if (updateData.status === 'Available') {
       updateData.isExpired = false;
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
    const userId = req.user._id;
    const Restaurant = require('../../models/Restaurant');
    const restaurant = await Restaurant.findOne({ userId });
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    
    const restaurantId = restaurant._id;

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
    const userId = req.user._id;
    const Restaurant = require('../../models/Restaurant');
    const restaurant = await Restaurant.findOne({ userId });
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    
    const restaurantId = restaurant._id;
    
    await FoodListing.deleteMany({ restaurantId });
    res.status(200).json({ message: 'All food items deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete all food items', error: error.message });
  }
};