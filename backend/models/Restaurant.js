const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurantName: { type: String },
  registeredId: { type: String },
  address: { type: String },
  restaurantEmail: { type: String },
  phoneNumber: { type: String },
  description: { type: String },
  mealTypes: [{ type: String }],
  owner: {
    fullName: { type: String },
    homeAddress: { type: String },
    dob: { type: Date },
    nic: { type: String },
    gender: { type: String },
    email: { type: String },
    contactNumber: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', RestaurantSchema);
