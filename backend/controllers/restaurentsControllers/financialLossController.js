const FinancialLoss = require('../../models/FinancialLoss');

// Add loss to today's wastedLoss and keep totalLoss = wastedLoss
exports.updateWastedLoss = async (restaurantId, lossAmount) => {
	try {
		const start = new Date();
		start.setHours(0,0,0,0);
		const end = new Date();
		end.setHours(23,59,59,999);

		let record = await FinancialLoss.findOne({
			restaurantId,
			date: { $gte: start, $lt: end }
		});

		if (!record) {
			record = new FinancialLoss({
				restaurantId,
				date: new Date(),
				wastedLoss: Number(lossAmount) || 0,
				totalLoss: Number(lossAmount) || 0
			});
		} else {
			record.wastedLoss = (record.wastedLoss || 0) + Number(lossAmount || 0);
			record.totalLoss = record.wastedLoss;
		}

		await record.save();
		return record;
	} catch (error) {
		console.error('updateWastedLoss error', error.message);
		throw error;
	}
};

// Express handler: GET /api/financial-loss/today
exports.getTodayLoss = async (req, res) => {
	try {
		const restaurantId = req.user._id;
		const start = new Date();
		start.setHours(0,0,0,0);
		const end = new Date();
		end.setHours(23,59,59,999);

		const record = await FinancialLoss.findOne({
			restaurantId,
			date: { $gte: start, $lt: end }
		});

		if (!record) {
			return res.status(200).json({ wastedLoss: 0, totalLoss: 0 });
		}

		res.status(200).json({ wastedLoss: record.wastedLoss || 0, totalLoss: record.totalLoss || 0 });
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch today financial loss', error: error.message });
	}
};
