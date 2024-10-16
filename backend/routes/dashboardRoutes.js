const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Donation = require('../models/Donation');

// Dashboard Route: GET /api/dashboard
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId;  // Get user ID from query params
    const user = await User.findById(userId);
    const donations = await Donation.find({ referralCode: user.referralCode });

    const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0);

    res.json({
      name: user.name,
      referralCode: user.referralCode,
      totalDonations
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data.' });
  }
});

module.exports = router;
