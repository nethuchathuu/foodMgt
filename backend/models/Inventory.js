const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    enum: ['kg', 'g', 'L', 'ml', 'units', 'portion'],
    required: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
  },
  lossPrice: {
    type: Number,
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', InventorySchema);