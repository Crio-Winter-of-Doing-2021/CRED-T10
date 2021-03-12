//jshint esversion: 8

const mongoose = require('mongoose');


// user schema:
userSchema = mongoose.Schema({
  firstName: {
      type: String, 
      required: true
  },
  lastName: {
      type: String,
      required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
},
  creditCards:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Card'
    }
  ],
  }
);

// Transaction Collection
module.exports = mongoose.model("Users", userSchema);
