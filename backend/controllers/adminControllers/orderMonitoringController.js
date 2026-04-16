const FoodOrder = require('../../models/foodOrders');
const Order = require('../../models/Order');
const Person = require('../../models/Person');
const Organization = require('../../models/Organization');

exports.deleteAllOrders = async (req, res) => {
  try {
    await FoodOrder.deleteMany({});
    await Order.deleteMany({});
    res.status(200).json({ message: 'All orders deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting orders', error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await FoodOrder.find()
      .populate('foodId')
      .populate('restaurantId', 'restaurantName address')
      .populate('receiverId', 'name email role')
      .sort({ createdAt: -1 });

    const legacyOrders = await Order.find()
      .populate('foodId')
      .populate('restaurantId', 'restaurantName address')
      .populate('receiverId', 'name email role')
      .sort({ createdAt: -1 });

    const allOrders = [...orders, ...legacyOrders];

    const processedOrders = [];
    for (const o of allOrders) {
      const receiver = o.receiverId || {};
      let customer = { 
        id: receiver._id, 
        name: receiver.name || 'Unknown', 
        phone: 'Not provided' 
      };
      
      if (receiver.role === 'requester_person') {
        const person = await Person.findOne({ userId: receiver._id });
        if (person) { 
          customer.name = person.fullName; 
          customer.phone = person.phoneNumber; 
        }
      } else if (receiver.role === 'requester_org') {
        const org = await Organization.findOne({ userId: receiver._id });
        if (org) {
          customer.name = org.orgName;
          customer.phone = org.contactNumber;
        }
      }
      
      let price = 0;
      if (o.totalPrice !== undefined) {
         price = o.totalPrice;
      } else if (o.foodId) {
         price = (o.foodId.discountPrice !== undefined ? o.foodId.discountPrice : o.foodId.price) * o.quantity;
      }

      processedOrders.push({
        id: o._id,
        orderId: o._id,
        customerName: customer.name,
        restaurantName: o.restaurantId?.restaurantName || 'Unknown',
        foodName: o.foodName || o.foodId?.foodName || 'Unknown',
        status: o.status,
        date: o.createdAt,
        totalPrice: price || 0,
        isDelayed: false,
        pickupLocation: o.deliveryAddress || o.restaurantId?.address || 'Not specified',
        approvalTimeRaw: o.acceptedAt || null,
        completedTimeRaw: o.completedAt || null
      });
    }
    
    res.status(200).json(processedOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all orders', error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    let order = await FoodOrder.findById(req.params.id)
      .populate('foodId')
      .populate('restaurantId')
      .populate('receiverId', 'name email role');
      
    if (!order) {
      order = await Order.findById(req.params.id)
        .populate('foodId')
        .populate('restaurantId')
        .populate('receiverId', 'name email role');
    }
      
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const receiver = order.receiverId || {};
    let customer = {
      name: receiver.name || 'Unknown',
      phone: 'Not provided',
      email: receiver.email || 'Not provided',
      notes: ''
    };

    if (receiver.role === 'requester_person') {
      const person = await Person.findOne({ userId: receiver._id });
      if (person) { 
        customer.name = person.fullName; 
        customer.phone = person.phoneNumber; 
      }
    } else if (receiver.role === 'requester_org') {
      const org = await Organization.findOne({ userId: receiver._id });
      if (org) {
        customer.name = org.orgName;
        customer.phone = org.contactNumber;
      }
    }

    let unitPrice = 0;
    if (order.totalPrice !== undefined && order.quantity) {
       unitPrice = order.totalPrice / order.quantity;
    } else if (order.foodId) {
       unitPrice = order.foodId.discountPrice !== undefined ? order.foodId.discountPrice : order.foodId.price;
    }
    const totalPrice = order.totalPrice !== undefined ? order.totalPrice : (unitPrice * (order.quantity || 1));

    const processedOrder = {
      id: order._id,
      status: order.status,
      date: order.createdAt,
      deliveryMethod: 'Pickup', 
      customer,
      restaurant: {
        name: order.restaurantId?.restaurantName || 'Unknown',
        location: order.restaurantId?.address || 'Unknown',
        contact: order.restaurantId?.phoneNumber || 'Unknown'
      },
      items: [
        {
          name: order.foodName || order.foodId?.foodName || 'Unknown',
          quantity: order.quantity || 1,
          price: unitPrice || 0,
          discountPrice: order.foodId?.discountPrice
        }
      ],
      financials: {
        total: totalPrice || 0,
        subtotal: totalPrice || 0,
        tax: 0
      },
      timeline: [
        { time: new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), status: 'Order Placed', desc: 'Customer placed order.', completed: true },
        { time: order.acceptedAt ? new Date(order.acceptedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--', status: 'Preparing Order', desc: 'Restaurant confirmed.', completed: order.status === 'Accepted' || order.status === 'Completed' || order.status === 'Ready' },
        { time: order.completedAt ? new Date(order.completedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--', status: 'Completed', desc: 'Order finished.', completed: order.status === 'Completed' }
      ]
    };

    res.status(200).json(processedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order details', error: error.message });
  }
};
