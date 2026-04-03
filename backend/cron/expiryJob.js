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
        // Atomically update the food listing so only ONE process proceeds with Wastage.
        const updatedFood = await FoodListing.findOneAndUpdate({
          _id: food._id,
          status: 'Available',
          isExpired: { $ne: true }
        }, {
          $set: { status: 'Expired', isExpired: true, quantity: 0 }
        }, { new: false });

        if (!updatedFood) {
          // Another thread or process already marked it expired
          continue;
        }

        const remainingQty = Number(updatedFood.quantity || 0);

        if (remainingQty <= 0) {
          // Only expired without needing wastage
          continue;
        }

        // Avoid duplicate wastage entries for the same food today
        const existing = await Wastage.findOne({
          restaurantId: updatedFood.restaurantId,
          foodName: updatedFood.foodName,
          reason: 'Expired',
          date: { $gte: start, $lt: end }
        });

        if (existing) {
          // If a duplicate got recorded today somehow, we can just update its quantity
          existing.quantity += remainingQty;
          existing.totalLoss += remainingQty * existing.lossPricePerUnit;
          await existing.save();
        } else {
          const inventory = await Inventory.findOne({ name: updatedFood.foodName, restaurantId: updatedFood.restaurantId });
          const lossPrice = inventory ? inventory.lossPrice : (updatedFood.price || 0);
          const totalLoss = remainingQty * Number(lossPrice || 0);

          const wastage = new Wastage({
            restaurantId: updatedFood.restaurantId,
            foodName: updatedFood.foodName,
            quantity: remainingQty,
            unit: updatedFood.unit || (inventory ? inventory.unit : 'units'),
            reason: 'Expired',
            lossPricePerUnit: lossPrice,
            totalLoss,
            date: new Date()
          });

          await wastage.save();

          // Update financial loss (wastedLoss)
          try {
            await financialLossController.updateWastedLoss(updatedFood.restaurantId, totalLoss);
          } catch (err) {
            console.error('Expiry job: failed to update financial loss', err.message);
          }
        }
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
