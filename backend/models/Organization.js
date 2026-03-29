const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  fileName: { type: String },
  fileUrl: { type: String },
  fileType: { type: String },
  uploadedAt: { type: Date, default: Date.now }
});

const OrganizationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orgName: { type: String },
  orgAddress: { type: String },
  regNumber: { type: String },
  officialEmail: { type: String },
  contactNumber: { type: String },
  representative: {
    fullName: { type: String },
    gender: { type: String },
    nic: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    profileImage: DocumentSchema
  }
}, { timestamps: true });

module.exports = mongoose.model('Organization', OrganizationSchema);
