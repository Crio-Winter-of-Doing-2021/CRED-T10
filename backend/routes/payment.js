//jshint esversion: 8

const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");
const auth = require('../middleware/auth');

// Card Collection
const Card = require('../models/cardSchema');
// Users Collection
const User = require('../models/Users');

// router for /cards/:id/pay
router.post("/", auth, async(req, res)=> {
    // Get the url from :id parameter in server.js which is sent by user
    const id = req.originalUrl.split('/')[3];
    await Card.findById(id, async (err, foundCard) => {
        // If card is found in database
        if (!err) {
          const paymentAmount = req.body.amount;
          // Update outstanding amount on backend
          foundCard.outstanding_amount -= Number(paymentAmount);

          // req.user.id is coming from auth middleware
          const curLoggedInUserId = req.user.id;
          console.log(curLoggedInUserId);

          const user = await User.findById(curLoggedInUserId);

          // Update reward points in user colection
          if(paymentAmount > 4999) {
            user.rewardPoints += paymentAmount * 2/100;
          } else if(paymentAmount > 9999) {
            user.rewardPoints += paymentAmount * 3/100;
          } else if(paymentAmount > 19999) {
            user.rewardPoints += paymentAmount * 3.5/100;
          }

          // Save updated card outstanding amount in database
          foundCard.save(async (err) => {
            if(!err) {
              // Save user with updated reward points
              await user.save((err, savedUser) => {
                if(!err) {
                  console.log('Reward Points updated successfully');
                } else {
                  console.log(err);
                }
              });

              res.status(200).json({message: "Bill paid successfully"});
            } else {
              res.status(500).json({message: "Error in paying bill"});
            }
          });
        }
        // If card is not found in database
        else {
          res.status(404).json({message: "Card not found"});
        }
    });
  })
;


module.exports = router;
