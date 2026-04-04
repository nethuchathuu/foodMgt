const DonationRequest = require('../../models/DonationRequest');
const FoodListing = require('../../models/FoodListing');
const Restaurant = require('../../models/Restaurant');

// createDonationRequest
exports.createDonationRequest = async (req, res) => {
  try {
    const receiverId = req.user._id;
    const { foodId, quantity, purpose } = req.body;

    const food = await FoodListing.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    const restaurantId = food.restaurantId;

    const donationRequest = new DonationRequest({
      receiverId,
      restaurantId,
      foodId,
      quantity,
      purpose
    });

    await donationRequest.save();

    res.status(201).json({ message: 'Donation request created successfully', request: donationRequest });
  } catch (error) {
    console.error('Error creating donation request:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// getRestaurantDonationRequests
exports.getRestaurantDonationRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const restaurant = await Restaurant.findOne({ userId });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant profile not found for this user' });
    }

    const requests = await DonationRequest.find({ restaurantId: restaurant._id })
      .populate('foodId', 'name description expiresIn image type')
      .populate('receiverId', 'name email phoneNumber address organizationName')
      .sort({ createdAt: -1 });

    // Map to normalized frontend format (optional, keeping close to MongoDB schema but formatting nicely if needed)
    const formattedRequests = requests.map(req => {
      const obj = req.toObject();
      obj.id = obj._id;
      return obj;
    });

    res.status(200).json(formattedRequests);
  } catch (error) {
    console.error('Error fetching donation requests:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// updateDonationRequestStatus
exports.updateDonationRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Accepted', 'Rejected', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedRequest = await DonationRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Donation request not found' });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error updating donation request status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// getMyDonationRequests (for receiver)
exports.getMyDonationRequests = async (req, res) => {
  try {
    const receiverId = req.user._id;

    const requests = await DonationRequest.find({ receiverId })
      .populate('foodId', 'name image price unit discountPrice')
      .populate('restaurantId', 'restaurantName address phoneNumber email')
      .sort({ createdAt: -1 });

    const formattedRequests = requests.map(req => {
      const obj = req.toObject();
      obj.id = obj._id;
      return obj;
    });

    res.status(200).json(formattedRequests);
  } catch (error) {
    console.error('Error fetching receiver donation requests:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};