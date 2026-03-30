const cron = require('node-cron');
const FoodListing = require('../models/FoodListing');
const Inventory = require('../models/Inventory');
const Wastage = require('../models/Wastage');
const financialLossController = require('../controllers/restaurentsControllers/financialLossController');

// Run every 5 minutes and mark expired foods as wastage
cron.schedule('*/5 * * * *', async () => {
  try {
    const now = new Date();

    const foods = await FoodListing.find({
      expiryTime: { $exists: true, $ne: null, $lte: now },
      status: 'Available',
      quantity: { $gt: 0 },
      isExpired: { $ne: true }
    });

    if (!foods || foods.length === 0) return;

    const start = new Date();
    start.setHours(0,0,0,0);
    const end = new Date();
    end.setHours(23,59,59,999);

    for (const food of foods) {
      try {
        // Avoid duplicate wastage entries for the same food today
        const existing = await Wastage.findOne({
          restaurantId: food.restaurantId,
          foodName: food.foodName,
          reason: 'Expired',
          date: { $gte: start, $lt: end }
        });
        if (existing) {
          // still mark food as expired if not already
          food.status = 'Expired';
          food.isExpired = true;
          food.quantity = 0;
          await food.save();
          continue;
        }

        const inventory = await Inventory.findOne({ name: food.foodName, restaurantId: food.restaurantId });
        const lossPrice = inventory ? inventory.lossPrice : (food.price || 0);
        const remainingQty = Number(food.quantity || 0);
        if (remainingQty <= 0) {
          // nothing to do
          food.isExpired = true;
          food.status = 'Expired';
          await food.save();
          continue;
        }

        const totalLoss = remainingQty * Number(lossPrice || 0);

        const wastage = new Wastage({
          restaurantId: food.restaurantId,
          foodName: food.foodName,
          quantity: remainingQty,
          unit: food.unit || (inventory ? inventory.unit : 'units'),
          reason: 'Expired',
          lossPricePerUnit: lossPrice,
          totalLoss,
          date: new Date()
        });

        await wastage.save();

        // Update financial loss (wastedLoss)
        try {
          await financialLossController.updateWastedLoss(food.restaurantId, totalLoss);
        } catch (err) {
          console.error('Expiry job: failed to update financial loss', err.message);
        }

        // Update food listing
        food.status = 'Expired';
        food.isExpired = true;
        food.quantity = 0;
        await food.save();
      } catch (err) {
        console.error('Error processing expired food', food._id, err.message);
      }
    }
  } catch (error) {
    console.error('Expiry job failed', error.message);
  }
}, {
  timezone: 'Asia/Colombo'
});

module.exports = {};
