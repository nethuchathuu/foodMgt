const Person = require('../models/Person');

exports.createPerson = async (req, res) => {
  try {
    const { userId, fullName, homeAddress, dob, nic, gender, email, phoneNumber } = req.body;

    const newPerson = new Person({
      userId,
      fullName,
      homeAddress,
      dob,
      nic,
      gender,
      email,
      phoneNumber
    });

    await newPerson.save();
    res.status(201).json({ message: 'Person profile created successfully', person: newPerson });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create person profile', error: error.message });
  }
};
