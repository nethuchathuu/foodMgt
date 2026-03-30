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
