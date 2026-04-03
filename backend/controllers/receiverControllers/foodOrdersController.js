const FoodOrder = require('../../models/foodOrders');

// Get all orders for the current receiver
exports.getMyOrders = async (req, res) => {
  try {
    const receiverId = req.user._id;
    const orders = await FoodOrder.find({ receiverId })
      .populate('foodId')
      .populate('restaurantId', 'restaurantName address phoneNumber restaurantEmail')
      .sort({ createdAt: -1 });

    const processedOrders = orders.map(o => {
      const order = o.toObject();
      if (order.restaurantId) {
        order.restaurantId = {
          _id: order.restaurantId._id,
          name: order.restaurantId.restaurantName || 'Unknown Provider',
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
      .populate('restaurantId', 'restaurantName address phoneNumber restaurantEmail');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    const orderObj = order.toObject();
    if (orderObj.restaurantId) {
      orderObj.restaurantId = {
        _id: orderObj.restaurantId._id,
        name: orderObj.restaurantId.restaurantName || 'Unknown Provider',
        address: order.restaurantId.address || 'Not Provided',
        phone: order.restaurantId.phoneNumber || 'Not Provided',
        email: order.restaurantId.restaurantEmail || 'Not Provided'
      };
    }

    res.status(200).json(orderObj);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
};
