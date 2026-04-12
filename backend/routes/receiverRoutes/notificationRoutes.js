const express = require('express');
const router = express.Router();
const notificationController = require('../../controllers/receiverControllers/notificationController');
const { protect } = require('../../middleware/verifyUser');

// Get all notifications
router.get('/', protect, notificationController.getNotifications);

// Mark notification as read
router.put('/:id/read', protect, notificationController.markAsRead);

// Mark all notifications as read
router.put('/mark-all-read', protect, notificationController.markAllAsRead);

// Delete all notifications
router.delete('/delete-all', protect, notificationController.deleteAllNotifications);

// Delete notification
router.delete('/:id', protect, notificationController.deleteNotification);

module.exports = router;
