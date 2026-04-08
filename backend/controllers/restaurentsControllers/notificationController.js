const RestaurentNotification = require('../../models/restaurentNotification');
const Restaurant = require('../../models/Restaurant');

exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const restaurant = await Restaurant.findOne({ userId });
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    
    const notifications = await RestaurentNotification.find({ restaurantId: restaurant._id }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await RestaurentNotification.findByIdAndUpdate(id, { isRead: true });
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.user._id;
    const restaurant = await Restaurant.findOne({ userId });
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    await RestaurentNotification.updateMany({ restaurantId: restaurant._id }, { isRead: true });
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await RestaurentNotification.findByIdAndDelete(id);
    res.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.deleteAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const restaurant = await Restaurant.findOne({ userId });
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    await RestaurentNotification.deleteMany({ restaurantId: restaurant._id });
    res.status(200).json({ message: 'All notifications deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
