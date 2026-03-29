const mongoose = require('mongoose');

const FoodListingSchema = new mongoose.Schema({
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
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
  },
  expiryTime: {
    type: String,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Available', 'Sold Out', 'Unsold'],
    default: 'Available',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('FoodListing', FoodListingSchema);