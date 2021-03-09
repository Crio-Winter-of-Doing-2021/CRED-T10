//jshint esversion: 8

const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");
const luhn = require("luhn");

// Card Collection
const Card = require('../models/cardSchema');

// Transaction Collection
const Transaction = require('../models/transactionSchema');

// router for /cards/:id/pay
router.route("/:id/pay")
  .post(async(req, res)=> {
    var id = req.params.id;
    await Card.findById(id, function (err, foundCard) {
        // If card is found in database
        if (!err) {

          // Store transaction in MongoDB database
          const transactionAmount = req.body.amount;
          const transactionType = req.body.transactionType;
          const transactionCategory = req.body.category;
          const transactionVendor = req.body.vendor;

          const transaction = new Transaction({
            amount: transactionAmount,
            transaction_type: transactionType,
            category: transactionCategory,
            vendor: transactionVendor
          });

          transaction.save((err, saved_transaction)=> {
            if(!err) {
              const transaction_id = saved_transaction._id;
              // Push new transaction_id in card collection
              foundCard.transactions.push(transaction_id);

              // Check if transaction type is debit/credit
              if(req.body.transactionType == "debit") {
                foundCard.outstanding_amount -= Number(req.body.amount);
              }
              else if(req.body.transactionType == "credit") {
                foundCard.outstanding_amount += Number(req.body.amount);
              }

              // Save updated card outstanding amount in database
              foundCard.save((err) => {
                if(!err) {
                  res.status(200).json({_id: transaction_id, message: "Transaction and card balance updated successfully"});
                } else {
                  res.status(500).json({message: "Error in transacting"});
                }
             });

            } else {
              console.log(err);
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
