//jshint esversion: 8

const mongoose = require('mongoose');

// Card Schema
cardSchema = mongoose.Schema({
  name: { type: String, required: true },
  // Validate - should be 16 digit
  account_number: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (card_number) {
        return card_number.toString().length == 16;
      },
      message: `MongoDB Error: This is not a valid card number!`,
    },
  },
  expiry_month: { type: Number, required: true, min: 1, max: 12 },
  expiry_year: { type: Number, required: true },
  cvv: { type: String, required: true },
  credit_limit: { type: Number, required: false },
  outstanding_amount: { type: Number, required: false, default: 0 },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'transactions',
      required: false,
    },
  ],
});

// Card Collection
module.exports = mongoose.model('Card', cardSchema);
