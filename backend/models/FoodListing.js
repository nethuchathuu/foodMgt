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
    type: Date,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Available', 'SoldOut', 'Expired'],
    default: 'Available',
  },
  isExpired: {
    type: Boolean,
    default: false,
  },
  acceptableForDonation: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('FoodListing', FoodListingSchema);