const mongoose = require('mongoose');

const FoodRequestSchema = new mongoose.Schema({
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodListing',
  },
  foodName: {
    type: String
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  preferredPickupTime: {
    type: String, // Stored as a formatted string in Sri Lankan Standard Time
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Accepted', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('FoodRequest', FoodRequestSchema);
