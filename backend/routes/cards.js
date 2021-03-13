//jshint esversion: 8

const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");
const luhn = require("luhn");
const auth = require('../middleware/auth');

// Card Collection
const Card = require('../models/cardSchema');
// Users Collection
const User = require('../models/Users');

// router for /api/cards
router.route('/')
  // Get list of cards associated for a user (GET /api/cards with userid)
  .get(auth, async(req, res)=> {
    // req.user.id is coming from auth middleware
    const curLoggedInUserId = req.user.id;
    console.log(curLoggedInUserId);

    const user = await User.findById(curLoggedInUserId).populate("creditCards");
    const creditCardList = user.creditCards;

    const finalCardList = [];

    creditCardList.forEach(function (curCard) {
      const cardName = curCard.name;
      const cardNumber = curCard.account_number;
      const expiryMonth = curCard.expiry_month;
      const expiryYear = curCard.expiry_year;

      const cardInfo = {
        name: cardName,
        account_number: cardNumber,
        expiry_month: expiryMonth,
        expiry_year: expiryYear
      };

      finalCardList.push(cardInfo);
    });

    res.status(200).send(finalCardList);
  })


  // Add a credit card (POST /api/cards, this includes verification)
  .post(auth, async(req, res)=> {
    // Parameters got when user posts from front-end
    const cardName = req.body.cardName;
    const cardNumber = req.body.cardNumber;
    const expiryMonth = req.body.expiryMonth;
    const expiryYear = req.body.expiryYear;
    const outstandingAmount = req.body.outstandingAmount;
    const creditLimit = req.body.creditLimit;

    // Check if length of card == 16 digit
    if (cardNumber.length != 16) {
      // TODO - change to make it appear gracefully on front-end
      res.status(400).json({message: "Invalid Card: Card number must be of 16 digits"});
    }

    // Do Luhn Validation of card
    const is_valid_card = luhn.validate(cardNumber);

    if(!is_valid_card) {
      // TODO - change to make it appear gracefully on front-end

      res.status(400).json({message: "Invalid Card: Luhn Validation Failed"});
    }

    // Store card in MongoDB database
    const card = new Card({
      name: cardName,
      account_number: cardNumber,
      expiry_month: expiryMonth,
      expiry_year: expiryYear,
      outstanding_amount: outstandingAmount,
      credit_limit: creditLimit
    });

    // Save card in database and send response
    await card.save((err, saved_card)=> {
      if(!err) {
        const card_id = saved_card._id;
        // save card_id in userInfo schema of current logged_in user

        const curLoggedInUserId = req.user.id;
        console.log(curLoggedInUserId);

        User.findById(curLoggedInUserId, function(err, foundUser) {
          if(!err) {
            // Push new card_id in User collection
            foundUser.creditCards.push(card_id);
            // Save updated user with newly pushed creditCard id in database
            foundUser.save((err) => {
              if(err) {
                res.status(500).json({message: "DB Error: Unable to add new card in database"});
              }
           });
          }
          else {
            res.status(400).json({message: "Card Not found for current user"});
          }
        });

        res.status(200).json({_id: card_id, message: "Card saved successfully"});

      } else {
        console.log(err);
      }
    });
  })
;

module.exports = router;
