const FoodOrder = require('../../models/foodOrders');

// Get all orders for the current receiver
exports.getMyOrders = async (req, res) => {
  try {
    const receiverId = req.user._id;
    const orders = await FoodOrder.find({ receiverId }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};
