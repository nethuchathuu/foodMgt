(function(){
	// placeholder to ensure file is a valid module when empty
})();

const FoodOrder = require('../../models/foodOrders');
const Restaurant = require('../../models/Restaurant');
const Person = require('../../models/Person');
const Organization = require('../../models/Organization');
const FoodListing = require('../../models/FoodListing');

// Get all orders for the authenticated restaurant
exports.getRestaurantOrders = async (req, res) => {
	try {
		const userId = req.user._id;
		const restaurant = await Restaurant.findOne({ userId });
		if (!restaurant) return res.status(404).json({ message: 'Restaurant profile not found.' });
		const restaurantId = restaurant._id;

		const orders = await FoodOrder.find({ restaurantId }).sort({ createdAt: -1 }).populate('receiverId').populate('foodId');

		const processed = [];
		for (const o of orders) {
			const receiver = o.receiverId || {};
			let customer = {
					id: receiver._id,
					name: receiver.name || 'Unknown',
				type: receiver.role === 'requester_org' ? 'Organization' : 'Individual',
				email: receiver.email || '',
				phone: '',
				address: '',
				avatar: ''
			};

			if (receiver.role === 'requester_person') {
				const person = await Person.findOne({ userId: receiver._id });
				if (person) {
					customer.name = person.fullName || customer.name;
					customer.phone = person.phoneNumber || customer.phone;
					customer.address = person.homeAddress || customer.address;
					customer.avatar = person.profilePicture || customer.avatar;
				}
			} else if (receiver.role === 'requester_org') {
				const org = await Organization.findOne({ userId: receiver._id });
				if (org) {
					customer.name = org.orgName || customer.name;
					customer.phone = org.contactNumber || customer.phone;
					customer.address = org.orgAddress || customer.address;
					customer.avatar = org.representative?.profileImage?.fileUrl || customer.avatar;
				}
			}

			const totalPrice = (o.foodId?.price || 0) * (o.quantity || 0);

			processed.push({
				id: o._id.toString(),
				foodName: o.foodName || o.foodId?.foodName || '',
				quantity: o.quantity,
				totalPrice,
				status: o.status,
				time: new Date(o.createdAt).toLocaleString(),
				customer
			});
		}

		res.status(200).json(processed);
	} catch (error) {
		console.error('Error fetching restaurant orders:', error);
		res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
	}
};

// Update order status (restaurant)
exports.updateOrderStatus = async (req, res) => {
	try {
		const userId = req.user._id;
		const restaurant = await Restaurant.findOne({ userId });
		if (!restaurant) return res.status(404).json({ message: 'Restaurant profile not found.' });
		const restaurantId = restaurant._id;

		const { id } = req.params;
		const { status } = req.body;
		const allowed = ['Pending', 'Accepted', 'Completed', 'Cancelled'];
		if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });

		const updated = await FoodOrder.findOneAndUpdate(
			{ _id: id, restaurantId },
			{ status },
			{ new: true }
		);

		if (!updated) return res.status(404).json({ message: 'Order not found' });

		res.status(200).json({ message: 'Order status updated', order: updated });
	} catch (error) {
		console.error('Error updating order status:', error);
		res.status(500).json({ message: 'Failed to update order status', error: error.message });
	}
};


