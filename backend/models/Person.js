const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: { type: String },
  homeAddress: { type: String },
  dob: { type: Date },
  nic: { type: String },
  gender: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  profilePicture: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Person', PersonSchema);
