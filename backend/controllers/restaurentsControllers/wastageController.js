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

// DELETE /api/wastage/:id
exports.deleteWastage = async (req, res) => {
	try {
		const restaurantId = req.user._id;
		const wastageId = req.params.id;

		const wastage = await Wastage.findOne({ _id: wastageId, restaurantId });
		if (!wastage) {
			return res.status(404).json({ message: 'Wastage not found' });
		}

		const start = new Date();
		start.setHours(0,0,0,0);
		const end = new Date();
		end.setHours(23,59,59,999);

		// If it's today's wastage, decrement financial loss
		if (wastage.date >= start && wastage.date < end) {
			try {
				await financialLossController.updateWastedLoss(restaurantId, -wastage.totalLoss);
			} catch (err) {
				console.error('Failed to deduct financial loss:', err.message);
			}
		}

		await Wastage.findByIdAndDelete(wastageId);

		res.status(200).json({ message: 'Wastage deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Failed to delete wastage', error: error.message });
	}
};

// DELETE /api/wastage/today
exports.clearTodayWastage = async (req, res) => {
	try {
		const restaurantId = req.user._id;
		const start = new Date();
		start.setHours(0,0,0,0);
		const end = new Date();
		end.setHours(23,59,59,999);

		// get sum of all today's wastage to deduct
		const wastages = await Wastage.find({
			restaurantId,
			date: { $gte: start, $lt: end }
		});

		const totalToDeduct = wastages.reduce((sum, w) => sum + (w.totalLoss || 0), 0);

		await Wastage.deleteMany({
			restaurantId,
			date: { $gte: start, $lt: end }
		});

		try {
			if (totalToDeduct > 0) {
				await financialLossController.updateWastedLoss(restaurantId, -totalToDeduct);
			}
		} catch (err) {
			console.error('Failed to deduct financial loss on clear all:', err.message);
		}

		res.status(200).json({ message: 'All today wastage cleared' });
	} catch (error) {
		res.status(500).json({ message: 'Failed to clear wastage', error: error.message });
	}
};
