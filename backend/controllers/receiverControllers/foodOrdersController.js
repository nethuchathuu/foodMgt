const FoodOrder = require('../../models/foodOrders');
const Order = require('../../models/Order');
const FoodListing = require('../../models/FoodListing');
const RestaurentNotification = require('../../models/restaurentNotification');

// Create a new order (receiver)
exports.createOrder = async (req, res) => {
  try {
    const receiverId = req.user._id;
    const { foodId, quantity } = req.body;

    if (!foodId || !quantity) {
      return res.status(400).json({ message: 'foodId and quantity are required' });
    }

    const food = await FoodListing.findById(foodId).populate('restaurantId');
    if (!food) return res.status(404).json({ message: 'Food listing not found' });

    const restaurantId = food.restaurantId ? food.restaurantId._id : null;

    const newOrder = new FoodOrder({
      receiverId,
      restaurantId,
      foodId,
      foodName: food.foodName || '',
      quantity: Number(quantity)
    });

    await newOrder.save();

    // Sync to Restaurant view
    if (restaurantId) {
      const restOrder = new Order({
        foodId,
        restaurantId,
        receiverId,
        quantity: Number(quantity),
        totalPrice: Number(quantity) * (food.discountPrice || food.price || 0),
        status: 'Pending'
      });
      await restOrder.save();

      await RestaurentNotification.create({
        restaurantId,
        title: 'New Food Order',
        message: `A new order has been placed for ${quantity}x ${food.foodName || 'Item'}.`,
        type: 'Order'
      });
    }

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

// Get all orders for the current receiver
exports.getMyOrders = async (req, res) => {
  try {
    const receiverId = req.user._id;
    const orders = await FoodOrder.find({ receiverId })
      .populate('foodId')
      .populate('restaurantId')
      .sort({ createdAt: -1 });

    const processedOrders = orders.map(o => {
      const order = o.toObject();
      if (order.restaurantId) {
        order.restaurantId = {
          _id: order.restaurantId._id,
          name: order.restaurantId.restaurantName || order.restaurantId.restaurantName || 'Unknown Provider',
          address: order.restaurantId.address || 'Not Provided',
          phone: order.restaurantId.phoneNumber || 'Not Provided',
          email: order.restaurantId.restaurantEmail || 'Not Provided'
        };
      }
      return order;
    });

    res.status(200).json(processedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

// Get a specific order
exports.getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const receiverId = req.user._id;

    const order = await FoodOrder.findOne({ _id: id, receiverId })
      .populate('foodId')
      .populate('restaurantId');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    const orderObj = order.toObject();
    if (orderObj.restaurantId) {
      orderObj.restaurantId = {
        _id: orderObj.restaurantId._id,
        name: orderObj.restaurantId.restaurantName || 'Unknown Provider',
        address: orderObj.restaurantId.address || 'Not Provided',
        phone: orderObj.restaurantId.phoneNumber || 'Not Provided',
        email: orderObj.restaurantId.restaurantEmail || 'Not Provided'
      };
    }

    res.status(200).json(orderObj);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
};

// Cancel an order
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const receiverId = req.user._id;

    const order = await FoodOrder.findOne({ _id: id, receiverId });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.status !== 'Pending') {
      return res.status(400).json({ message: 'Only pending orders can be cancelled' });
    }

    order.status = 'Cancelled';
    await order.save();

    // Also update the restaurant's view of the order
    if (order.restaurantId) {
      const restOrder = await Order.findOne({ 
        foodId: order.foodId, 
        receiverId: receiverId,
        restaurantId: order.restaurantId,
        status: 'Pending'
      });
      if (restOrder) {
        restOrder.status = 'Cancelled';
        await restOrder.save();
      }

      await RestaurentNotification.create({
        restaurantId: order.restaurantId,
        title: 'Order Cancelled',
        message: `An order for ${order.quantity}x ${order.foodName || 'Item'} was cancelled by the requester.`,
        type: 'Order'
      });
    }

    res.status(200).json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ message: 'Failed to cancel order', error: error.message });
  }
};
