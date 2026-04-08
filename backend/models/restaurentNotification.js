const mongoose = require('mongoose');

const RestaurentNotificationSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['Order', 'Donation', 'Expiry', 'Other'], default: 'Other' },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('RestaurentNotification', RestaurentNotificationSchema);
