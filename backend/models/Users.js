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
//TODO: change this to ObjectId not number
//creditCards:[{type:Mongoose.Schema.Types.ObjectId}],
  creditCards: [{type:Number}],
  }
);

// Transaction Collection
module.exports = mongoose.model("Users", userSchema);
