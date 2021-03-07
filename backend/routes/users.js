//jshint esversion: 8

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//  Users collection
const User = require('../models/Users');

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post('/',[ 
    body('firstName','Please enter a First name').not().isEmpty(),
    body('lastName','Please enter a Last name').not().isEmpty(),
    body('email','Please include a valid email').isEmail(),
    body('password','Please enter a password with 6 or more characters').isLength({min : 6})
  ]
  ,async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors : errors.array() });
    }
  const {firstName,lastName,email,password} = req.body;
  try {
    let user = await User.findOne({ email });
    if(user){
      return res.status(400).json({msg: 'User already exists' });
    }
    user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password =  await bcrypt.hash(password,salt);
    await user.save();
    //res.send('User Saved');
    console.log('USER ID:' ,user.id);
    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(payload,config.get('jwtSecret'),{
      expiresIn: 360000
    }, (err,token) => {
      if(err) throw err;
      res.json({token});
    });

  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error ');
  }
})

module.exports = router;