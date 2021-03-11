const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

let getCurrentDate = ()=>{
  let currentTime = new Date();
 // console.log(currentTime)
  currentTime = currentTime.toLocaleDateString();
  currentTime =currentTime.split('/');
  const cmonth = currentTime[0];
  const cyear = currentTime[2];
  const cdate = currentTime[1];
 //console.log(cdate,cmonth,cyear,'HERE\n');
  return {cdate,cmonth,cyear};
}




//  Users collection
const User = require('../models/Users');

// @route     POST api/users
// @desc      Register a user
// @access    Public

// Post statement (POST /api/cards/{id}/statements/{year}/{month}


// @route     GET api/cards/{id}/statements/{year}/{month}
// @desc      Register a user
// @access    Public
// Fetch the statement summary (GET /api/cards/{id}/statements/{year}/{month} )
router.get(`/:year/:month`,auth,(req,res)=>{
  const id = req.originalUrl.split('/')[3];
  const {year,month} = req.params;
  console.log(id,year,month);
  const {cdate,cmonth,cyear} = getCurrentDate();
  if(req.user.id!=id){
    res.status(401).json({msg:'Invalid Credentials'});
  }
  else if(cyear<year || (cyear===year && cmonth<month)){
    res.status(404).json({msg:'Data does not exist'});
  }
  else{
    res.status(200).json({msg:'Works'});
  }
  //console.log(req.user.id,'\n',req.originalUrl.split('/')[3],'\n');
  //console.log(req.params.year,req.params.month);
  
})


module.exports = router;