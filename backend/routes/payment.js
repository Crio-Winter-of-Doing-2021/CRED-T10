//jshint esversion: 8

const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");
const auth = require('../middleware/auth');

// Card Collection
const Card = require('../models/cardSchema');

// router for /cards/:id/pay
router.post("/", auth, async(req, res)=> {
    // Get the url from :id parameter in server.js which is sent by user
    const id = req.originalUrl.split('/')[3];
    await Card.findById(id, async (err, foundCard) => {
        // If card is found in database
        if (!err) {
          foundCard.outstanding_amount += Number(req.body.amount);

          // Update outstandingAmount in cards Collection
          await Card.updateOne({_id: id}, foundCard);
          res.status(200).json({message: "Bill Payment Successful!", updatedOutstandingAmount: foundCard.outstanding_amount});
        }
        // If card is not found in database
        else {
          res.status(404).json({message: "Card not found"});
        }
    });
  })
;


module.exports = router;
