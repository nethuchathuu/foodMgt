const FoodListing = require('../../models/FoodListing');
const Restaurant = require('../../models/Restaurant');
const Organization = require('../../models/Organization');
const Person = require('../../models/Person');

// Get food details by ID for the receiver
exports.getFoodDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // First find the food and populate the base User who owns the restaurant
    const food = await FoodListing.findById(id).populate('restaurantId', 'name email telephone role');

    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    const foodObj = food.toObject();

    let providerName = 'Unknown Provider';
    let providerLocation = 'Not provided';
    let providerEmail = 'Not provided';
    let providerContact = 'Not provided';

    const userId = food.restaurantId._id;
    const role = food.restaurantId.role;

    if (role === 'restaurant' || !role) {
      const profile = await Restaurant.findOne({ userId });
      if (profile) {
        providerName = profile.restaurantName || 'Unknown Restaurant';
        providerLocation = profile.address || 'Not provided';
        providerEmail = profile.restaurantEmail || 'Not provided';
        providerContact = profile.phoneNumber || 'Not provided';
      }
    } else if (role === 'requester_org') {
      const profile = await Organization.findOne({ userId });
      if (profile) {
        providerName = profile.orgName || 'Unknown Organization';
        providerLocation = profile.orgAddress || 'Not provided';
        providerEmail = profile.officialEmail || 'Not provided';
        providerContact = profile.contactNumber || 'Not provided';
      }
    } else if (role === 'requester_person') {
      const profile = await Person.findOne({ userId });
      if (profile) {
        providerName = profile.fullName || 'Unknown Person';
        providerLocation = profile.homeAddress || 'Not provided';
        providerEmail = profile.email || 'Not provided';
        providerContact = profile.phoneNumber || 'Not provided';
      }
    }

    foodObj.providerInfo = {
      name: providerName,
      location: providerLocation,
      email: providerEmail,
      contact: providerContact
    };
    
    res.status(200).json(foodObj);
  } catch (error) {
    console.error('Error fetching food details:', error);
    res.status(500).json({ message: 'Failed to fetch food details', error: error.message });
  }
};
