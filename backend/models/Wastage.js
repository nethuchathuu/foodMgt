const mongoose = require('mongoose');

const WastageSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  foodName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
  },
  lossPricePerUnit: {
    type: Number,
    default: 0,
  },
  totalLoss: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Wastage', WastageSchema);