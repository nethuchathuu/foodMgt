const Organization = require('../models/Organization');
const User = require('../models/User');

exports.createOrganization = async (req, res) => {
  try {
    const { userId, orgName, orgAddress, regNumber, officialEmail, contactNumber, representative } = req.body;

    const newOrganization = new Organization({
      userId,
      orgName,
      orgAddress,
      regNumber,
      officialEmail,
      contactNumber,
      representative
    });

    await newOrganization.save();
    res.status(201).json({ message: 'Organization profile created successfully', organization: newOrganization });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create organization profile', error: error.message });
  }
};

// GET /api/organization/me - get organization profile for the logged in user
exports.getMyOrganization = async (req, res) => {
  try {
    const userId = req.user._id;
    const org = await Organization.findOne({ userId });
    if (!org) return res.status(404).json({ message: 'Organization profile not found' });
    res.status(200).json({ organization: org });
  } catch (error) {
    console.error('getMyOrganization error', error.message);
    res.status(500).json({ message: 'Failed to fetch organization profile', error: error.message });
  }
};

exports.getOrganizationByIdAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const user = await User.findById(userId);
    if (!user || user.role !== 'requester_org') {
      return res.status(404).json({ message: 'Organization user not found' });
    }
    
    const organization = await Organization.findOne({ userId });
    
    if (!organization) {
      return res.status(404).json({ message: 'Organization details not found' });
    }
    
    // Combine data for frontend
    const responseData = {
      id: user._id,
      name: organization.orgName || user.name,
      regId: organization.regNumber || 'N/A',
      type: organization.type || 'Organization',
      status: user.status,
      contactPerson: organization.representative?.fullName || 'N/A',
      email: organization.officialEmail || user.email,
      phone: organization.contactNumber || organization.representative?.phoneNumber || 'N/A',
      address: organization.orgAddress || 'N/A',
      description: organization.description || 'N/A',
      documents: organization.documents || [],
      yearsOfOperation: organization.yearsOfOperation || 'N/A'
    };
    
    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
