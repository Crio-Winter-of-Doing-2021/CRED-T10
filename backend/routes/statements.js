//jshint esversion: 8

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const {AccountSummary,PaymentInformation,RewardSummary,AccountActivity,TotalsYearToDate,Statement} = require('../models/Statement');


//  Users collection
const User = require('../models/Users');
const {Transaction} = require('../models/transactionSchema');
const Card = require('../models/cardSchema');


let getCurrentDate = ()=>{
  let currentTime = new Date();
 // console.log(currentTime)
  currentTime = currentTime.toLocaleDateString();
  currentTime = currentTime.split('/');
  const cmonth = currentTime[0];
  const cyear = currentTime[2];
  const cdate = currentTime[1];
 //console.log(cdate,cmonth,cyear,'HERE\n');
  return {cdate,cmonth,cyear};
};

const addRelevantInformation = (obj,creditCardNumber,monthAndYear) =>{
  obj.creditCardNumber = creditCardNumber;
  obj.monthAndYear = monthAndYear;
  return obj;
};

const fetchStatementFromCardCompanies = async (req)=>{
  const creditCardNumber = req.originalUrl.split('/')[3];
  const {year,month} = req.params;
  const monthAndYear = month.toString()+year.toString();
  const tmpObject = req.body;
  let {accountSummary,paymentInformation,rewardSummary,accountActivity,totalsYearToDate} = tmpObject;
  let statement = tmpObject;
  const transactions = accountActivity.transactions;
  accountSummary = addRelevantInformation(accountSummary,creditCardNumber,monthAndYear);
  accountActivity = addRelevantInformation(accountActivity,creditCardNumber,monthAndYear);
  paymentInformation = addRelevantInformation(paymentInformation,creditCardNumber,monthAndYear);
  rewardSummary = addRelevantInformation(rewardSummary,creditCardNumber,monthAndYear);
  totalsYearToDate = addRelevantInformation(totalsYearToDate,creditCardNumber,monthAndYear);
  statement = addRelevantInformation(statement,creditCardNumber,monthAndYear);
  statement.accountActivity = accountActivity;
  statement.accountSummary = accountSummary;
  statement.paymentInformation = paymentInformation;
  statement.rewardSummary = rewardSummary;
  statement.totalsYearToDate = totalsYearToDate;


  accountSummary = new AccountSummary(accountSummary);
  paymentInformation = new PaymentInformation(paymentInformation);
  rewardSummary = new RewardSummary(rewardSummary);
  accountActivity = new AccountActivity(accountActivity);
  totalsYearToDate = new TotalsYearToDate(totalsYearToDate);
  statement = new Statement(statement);
  await statement.save();
  //let transactionIdArray = [];
  await Transaction.insertMany(transactions, async (err,transactionArr)=>{
    if(err){
      console.log(err);
    }
    else{
      const creditCard = await Card.findOne({account_number:creditCardNumber});
      transactionArr.map((ele)=>{
        creditCard.transactions.push(ele._id);
        return ele;
      });
      // console.log(creditCard);
      await Card.updateOne({account_number:creditCardNumber},creditCard);
    }
  });

  return {statement,transactions};
};



// @route     POST api/users
// @desc      Post a transaction
// @access    Public
// Post statement (POST /api/cards/{cardNumber}/statements/{year}/{month}
router.post('/:year/:month', async(req,res)=>{

  let {statement, transactions} = await fetchStatementFromCardCompanies(req);
  // console.log(transactions);

  // cardNumber is received from the http request url
  const cardNumber = Number(req.originalUrl.split('/')[3]);

  let totalTransactionAmount = 0;
  transactions.forEach(function (curTransaction) {
    if (curTransaction.transaction_type === "debit") {
      totalTransactionAmount -= curTransaction.amount;
    }
    else if (curTransaction.transaction_type === "credit") {
      totalTransactionAmount += curTransaction.amount;
    }
  });

  // Calculate outanding_amount and update its value in cards collection
  const foundCard = await Card.findOne({account_number: cardNumber});

  foundCard.outstanding_amount += totalTransactionAmount;

  // Update outstandingAmount in cards Collection
  await Card.updateOne({account_number: cardNumber}, foundCard);
  res.status(200).json({statement,transactions});
});

// @route     GET api/cards/{cardNumber}/statements/{year}/{month}
// @desc      Fetch the statement summary for a particular year and month
// @access    Private
// Fetch the statement summary (GET /api/cards/{cardNumber}/statements/{year}/{month} )
router.get(`/:year/:month`,auth, async (req,res)=>{
  // cardNumber is received from the http request url
  const cardNumber = Number(req.originalUrl.split('/')[3]);
  const {year,month} = req.params;

  const {cdate,cmonth,cyear} = getCurrentDate();
  // check if the particular user has this credit card or not
  const user =
    await User.findById(req.user.id)
                      .populate("creditCards");

  let checkIfUserHasThisCard = false;
  for(let i=0;i<user.creditCards.length;i++){
    if(user.creditCards[i].account_number === cardNumber) {
        checkIfUserHasThisCard = true;
        break;
      }
  }
  if(!checkIfUserHasThisCard){
    res.status(401).json({msg:'User Not Authorized'});
  }
  // Handling future transactions
  else if(cyear<year || (cyear===year && cmonth<month)){
    res.status(404).json({msg:'Data does not exist'});
  }
  else{
    const creditCardNumber = Number(cardNumber);
    const monthAndYear = month.toString()+year.toString();
    await Statement.findOne({creditCardNumber,monthAndYear},(err,statement)=>{
      if(err){
        //console.log(err);
        res.status(500).json({msg:err});
      }
      if(!statement){
        res.status(404).json({msg:'Statement Not Found'});
      }
      else{
        //console.log(statement);
        res.status(200).json({statement});
      }
    });
  }
  //console.log(req.user.id,'\n',req.originalUrl.split('/')[3],'\n');
  //console.log(req.params.year,req.params.month);

});


module.exports = router;
