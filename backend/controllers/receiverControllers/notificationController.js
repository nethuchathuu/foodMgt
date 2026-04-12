const ReceiverNotification = require('../../models/receiverNotification');

// Get all notifications for current receiver
exports.getNotifications = async (req, res) => {
  try {
    const receiverId = req.user._id;
    const notifications = await ReceiverNotification.find({ receiverId })
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching receiver notifications:', error);
    res.status(500).json({ message: 'Failed to fetch notifications', error: error.message });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const receiverId = req.user._id;

    const notification = await ReceiverNotification.findOneAndUpdate(
      { _id: id, receiverId },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json(notification);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Mark all as read
exports.markAllAsRead = async (req, res) => {
  try {
    const receiverId = req.user._id;

    await ReceiverNotification.updateMany(
      { receiverId, isRead: false },
      { isRead: true }
    );

    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const receiverId = req.user._id;

    const notification = await ReceiverNotification.findOneAndDelete({ _id: id, receiverId });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting receiver notification:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete all notifications
exports.deleteAllNotifications = async (req, res) => {
  try {
    const receiverId = req.user._id;

    await ReceiverNotification.deleteMany({ receiverId });

    res.status(200).json({ message: 'All notifications deleted successfully' });
  } catch (error) {
    console.error('Error deleting all receiver notifications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
