const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const restaurentController = require('../controllers/restaurentController');
const { protect, adminOnly } = require('../middleware/verifyUser');

// Admin Login
router.post('/login', adminController.adminLogin);

// Dashboard Stats
router.get('/dashboard-stats', protect, adminController.getDashboardStats);

// Organizations
router.get('/organizations', protect, adminController.getOrganizations);
router.patch('/approve-org/:id', protect, adminController.approveOrganization);
router.patch('/reject-org/:id', protect, adminController.rejectOrganization);

// Restaurants
router.get('/restaurants', protect, adminController.getRestaurants);
router.get('/restaurants/:id', protect, restaurentController.getRestaurantByIdAdmin);
router.patch('/approve-rest/:id', protect, adminController.approveRestaurant);
router.patch('/reject-rest/:id', protect, adminController.rejectRestaurant);

// Users
router.get('/users', protect, adminController.getUsers);
router.patch('/toggle-user-status/:id', protect, adminController.toggleUserStatus);

// Notifications
router.get('/notifications', protect, adminController.getNotifications);
router.patch('/notifications/:id/read', protect, adminController.markNotificationAsRead);
router.patch('/notifications/read-all', protect, adminController.markAllNotificationsAsRead);
router.delete('/notifications/:id', protect, adminController.deleteNotification);

// Food Listings
router.use('/food-listings', protect, require('./adminRoutes/foodListingRoutes'));
router.use('/orders', protect, require('./adminRoutes/orderMonitoringRoutes'));
router.use('/donations', protect, require('./adminRoutes/donationRoutes'));

module.exports = router;


