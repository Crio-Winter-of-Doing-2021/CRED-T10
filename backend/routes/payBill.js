//jshint esversion: 8

const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");

// Card Collection
const Card = require('../models/cardSchema');

// router for /cards/:id/pay
router.post("/:id/pay", async(req, res)=> {
    var id = req.params.id;
    await Card.findById(id, function (err, foundCard) {
        // If card is found in database
        if (!err) {
          // Update outstanding amount on backend
          foundCard.outstanding_amount -= Number(req.body.amount);
          // Save updated card outstanding amount in database
          foundCard.save((err) => {
            if(!err) {
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
