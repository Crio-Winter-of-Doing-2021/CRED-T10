//jshint esversion: 8

const mongoose = require("mongoose");
const db = "mongodb+srv://user:password@321@cred.9lfix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
      console.log('MongoDB Connected...');
  } catch(err) {
        console.log(err.message);
        process.exit(1);
  }

    // .then(()=>console.log('MongoDB Connected'))
    // .catch(err=> {

    // });
};

module.exports = connectDB;
