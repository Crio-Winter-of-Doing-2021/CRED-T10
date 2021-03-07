//jshint esversion: 8

const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");
const luhn = require("luhn");

// Card Collection
const Card = require('../models/cardSchema');
// Transaction Collection
const Transaction = require('../models/transactionSchema');

// router for /cards
router.route('/')
  // Get list of cards associated for a user (GET /cards with userid)
  .get(async(req, res)=> {
    res.status(200).json({msg:'Backend API route'});
  })

  // Add a credit card (POST /cards, this includes verification)
  .post(async(req, res)=> {
    // Parameters got when user posts from front-end
    const cardName = req.body.cardName;
    const cardNumber = req.body.cardNumber;
    const expiryMonth = req.body.expiryMonth;
    const expiryYear = req.body.expiryYear;

    // Check if length of card == 16 digit
    if (cardNumber.length != 16) {
      // TODO - change to make it appear gracefully on front-end
      res.status(400).json({message: "Invalid Card: Card number must be of 16 digits"});
    }

    // Do Luhn Validation of card
    const is_valid_card = luhn.validate(cardNumber);

    if(!is_valid_card) {
      // send error
      // TODO - change to make it appear gracefully on front-end

      res.status(400).json({message: "Invalid Card: Luhn Validation Failed"});
    }

    // Store card in MongoDB database
    const card = new Card({
      name: cardName,
      account_number: cardNumber,
      expiry_month: expiryMonth,
      expiry_year: expiryYear
    });

    // Save card in database and send response
    await card.save((err, saved_card)=> {
      if(!err) {
        const card_id = saved_card._id;
        // TODO - save card_id in userInfo schema of current logged_in user


        res.status(200).json({_id: card_id, message: "Card saved successfully"});
      } else {
        console.log(err);
      }
    });
  })
;


//  ============= INCOMPLETE ROUTE

// Payment of the bill (POST /cards/{id}/pay)
router.route("/:id/pay")
  .post(async(req, res)=> {
    // save transaction in transactions_schema

    // add/deduct from outstanding amount in card_schema
    await Card.findOneAndUpdate({_id: req.params.id},
      // Only for debits
      {outstanding_amount: Number(foundCard.outstanding_amount) - Number(req.body.amount)},
      function(err, foundCard) {
        if(foundCard) {
          res.status(200).send("Card found");
        } else {
          res.status(404).json({
            status: "404",
            message: "Card not found"
          });
        }
      });

  })
;


// Post statement (POST /cards/{id}/statements/{year}/{month}



// Fetch the statement summary (GET /cards/{id}/statements/{year}/{month}




module.exports = router;
