//jshint esversion: 8

const mongoose = require('mongoose');

// Smart Statement Schema
smartStatementSchema = mongoose.Schema({
    creditCardId: { type: mongoose.Schema.Types.ObjectId, required: true },
    creditCardNumber: { type: Number, required: true },
    categoriesIndividualCount: {
      hotel: { type: Number, default: 0 },
      food: { type: Number, default: 0 },
      medical: { type: Number, default: 0 },
      entertainment: { type: Number, default: 0 },
      others: { type: Number, default: 0 }
    },
    categoriesTotalCount: {type: Number, default: 0},
    categoriesIndividualAmount: {
      hotel: { type: Number, default: 0 },
      food: { type: Number, default: 0 },
      medical: { type: Number, default: 0 },
      entertainment: { type: Number, default: 0 },
      others: { type: Number, default: 0 }
    },
    categoriesTotalAmount: {type: Number, default: 0},
    vendorsIndividualCount: {
      oyo: { type: Number, default: 0 },
      trivago: { type: Number, default: 0 },
      zomato: { type: Number, default: 0 },
      swiggy: { type: Number, default: 0 },
      pharmeasy: { type: Number, default: 0 },
      netmeds: { type: Number, default: 0 },
      netflix: { type: Number, default: 0 },
      hotstar: { type: Number, default: 0 },
      others: { type: Number, default: 0 }
    },
    vendorsTotalCount: {type: Number, default: 0},
    vendorsIndividualAmount: {
      oyo: { type: Number, default: 0 },
      trivago: { type: Number, default: 0 },
      zomato: { type: Number, default: 0 },
      swiggy: { type: Number, default: 0 },
      pharmeasy: { type: Number, default: 0 },
      netmeds: { type: Number, default: 0 },
      netflix: { type: Number, default: 0 },
      hotstar: { type: Number, default: 0 },
      others: { type: Number, default: 0 }
    },
    vendorsTotalAmount: {type: Number, default: 0}
  }
);

// Smart Statement Collection
module.exports = mongoose.model("SmartStatement", smartStatementSchema);
