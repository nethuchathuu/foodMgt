const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read'], default: 'unread' },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  link: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);