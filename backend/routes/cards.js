//jshint esversion: 8

const express = require('express');
const router = express.Router();

// ============ Required here too - not sure why
const mongoose = require("mongoose");
const luhn = require("luhn");

// Card Schema
cardSchema = mongoose.Schema({
    name: { type: String, required: true },
    // Validate - should be 16 digit
    account_number: { type: Number, required: true },
    // Validate - should be 2 digit
    expiry_month: { type: Number, required: true },
    expiry_year: { type: Number, required: true },
    credit_limit: {type: Number, required: false },
    outstanding_amount: {type: Number, required: false}
  }
);

// Collection
const Card = mongoose.model("Card", cardSchema);

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
    card.save(async(err, saved_card)=> {
        if(!err) {
          const card_id = saved_card._id;
          // TODO - save card_id in userInfo schema of current logged_in user


          res.status(200).json({message: "Card saved successfully"});
        } else {
          console.log(err);
        }
    });


  })


;



// Post statement (POST /cards/{id}/statements/{year}/{month}

// Fetch the statement summary (GET /cards/{id}/statements/{year}/{month}

// Payment of the bill (POST /cards/{id}/pay)


module.exports = router;
