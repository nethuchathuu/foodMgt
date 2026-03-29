const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  fileName: { type: String },
  fileUrl: { type: String },
  fileType: { type: String },
  uploadedAt: { type: Date, default: Date.now }
});

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
  documents: [DocumentSchema],
  owner: {
    fullName: { type: String },
    homeAddress: { type: String },
    dob: { type: Date },
    nic: { type: String },
    gender: { type: String },
    email: { type: String },
    contactNumber: { type: String },
    profileImage: DocumentSchema
  }
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', RestaurantSchema);
