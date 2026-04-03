const FoodRequest = require('../../models/foodRequests');

// Get all requests for the current receiver
exports.getMyRequests = async (req, res) => {
  try {
    const receiverId = req.user._id;
    const requests = await FoodRequest.find({ receiverId }).sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Failed to fetch requests', error: error.message });
  }
};
