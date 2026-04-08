const Order = require('../models/Order');
const FoodListing = require('../models/FoodListing');
const Restaurant = require('../models/Restaurant');
const Person = require('../models/Person');
const Organization = require('../models/Organization');
const RestaurentNotification = require('../models/restaurentNotification');

exports.createOrder = async (req, res) => {
  try {
    const receiverId = req.user._id;
    const { foodId, quantity } = req.body;
    if (!foodId || !quantity) return res.status(400).json({ message: 'foodId and quantity required' });
    const food = await FoodListing.findById(foodId);
    if (!food) return res.status(404).json({ message: 'Food not found' });
    const restaurantId = food.restaurantId;
    const totalPrice = Number(quantity) * (food.discountPrice || food.price || 0);
    const order = new Order({ receiverId, restaurantId, foodId, quantity: Number(quantity), totalPrice });
    await order.save();

    await RestaurentNotification.create({
      restaurantId,
      title: 'New Food Order',
      message: `A new order has been placed for ${quantity}x ${food.foodName || 'Item'}.`,
      type: 'Order'
    });

    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

exports.getRestaurantOrders = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ userId: req.user._id });
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    const orders = await Order.find({ restaurantId: restaurant._id })
      .populate('foodId')
      .populate('receiverId', 'name email role')
      .sort({ createdAt: -1 });

    const processed = [];
    for (const o of orders) {
      const receiver = o.receiverId || {};
      let customer = { id: receiver._id, type: receiver.role === 'requester_org' ? 'Organization' : 'Individual', name: receiver.name || 'Unknown', email: receiver.email || '', phone: '', address: '', avatar: '' };
      if (receiver.role === 'requester_person') {
        const person = await Person.findOne({ userId: receiver._id });
        if (person) { customer.name = person.fullName; customer.phone = person.phoneNumber; customer.address = person.homeAddress; customer.avatar = person.profilePicture; }
      } else if (receiver.role === 'requester_org') {
        const org = await Organization.findOne({ userId: receiver._id });
        if (org) { customer.name = org.orgName; customer.phone = org.contactNumber; customer.address = org.orgAddress; customer.avatar = org.representative?.profileImage?.fileUrl; }
      }
      processed.push({ id: o._id, orderId: o._id, foodName: o.foodId?.foodName || 'Unknown', quantity: o.quantity, totalPrice: o.totalPrice, status: o.status, time: o.createdAt, customer });
    }
    res.status(200).json(processed);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Error upgrading order', error: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const receiverId = req.user._id;
    const orders = await Order.find({ receiverId })
      .populate('foodId')
      .populate('restaurantId')
      .sort({ createdAt: -1 });

    const processedOrders = orders.map(o => {
      const order = o.toObject();
      order.id = o._id; // Attach id specifically for frontend expectation
      if (order.restaurantId) {
        order.restaurantId = {
          _id: order.restaurantId._id,
          name: order.restaurantId.restaurantName || 'Unknown Provider',
          address: order.restaurantId.address || 'Not Provided',
          phone: order.restaurantId.phoneNumber || 'Not Provided',
          email: order.restaurantId.restaurantEmail || 'Not Provided'
        };
      }
      order.foodName = order.foodId ? order.foodId.foodName : (order.foodName || 'Unknown Food');
      return order;
    });

    res.status(200).json(processedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const receiverId = req.user._id;

    const order = await Order.findOne({ _id: id, receiverId })
      .populate('foodId')
      .populate('restaurantId');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    const orderObj = order.toObject();
    orderObj.id = order._id;
    if (orderObj.restaurantId) {
      orderObj.restaurantId = {
        _id: orderObj.restaurantId._id,
        name: orderObj.restaurantId.restaurantName || 'Unknown Provider',
        address: orderObj.restaurantId.address || 'Not Provided',
        phone: orderObj.restaurantId.phoneNumber || 'Not Provided',
        email: orderObj.restaurantId.restaurantEmail || 'Not Provided'
      };
    }
    orderObj.foodName = orderObj.foodId ? orderObj.foodId.foodName : (orderObj.foodName || 'Unknown Food');

    res.status(200).json(orderObj);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
};
