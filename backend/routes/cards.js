//jshint esversion: 8

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose'); // ODM for mongoDB
const luhn = require('luhn'); // for luhn validation of cards
const bcrypt = require('bcryptjs'); // for encryption

const auth = require('../middleware/auth'); // for authentication
// Card Collection
const Card = require('../models/cardSchema');
// Users Collection
const User = require('../models/Users');
// Smart Statement collection
const SmartStatement = require('../models/smartStatement');

// router for /api/cards
router
  .route('/')
  // Get list of cards associated for a user (GET /api/cards with userid)
  .get(auth, async (req, res) => {
    // req.user.id is coming from auth middleware
    const curLoggedInUserId = req.user.id;
    //console.log(curLoggedInUserId);

    const user = await User.findById(curLoggedInUserId).populate('creditCards');
    const creditCardList = user.creditCards;

    const finalCardList = [];

    creditCardList.forEach(function (curCard) {
      const cardName = curCard.name;
      const cardNumber = curCard.account_number;
      const expiryMonth = curCard.expiry_month;
      const expiryYear = curCard.expiry_year;
      const outstandingAmount = curCard.outstanding_amount;

      const cardInfo = {
        name: cardName,
        account_number: cardNumber,
        expiry_month: expiryMonth,
        expiry_year: expiryYear,
        outstanding_amount: outstandingAmount,
      };

      finalCardList.push(cardInfo);
    });
    console.log(finalCardList);
    res.status(200).send(finalCardList);
  });

// Add a credit card (POST /api/cards, this includes verification)
router.post('/', auth, async (req, res) => {
  //console.log(req.user.id);
  // Parameters got when user posts from front-end
  const cardName = req.body.cardName;
  const cardNumber = req.body.cardNumber.toString();
  const expiryMonth = req.body.expiryMonth;
  const expiryYear = req.body.expiryYear;
  const cvv = req.body.cvv.toString();
  const outstandingAmount = req.body.outstandingAmount;
  const creditLimit = req.body.creditLimit;

  // Check if length of card == 16 digit
  if (cardNumber.length != 16) {
    // TODO - change to make it appear gracefully on front-end
    res
      .status(400)
      .json({ msg: 'Invalid Card: Card number must be of 16 digits' });
    return;
  }

  // Check if the cvv of card is 3 digit
  if (cvv.length != 3) {
    // TODO - change to make it appear gracefully on front-end
    res
      .status(400)
      .json({ msg: 'Invalid cvv: cvv should contain only three digits' });
    return;
  }

  // Do Luhn Validation of card
  const is_valid_card = luhn.validate(cardNumber);

  if (!is_valid_card) {
    // TODO - change to make it appear gracefully on front-end

    res.status(400).json({ msg: 'Invalid Card: Luhn Validation Failed' });
    return;
  }

  // Store card in MongoDB database
  const card = new Card({
    name: cardName,
    account_number: Number(cardNumber),
    expiry_month: expiryMonth,
    expiry_year: expiryYear,
    cvv: cvv,
    outstanding_amount: outstandingAmount,
    credit_limit: creditLimit,
  });

  // encrypt the cvv while storing it in database
  const salt = await bcrypt.genSalt(10);
  card.cvv = await bcrypt.hash(cvv, salt);

  // Save card in database and send response
  await card.save(async (err, saved_card) => {
    if (!err) {
      const card_id = saved_card._id;
      const user = await User.findById(req.user.id);
      //console.log(user);
      user.creditCards.push(card_id);
      await User.updateOne({ _id: req.user.id }, user);

      // Save card in SmartStatement for later use
      const smartStatement = new SmartStatement({
        creditCardId: card_id,
        creditCardNumber: Number(cardNumber),
      });

      smartStatement.save((err, savedSmartStatement) => {
        if (!err) {
          console.log(
            'Smart Statement saved successfully with id: ' +
              savedSmartStatement._id
          );
        } else {
          console.log(err);
        }
      });

      res.status(200).json({ id: card_id, msg: 'Card saved successfully' });
    } else {
      const tmpErr = String(err);
      //console.log(typeof tmpErr, tmpErr);
      if (tmpErr.split(' ')[0] === 'MongoError:') {
        res.status(405).json({ msg: 'Card already exists' });
        //console.log('Here', err);
        return;
      }
      res.status(500).json({ msg: err });
      //console.log('HERE', err);
    }
  });
});

module.exports = router;
