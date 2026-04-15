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
    const allUsers = await User.find({ role: { $ne: 'admin' } });
    const userIds = allUsers.map(u => u._id);

    const persons = await Person.find({ userId: { $in: userIds } });
    const orgs = await Organization.find({ userId: { $in: userIds } });
    const rests = await Restaurant.find({ userId: { $in: userIds } });

    const users = allUsers.map(user => {
      let name = user.name || 'Unknown';
      let avatar = '';
      let roleLabel = 'User';

      if (user.role === 'requester_person') {
        const p = persons.find(pr => pr.userId.toString() === user._id.toString());
        if (p) { name = p.fullName || name; avatar = p.profilePicture || avatar; }
        roleLabel = 'User';
      } else if (user.role === 'requester_org') {
        const o = orgs.find(or => or.userId.toString() === user._id.toString());
        if (o) { name = o.orgName || name; avatar = o.representative?.profileImage?.fileUrl || avatar; }
        roleLabel = 'Organization';
      } else if (user.role === 'restaurant') {
        const r = rests.find(re => re.userId.toString() === user._id.toString());
        if (r) { name = r.restaurantName || name; avatar = r.restaurantImage || avatar; }
        roleLabel = 'Restaurant';
      }

      let displayStatus = user.status;
      if (user.role === 'restaurant' || user.role === 'requester_org') {
        if (user.status === 'Approved' || user.isVerified === true) displayStatus = 'Active';
        else if (user.status === 'Rejected') displayStatus = 'Blocked';
      } else if (user.role === 'requester_person') {
         if (user.status !== 'Blocked') displayStatus = 'Active';
      }

      return {
        id: user._id,
        name,
        email: user.email,
        role: roleLabel,
        status: displayStatus,
        avatar
      };
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserDetailsAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let name = user.name || 'Unknown';
    let phone = 'N/A';
    let address = 'N/A';
    let entityName = '';
    let roleLabel = 'User';
    let joinedDate = user._id.getTimestamp ? user._id.getTimestamp().toLocaleDateString() : 'N/A';
    let ownerDetails = null;
    
    if (user.role === 'requester_person') {
      const p = await Person.findOne({ userId: user._id });
      if (p) {
        name = p.fullName || name;
        phone = p.phoneNumber || phone;
        address = p.homeAddress || address;
      }
      roleLabel = 'User';
    } else if (user.role === 'requester_org') {
      const o = await Organization.findOne({ userId: user._id });
      if (o) {
        name = o.representative?.fullName || name;
        entityName = o.orgName || '';
        phone = o.contactNumber || phone;
        address = o.orgAddress || address;
        ownerDetails = o.representative || null;
      }
      roleLabel = 'Organization';
    } else if (user.role === 'restaurant') {
      const r = await Restaurant.findOne({ userId: user._id });
      if (r) {
        name = r.owner?.fullName || name;
        entityName = r.restaurantName || '';
        phone = r.phoneNumber || phone;
        address = r.address || address;
        ownerDetails = r.owner || null;
      }
      roleLabel = 'Restaurant';
    }

    let displayStatus = user.status;
    if (user.role === 'restaurant' || user.role === 'requester_org') {
      if (user.status === 'Approved' || user.isVerified === true) displayStatus = 'Active';
      else if (user.status === 'Rejected') displayStatus = 'Blocked';
    } else if (user.role === 'requester_person') {
       if (user.status !== 'Blocked') displayStatus = 'Active';
    }

    res.json({
      id: user._id,
      name: entityName || name, // For the card name, it might be better to show entityName if org/restaurant
      email: user.email,
      phone,
      role: roleLabel,
      status: displayStatus,
      joinedDate,
      address,
      entityName,
      ownerDetails
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PATCH Toggle User Status (Block/Unblock)
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.status === 'Blocked' || user.status === 'Rejected') {
      if (user.role === 'restaurant' || user.role === 'requester_org') {
        user.status = 'Approved';
        user.isVerified = true;
      } else {
        user.status = 'Active';
      }
    } else {
      if (user.role === 'restaurant' || user.role === 'requester_org') {
        user.status = 'Rejected';
        user.isVerified = false;
      } else {
        user.status = 'Blocked';
      }
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


