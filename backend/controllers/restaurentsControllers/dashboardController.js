const Inventory = require('../../models/Inventory');
const FoodListing = require('../../models/FoodListing');
const Wastage = require('../../models/Wastage');
const Order = require('../../models/Order');

exports.getDashboardSummary = async (req, res) => {
  try {
    const restaurantId = req.user._id;

    const inventoryItems = await Inventory.find({ restaurantId });
    const totalFood = inventoryItems.length;
    
    // Create a map for loss prices from inventory
    const lossPriceMap = {};
    inventoryItems.forEach(item => {
      if (item.name) {
        const name = item.name.toLowerCase().trim();
        lossPriceMap[name] = item.lossPrice;
      }
    });

    const wastageRecords = await Wastage.find({ restaurantId });
    let totalWastageQuantity = 0;
    let totalWastageLoss = 0;
    wastageRecords.forEach(w => {
      totalWastageQuantity += w.quantity;
      if (w.foodName) {
        const price = lossPriceMap[w.foodName.toLowerCase().trim()] || 0;
        totalWastageLoss += price * w.quantity;
      }
    });

    // Unsold logic removed - system uses wastage-based financials only
    let totalUnsoldLoss = 0;

    // Today's orders
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const todayOrders = await Order.countDocuments({
      restaurantId,
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    const loss = totalWastageLoss; // only wastage-based loss

    res.status(200).json({
      totalFood,
      todayOrders,
      wastage: totalWastageQuantity,
      loss
    });
  } catch (error) {
    res.status(500).json({ message: 'Error getting dashboard summary', error: error.message });
  }
};

exports.getFinancialLoss = async (req, res) => {
  try {
    const restaurantId = req.user._id;

    // Get inventory to map foodName to lossPrice
    const inventoryItems = await Inventory.find({ restaurantId });
    const lossPriceMap = {};
    inventoryItems.forEach(item => {
      // Normalize names for better matching
      if (item.name) {
        const name = item.name.toLowerCase().trim();
        lossPriceMap[name] = item.lossPrice;
      }
    });

    // 1. Get Wastage Loss
    const wastageRecords = await Wastage.find({ restaurantId });
    const wastedData = wastageRecords.map(w => {
      let lossPrice = 0;
      if (w.foodName) {
        const nameKey = w.foodName.toLowerCase().trim();
        lossPrice = lossPriceMap[nameKey] || 0;
      }
      const totalLoss = lossPrice * w.quantity;
      return {
        _id: w._id,
        foodName: w.foodName || 'Unknown',
        quantity: w.quantity,
        unit: w.unit,
        loss: totalLoss,
        date: w.date
      };
    });

    res.status(200).json({
      wastedData,
      unsoldData: []
    });

  } catch (error) {
    res.status(500).json({ message: 'Error getting financial loss', error: error.message });
  }
};

exports.getTodayChart = async (req, res) => {
  try {
    const restaurantId = req.user._id;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todayOrders = await Order.find({
      restaurantId,
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    // Map into time slots (e.g. 8 AM, 10 AM, etc.)
    const timeSlots = [
      { time: '8 AM', minH: 0, maxH: 9, orders: 0, sales: 0 },
      { time: '10 AM', minH: 9, maxH: 11, orders: 0, sales: 0 },
      { time: '12 PM', minH: 11, maxH: 13, orders: 0, sales: 0 },
      { time: '2 PM', minH: 13, maxH: 15, orders: 0, sales: 0 },
      { time: '4 PM', minH: 15, maxH: 17, orders: 0, sales: 0 },
      { time: '6 PM', minH: 17, maxH: 19, orders: 0, sales: 0 },
      { time: '8 PM', minH: 19, maxH: 24, orders: 0, sales: 0 }
    ];

    todayOrders.forEach(order => {
      const orderHour = new Date(order.createdAt).getHours();
      for (let slot of timeSlots) {
        if (orderHour >= slot.minH && orderHour < slot.maxH) {
          slot.orders += 1;
          slot.sales += (order.totalPrice || 0);
          break;
        }
      }
    });

    res.status(200).json(timeSlots);

  } catch (error) {
    res.status(500).json({ message: 'Error getting chart data', error: error.message });
  }
};