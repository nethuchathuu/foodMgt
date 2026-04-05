const Order = require('../../models/Order');
const Person = require('../../models/Person');
const Organization = require('../../models/Organization');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('foodId')
      .populate('restaurantId', 'restaurantName address')
      .populate('receiverId', 'name email role')
      .sort({ createdAt: -1 });

    const processedOrders = [];
    for (const o of orders) {
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

      processedOrders.push({
        id: o._id,
        orderId: o._id,
        customerName: customer.name,
        restaurantName: o.restaurantId?.restaurantName || 'Unknown',
        foodName: o.foodId?.foodName || 'Unknown',
        status: o.status,
        date: o.createdAt,
        totalPrice: o.totalPrice,
        isDelayed: false
      });
    }
    
    res.status(200).json(processedOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all orders', error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('foodId')
      .populate('restaurantId')
      .populate('receiverId', 'name email role');
      
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
          name: order.foodId?.foodName || 'Unknown',
          quantity: order.quantity,
          price: order.foodId?.price || 0,
          discountPrice: order.foodId?.discountPrice
        }
      ],
      financials: {
        total: order.totalPrice,
        subtotal: order.totalPrice,
        tax: 0
      },
      timeline: [
        { time: new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), status: 'Order Placed', desc: 'Customer placed order.', completed: true },
        { time: '--:--', status: 'Preparing Order', desc: 'Restaurant confirmed.', completed: order.status === 'Accepted' || order.status === 'Completed' || order.status === 'Ready' },
        { time: '--:--', status: 'Completed', desc: 'Order finished.', completed: order.status === 'Completed' }
      ]
    };

    res.status(200).json(processedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order details', error: error.message });
  }
};
