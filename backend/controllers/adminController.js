const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Initial setup to create default admin if not exists
exports.setupDefaultAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      const newAdmin = new Admin({ username: 'admin', password: hashedPassword });
      await newAdmin.save();
      console.log('Default admin created (admin / admin123)');
    }
  } catch (error) {
    console.error('Error setting up default admin:', error);
  }
};

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '7d' }
    );

    return res.json({
      message: 'Admin login successful',
      token,
      user: {
        id: admin._id,
        Id: admin._id,
        name: admin.username,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const User = require('../models/User');
const Organization = require('../models/Organization');
const Restaurant = require('../models/Restaurant');
const Person = require('../models/Person');
const Notification = require('../models/Notification');
const FoodListing = require('../models/FoodListing');

// GET Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalRestaurants = await User.countDocuments({ role: 'restaurant' });
    const totalOrganizations = await User.countDocuments({ role: 'requester_org' });
    const totalUsers = await User.countDocuments({ role: 'requester_person' });
    const pendingApprovals = await User.countDocuments({ 
      role: { $in: ['restaurant', 'requester_org'] },
      status: 'Pending' 
    });

    res.json({
      totalRestaurants,
      totalOrganizations,
      totalUsers,
      pendingApprovals,
      todaysFoodListings: await FoodListing.countDocuments({ createdAt: { $gte: new Date(new Date().setHours(0,0,0,0)) } }),
      todaysDonations: 0, // Placeholder
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET Organizations
exports.getOrganizations = async (req, res) => {
  try {
    const orgUsers = await User.find({ role: 'requester_org' });
    const userIds = orgUsers.map(u => u._id);
    const orgDetails = await Organization.find({ userId: { $in: userIds } });

    const organizations = orgUsers.map(user => {
      const details = orgDetails.find(o => o.userId.toString() === user._id.toString());
      return {
        id: user._id,
        name: details?.orgName || user.name,
        type: details?.representative?.type || 'NGO',
        location: details?.orgAddress || 'Unknown',
        status: user.status || 'Pending',
        email: user.email
      };
    });

    res.json(organizations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PATCH Approve Organization
exports.approveOrganization = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'requester_org') return res.status(404).json({ message: 'Organization not found' });
    
    user.status = 'Approved';
    user.isVerified = true;
    await user.save();
    res.json({ message: 'Organization approved successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PATCH Reject Organization
exports.rejectOrganization = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'requester_org') return res.status(404).json({ message: 'Organization not found' });
    
    user.status = 'Rejected';
    user.isVerified = false;
    await user.save();
    res.json({ message: 'Organization rejected successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET Restaurants
exports.getRestaurants = async (req, res) => {
  try {
    const restUsers = await User.find({ role: 'restaurant' });
    const userIds = restUsers.map(u => u._id);
    const restDetails = await Restaurant.find({ userId: { $in: userIds } });

    const restaurants = restUsers.map(user => {
      const details = restDetails.find(r => r.userId.toString() === user._id.toString());
      return {
        id: user._id,
        name: details?.restaurantName || user.name,
        regId: details?.registeredId || 'N/A',
        location: details?.address || 'Unknown',
        status: user.status || 'Pending',
        email: user.email
      };
    });

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PATCH Approve Restaurant
exports.approveRestaurant = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'restaurant') return res.status(404).json({ message: 'Restaurant not found' });
    
    user.status = 'Approved';
    user.isVerified = true;
    await user.save();
    res.json({ message: 'Restaurant approved successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PATCH Reject Restaurant
exports.rejectRestaurant = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'restaurant') return res.status(404).json({ message: 'Restaurant not found' });
    
    user.status = 'Rejected';
    user.isVerified = false;
    await user.save();
    res.json({ message: 'Restaurant rejected successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET Users
exports.getUsers = async (req, res) => {
  try {
    const personUsers = await User.find({ role: 'requester_person' });
    const userIds = personUsers.map(u => u._id);
    const persons = await Person.find({ userId: { $in: userIds } });

    const users = personUsers.map(user => {
      const p = persons.find(pr => pr.userId.toString() === user._id.toString());
      return {
        id: user._id,
        name: p?.fullName || user.name || 'Unknown',
        email: p?.email || user.email,
        role: 'User',
        status: user.status || (user.isVerified ? 'Active' : 'Pending'),
        avatar: p?.profilePicture || ''      };
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PATCH Toggle User Status (Block/Unblock)
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.status === 'Blocked') {
      user.status = user.isVerified ? 'Approved' : 'Pending'; 
      if (user.role === 'requester_person') user.status = 'Active';
    } else {
      user.status = 'Blocked';
    }

    await user.save();
    res.json({ message: 'User status toggled successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET Notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PATCH Mark Notification as Read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id, 
      { status: 'read' }, 
      { new: true }
    );
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PATCH Mark All Notifications as Read
exports.markAllNotificationsAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ status: 'unread' }, { status: 'read' });
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE Notification
exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


