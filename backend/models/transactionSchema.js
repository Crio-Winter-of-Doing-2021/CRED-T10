//jshint esversion: 8

const mongoose = require('mongoose');

// Transaction Schema
transactionSchema = mongoose.Schema({
    amount: {type: Number, required: true},
    transaction_type: {type: String, required: true},
    category: {type: String, required: true},
    vendor: {type: String, required: true}
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

// Transaction Collection
module.exports = mongoose.model("Transaction", transactionSchema);
