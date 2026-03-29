const FoodListing = require('../../models/FoodListing');

exports.addFood = async (req, res) => {
  try {
    const { foodName, quantity, unit, price, discountPrice, expiryTime, status } = req.body;
    let { image } = req.body; // Allow passing image url just in case
    const restaurantId = req.user._id;

    if (req.file) {
      image = `http://localhost:5000/uploads/food/${req.file.filename}`;
    }

    const newFood = new FoodListing({
      restaurantId,
      foodName,
      quantity,
      unit: unit || 'item',
      price,
      discountPrice,
      expiryTime,
      image,
      status: Number(quantity) === 0 ? 'Sold Out' : (status || 'Available')
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
    if (updateData.quantity !== undefined) {
      if (Number(updateData.quantity) <= 0) {
        updateData.status = 'Sold Out';
      } else if (updateData.status === 'Sold Out') {
        updateData.status = 'Available';
      }
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