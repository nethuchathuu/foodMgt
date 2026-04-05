const FoodRequest = require('../../models/foodRequests');
const DonationRequest = require('../../models/DonationRequest');
const FoodListing = require('../../models/FoodListing');
const Restaurant = require('../../models/Restaurant');

// Create food request (receiver)
exports.createFoodRequest = async (req, res) => {
  try {
    const receiverId = req.user._id;
    const { foodId, quantity, purpose, preferredPickupTime } = req.body;

    const food = await FoodListing.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    const restaurantId = food.restaurantId || food.restaurant;
    if (!restaurantId) {
      return res.status(400).json({ message: 'Food item has no associated restaurant' });
    }

    // 1) Save to FoodRequest (Receiver's POV)
    const foodRequest = new FoodRequest({
      receiverId,
      restaurantId,
      foodId,
      foodName: food.foodName || food.name || 'Unknown Food',
      quantity,
      description: purpose,
      preferredPickupTime
    });
    await foodRequest.save();

    // 2) Save to DonationRequest (Restaurant's POV)
    const donationRequest = new DonationRequest({
      receiverId,
      restaurantId,
      foodId,
      quantity,
      purpose,
      preferredPickupTime,
      status: 'Pending'
    });
    await donationRequest.save();

    res.status(201).json({ message: 'Request created successfully', request: foodRequest });
  } catch (error) {
    console.error('Error creating food request:', error);
    res.status(500).json({ message: 'Server error', error: error.message });    
  }
};

// Get all requests for the current receiver
exports.getReceiverRequests = async (req, res) => {
  try {
    const receiverId = req.user._id;
    // Query FoodRequest which is the receiver's model
    const requests = await FoodRequest.find({ receiverId })
      .populate('foodId', 'foodName name image price unit discountPrice')       
      .populate('restaurantId', 'name restaurantName address phoneNumber phone email')
      .sort({ createdAt: -1 });

    const formattedRequests = requests.map(req => {
      const food = req.foodId || {};
      const rest = req.restaurantId || {};
      return {
        id: req._id, 
        _id: req._id,
        foodType: req.foodName || food.foodName || food.name || 'Unknown Food',
        quantity: req.quantity || 0,
        description: req.description || '',
        preferredPickupTime: req.preferredPickupTime || '',
        status: req.status || 'Pending',
        date: (req.createdAt ? req.createdAt : new Date()).toISOString().split('T')[0],
        restaurantName: rest.restaurantName || rest.name || 'Unknown Restaurant',
        restaurantLocation: rest.address || 'Unknown Location',
        restaurantContact: rest.phoneNumber || rest.phone || 'N/A'
      };
    });

    res.status(200).json(formattedRequests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Failed to fetch requests', error: error.message });
  }
};

// Get a specific request by ID for receiver
exports.getReceiverRequestById = async (req, res) => {
  try {
    const receiverId = req.user._id;
    const requestId = req.params.id;

    const request = await FoodRequest.findOne({ _id: requestId, receiverId })
      .populate('foodId', 'foodName name image price unit discountPrice')       
      .populate('restaurantId', 'name restaurantName address phoneNumber phone email');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const food = request.foodId || {};
    const rest = request.restaurantId || {};

    const formattedRequest = {
      id: request._id,
      _id: request._id,
      foodType: request.foodName || food.foodName || food.name || 'Unknown Food',
      quantity: request.quantity,
      description: request.description || '',
      status: request.status || 'Pending',
      date: (request.createdAt ? request.createdAt : new Date()).toISOString().split('T')[0],
      restaurantName: rest.restaurantName || rest.name || 'Unknown Restaurant', 
      restaurantLocation: rest.address || 'Unknown Location',
      restaurantContact: rest.phoneNumber || rest.phone || 'N/A',
      responses: []
    };

    res.status(200).json(formattedRequest);
  } catch (error) {
    console.error('Error fetching request details:', error);
    res.status(500).json({ message: 'Failed to fetch request details', error: error.message });
  }
};

// Update food request
exports.updateFoodRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, description } = req.body;
    const request = await FoodRequest.findOneAndUpdate(
      { _id: id, receiverId: req.user._id, status: 'Pending' },
      { quantity, description },
      { new: true }
    );
    if (!request) return res.status(404).json({ message: 'Pending request not found' });
    res.status(200).json({ message: 'Request updated', request });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });    
  }
};

// Cancel/Delete food request
exports.deleteFoodRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await FoodRequest.findOneAndDelete({ _id: id, receiverId: req.user._id, status: 'Pending' });
    if (!request) return res.status(404).json({ message: 'Pending request not found' });
    res.status(200).json({ message: 'Request deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
