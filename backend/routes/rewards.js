const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');

//  Users collection
const User = require('../models/Users');

const auth = require('../middleware/auth');

// route for /api/rewardPoints
router.post(
  '/',

  [
    auth,
    [
      body(
        'newRewardPoints',
        'Please Provide a number for new Reward Points'
      ).exists(),
      body(
        'newRewardPoints',
        'Please Provide a number for new Reward Points'
      ).isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const newRewardPoints = Number(req.body.newRewardPoints);
      if (newRewardPoints < 0) {
        res.status(400).json({
          msg: 'cannot encash more reward Points than the amount present',
        });
        return;
      }
      await User.findByIdAndUpdate(req.user.id, {
        rewardPoints: newRewardPoints,
      });
      res.status(200).json({ msg: 'successful encashing of reward Points' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: 'server error, transaction failed' });
    }
  }
);

module.exports = router;
