const DonationRequest = require('../../models/DonationRequest');
const FoodListing = require('../../models/FoodListing');
const Restaurant = require('../../models/Restaurant');
const Person = require('../../models/Person');
const Organization = require('../../models/Organization');
const RestaurentNotification = require('../../models/restaurentNotification');

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
      purpose,
      status: 'Pending'
    });

    await donationRequest.save();

    await RestaurentNotification.create({
      restaurantId,
      title: 'New Donation Request',
      message: `A donation request for ${quantity}x ${food.foodName} has been made.`,
      type: 'Donation'
    });

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
      .populate('foodId')     
      .populate('receiverId')
      .sort({ createdAt: -1 });

    const processed = [];
    for (const reqObj of requests) {
      const receiver = reqObj.receiverId || {};
      let requester = {
        id: receiver._id,
        type: receiver.role === 'requester_org' ? 'Organization' : 'Individual',
        name: receiver.name || 'Unknown',
        orgName: '',
        email: receiver.email || '',
        phone: '',
        address: '',
        avatar: ''
      };

      if (receiver.role === 'requester_person') {
        const person = await Person.findOne({ userId: receiver._id });
        if (person) {
          requester.name = person.fullName || requester.name;
          requester.phone = person.phoneNumber || requester.phone;
          requester.address = person.homeAddress || requester.address;
          requester.avatar = person.profilePicture || requester.avatar;
        }
      } else if (receiver.role === 'requester_org') {
        const org = await Organization.findOne({ userId: receiver._id });
        if (org) {
          requester.name = org.organizationName || requester.name;
          requester.orgName = org.organizationName;
          requester.phone = org.phoneNumber || requester.phone;
          requester.address = org.organizationAddress || requester.address;
          requester.avatar = org.logo || requester.avatar;
        }
      }

      processed.push({
        id: reqObj._id.toString(),
        foodId: reqObj.foodId,
        items: reqObj.foodId?.foodName || reqObj.foodId?.name || 'Unknown Item',
        quantity: reqObj.quantity,
        purpose: reqObj.purpose || '',
        urgency: 'Normal',
        preferredPickup: reqObj.preferredPickupTime || reqObj.foodId?.expiryTime || 'Not specified',
        status: reqObj.status,
        time: new Date(reqObj.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Colombo' }),
        requester: requester
      });
    }

    res.status(200).json(processed);
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