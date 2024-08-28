const User = require('../models/User');
const logger = require('../utils/logger');
const path = require('path');

const signUp = async (req, res) => {
  try {
    const { fullName, email, phone } = req.body;
    const resumePath = req.file ? path.relative(path.join(__dirname, '../../'), req.file.path) : '';

    const user = new User({ fullName, email, phone, resumePath });
    await user.save();

    logger.info(`New user registered: ${email}`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    logger.error(`Error in user registration: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-resumePath');
    res.status(200).json(users);
  } catch (error) {
    logger.error(`Error fetching users: ${error.message}`);
    res.status(500).json({ error: 'Server error' });

    
  }
};

module.exports = {
  signUp,
  getAllUsers
};