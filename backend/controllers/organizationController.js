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
