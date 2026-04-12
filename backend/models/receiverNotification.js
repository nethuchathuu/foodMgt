const mongoose = require('mongoose');

const receiverNotificationSchema = new mongoose.Schema({
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'receiverModel' // Dynamic reference to either Person or Organization
  },
  receiverModel: {
    type: String,
    required: true,
    enum: ['Person', 'Organization']
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Order', 'Donation', 'System']
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ReceiverNotification', receiverNotificationSchema);
