const DonationRequest = require('../../models/DonationRequest');
const Organization = require('../../models/Organization');
const FoodListing = require('../../models/FoodListing');
const User = require('../../models/User');

exports.getAllDonations = async (req, res) => {
  try {
    const donations = await DonationRequest.find()
      .populate('foodId')
      .populate('receiverId', 'name email role')
      .sort({ createdAt: -1 });

    const processedDonations = [];
    for (const d of donations) {
      let orgName = 'Unknown Organization';
      if (d.receiverId && d.receiverId.role === 'requester_org') {
        const org = await Organization.findOne({ userId: d.receiverId._id });
        if (org) orgName = org.orgName;
      } else if (d.receiverId) {
        orgName = d.receiverId.name;
      }

      processedDonations.push({
        id: d._id,
        organization: orgName,
        requestedFood: d.foodId?.foodName || 'Unknown Food',
        quantity: d.quantity,
        status: d.status === 'Accepted' ? 'Approved' : d.status,
        time: new Date(d.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dateRaw: d.createdAt,
        isUrgent: false // Mocked since urgency is not in schema directly
      });
    }

    res.status(200).json(processedDonations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all donations', error: error.message });
  }
};

exports.getDonationById = async (req, res) => {
  try {
    const d = await DonationRequest.findById(req.params.id)
      .populate('foodId')
      .populate('receiverId', 'name email role');
      
    if (!d) return res.status(404).json({ message: 'Donation request not found' });

    let orgName = 'Unknown', orgType = 'Other', orgContact = 'Not Provided', orgPhone = 'Not Provided';
    if (d.receiverId && d.receiverId.role === 'requester_org') {
      const org = await Organization.findOne({ userId: d.receiverId._id });
      if (org) {
        orgName = org.orgName || 'Unknown';
        orgType = org.representative?.type || 'NPO';
        orgContact = d.receiverId.email || 'No email';
        orgPhone = org.contactNumber || 'No phone';
      }
    }

    const processedDonation = {
      id: d._id,
      status: d.status === 'Accepted' ? 'Approved' : d.status,
      dateRaw: d.createdAt,
      approvalTimeRaw: d.approvalTime || null,
      completedTimeRaw: d.completedTime || null,
      pickupTime: d.preferredPickupTime || 'Not specified',
      time: new Date(d.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUrgent: false,
      organization: {
        name: orgName,
        type: orgType,
        contact: orgContact,
        phone: orgPhone
      },
      requestDetails: {
        food: d.foodId?.foodName || 'Unknown Food',
        quantity: d.quantity,
        reason: d.purpose || 'No reason provided.',
        dietaryMatches: [] // Dietary matches skipped or kept empty
      },
      statusDetails: {
        approvalTime: '--:--',
        notes: 'Awaiting admin review.',
        reviewer: 'Admin'
      },
      timeline: [
        { time: new Date(d.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), title: 'Request Submitted', desc: 'Organization created the donation request.', completed: true },
        { time: '--:--', title: 'Action Taken', desc: 'Admin response pending.', completed: d.status !== 'Pending' }
      ]
    };

    res.status(200).json(processedDonation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donation request', error: error.message });
  }
};

exports.updateDonationStatus = async (req, res) => {
  try {
    let { status } = req.body;
    if (status === 'Approved') status = 'Accepted';

    const updateData = { status };
    if (status === 'Accepted') {
      updateData.approvalTime = new Date();
    } else if (status === 'Completed') {
      updateData.completedTime = new Date();
    }
    
    const d = await DonationRequest.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!d) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(d);
  } catch (error) {
    res.status(500).json({ message: 'Error updating donation request', error: error.message });
  }
};
