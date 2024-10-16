const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email } = req.body;

  // Generate a unique referral code
  const referralCode = Math.random().toString(36).substring(7);

  try {
    const user = new User({ name, email, referralCode });
    await user.save();
    res.json({ message: 'User created successfully!', referralCode });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
});

module.exports = router;
