const mongoose = require('mongoose');

const FoodOrderSchema = new mongoose.Schema({
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodListing',
  },
  foodName: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Completed', 'Cancelled', 'Rejected'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  acceptedAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  }
});

module.exports = mongoose.model('FoodOrder', FoodOrderSchema);
