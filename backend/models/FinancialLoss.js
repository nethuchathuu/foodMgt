const mongoose = require('mongoose');

const FinancialLossSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  wastedLoss: {
    type: Number,
    default: 0,
  },
  totalLoss: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

module.exports = mongoose.model('FinancialLoss', FinancialLossSchema);
