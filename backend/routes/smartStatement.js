//jshint esversion: 8

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Smart Statement collection
const SmartStatement = require('../models/smartStatement');

// Add at least 7 items for pie chart to look good
const categoryList = ['Hotels', 'Food', 'Medical', 'Entertainment', 'Others'];

// Get Smart Statements for current card (GET /cards/{id}/smartstatements)
router.get('/', auth, async (req, res) => {
  // get card id or card Number
  const cardId = req.originalUrl.split('/')[3];

  const foundSmartStatement = await SmartStatement.findOne({
    creditCardId: cardId,
  });

  const categoriesNames = Object.keys(
    foundSmartStatement.categoriesIndividualCount.toJSON()
  );
  const categoriesCount = Object.values(
    foundSmartStatement.categoriesIndividualCount.toJSON()
  );
  const categoriesAmount = Object.values(
    foundSmartStatement.categoriesIndividualAmount.toJSON()
  );

  const vendorsNames = Object.keys(
    foundSmartStatement.vendorsIndividualCount.toJSON()
  );
  const vendorsCount = Object.values(
    foundSmartStatement.vendorsIndividualCount.toJSON()
  );
  const vendorsAmount = Object.values(
    foundSmartStatement.vendorsIndividualAmount.toJSON()
  );

  const categoriesTotalAmount = foundSmartStatement.categoriesTotalAmount;
  const vendorsTotalAmount = foundSmartStatement.vendorsTotalAmount;

  const categoriesAmountPercent = categoriesAmount.map((amount) =>
    ((amount / categoriesTotalAmount) * 100).toFixed(1)
  );
  const vendorsAmountPercent = vendorsAmount.map((amount) =>
    ((amount / vendorsTotalAmount) * 100).toFixed(1)
  );

  res.status(200).json({
    categoriesNames,
    categoriesCount,
    categoriesAmount,
    vendorsNames,
    vendorsCount,
    vendorsAmount,
    categoriesAmountPercent,
    vendorsAmountPercent,
  });
});

module.exports = router;
