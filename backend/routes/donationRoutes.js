const express = require('express');
const Donation = require('../models/Donation');
const router = express.Router();

router.post('/donate', async (req, res) => {
  const { donorName, amount, referralCode } = req.body;

  try {
    const donation = new Donation({ donorName, amount, referralCode });
    await donation.save();
    res.json({ message: 'Donation successful!' });
  } catch (error) {
    res.status(400).json({ message: 'Error processing donation', error });
  }
});

module.exports = router;
