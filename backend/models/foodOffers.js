const mongoose = require('mongoose');

const foodOfferSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  category: {
    type: String
  },
  quantity: {
    type: Number,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  restaurant: {
    name: String,
    location: String,
    contact: String
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FoodOffer', foodOfferSchema);
