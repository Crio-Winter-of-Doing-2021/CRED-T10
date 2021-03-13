//jshint esversion: 8

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

//  Users collection
const User = require('../models/Users');

// @route     GET api/auth
// @desc      Get user details
// @access    Private
router.get('/',auth,async (req,res)=>{
  try {
    const {firstName,lastName,email,creditCards} = await User.findById(req.user.id).select('-password');

    res.json({
      firstName,
      lastName,
      email,
      creditCards,
    });
  } catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/auth
// @desc      Authorise user and Get token
// @access    Public
router.post('/',[
    body('email','Please include a valid email').isEmail(),
    body('password','Please enter a password with 6 or more characters').exists()
  ], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).json({errors : errors.array() });
    }
  const {email,password} = req.body;
  try {
    let user = await User.findOne({ email });
    if(!user){
      return res.status(403).json({msg: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(403).json({msg: 'Invalid Credentials'});
    }

    //console.log('USER ID:' ,user.id);
    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(payload,config.get('jwtSecret'),{
      expiresIn: 360000
    }, (err,token) => {
      if(err) throw err;
      res.json({token});
    });

  }
  catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error ');
  }
});

module.exports = router;
