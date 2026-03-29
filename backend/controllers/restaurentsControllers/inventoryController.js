const Inventory = require('../../models/Inventory');

exports.addInventory = async (req, res) => {
  try {
    const { name, unit, pricePerUnit, lossPrice } = req.body;
    
    if (!name || !unit || pricePerUnit === undefined || lossPrice === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newInventory = new Inventory({
      name,
      unit,
      pricePerUnit,
      lossPrice,
      restaurantId: req.user._id
    });

    const savedInventory = await newInventory.save();
    res.status(201).json(savedInventory);
  } catch (error) {
    res.status(500).json({ message: 'Error adding inventory', error: error.message });
  }
};

exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find({ restaurantId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Error getting inventory', error: error.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, unit, pricePerUnit, lossPrice } = req.body;

    const updatedInventory = await Inventory.findOneAndUpdate(
      { _id: id, restaurantId: req.user._id },
      { name, unit, pricePerUnit, lossPrice },
      { new: true, runValidators: true }
    );

    if (!updatedInventory) {
      return res.status(404).json({ message: 'Inventory item not found or unauthorized' });
    }

    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating inventory', error: error.message });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInventory = await Inventory.findOneAndDelete({
      _id: id,
      restaurantId: req.user._id
    });

    if (!deletedInventory) {
      return res.status(404).json({ message: 'Inventory item not found or unauthorized' });
    }

    res.status(200).json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting inventory', error: error.message });
  }
};