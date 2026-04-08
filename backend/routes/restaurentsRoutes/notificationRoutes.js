const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/verifyUser');
const notificationController = require('../../controllers/restaurentsControllers/notificationController');

router.get('/', protect, notificationController.getNotifications);
router.put('/mark-all-read', protect, notificationController.markAllAsRead);
router.delete('/delete-all', protect, notificationController.deleteAllNotifications);
router.put('/:id/read', protect, notificationController.markAsRead);
router.delete('/:id', protect, notificationController.deleteNotification);

module.exports = router;
