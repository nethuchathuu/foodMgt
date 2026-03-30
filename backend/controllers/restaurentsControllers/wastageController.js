const Wastage = require('../../models/Wastage');
const Inventory = require('../../models/Inventory');
const financialLossController = require('./financialLossController');

// POST /api/wastage
exports.addWastage = async (req, res) => {
	try {
		const { inventoryId, quantity, reason, otherReason } = req.body;
		const restaurantId = req.user._id;

		if (!inventoryId || !quantity) {
			return res.status(400).json({ message: 'inventoryId and quantity are required' });
		}

		const inventory = await Inventory.findOne({ _id: inventoryId, restaurantId });
		if (!inventory) {
			return res.status(404).json({ message: 'Inventory item not found' });
		}

		const lossPricePerUnit = inventory.lossPrice || 0;
		const totalLoss = Number(quantity) * Number(lossPricePerUnit);

		const wastage = new Wastage({
			restaurantId,
			foodName: inventory.name,
			quantity,
			unit: inventory.unit,
			reason: reason === 'Other' ? (otherReason || 'Other') : reason,
			lossPricePerUnit,
			totalLoss,
			date: new Date()
		});

		const saved = await wastage.save();

		// Update financial loss for today
		try {
			await financialLossController.updateWastedLoss(restaurantId, totalLoss);
		} catch (err) {
			// don't fail the main request if updating financials fails
			console.error('Failed to update financial loss:', err.message);
		}

		res.status(201).json({ message: 'Wastage recorded', wastage: saved });
	} catch (error) {
		res.status(500).json({ message: 'Failed to record wastage', error: error.message });
	}
};

// GET /api/wastage/today
exports.getTodayWastage = async (req, res) => {
	try {
		const restaurantId = req.user._id;
		const start = new Date();
		start.setHours(0,0,0,0);
		const end = new Date();
		end.setHours(23,59,59,999);

		const items = await Wastage.find({
			restaurantId,
			date: { $gte: start, $lt: end }
		}).sort({ foodName: 1, date: -1 });

		res.status(200).json(items);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch today\'s wastage', error: error.message });
	}
};
