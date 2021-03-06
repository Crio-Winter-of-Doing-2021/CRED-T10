//jshint esversion: 8

// Require Modules
const express = require('express');
const connectDB = require('./database/mongoUtil');
const bodyParser = require('body-parser');

// Create App
const app = express();

// Connect to database
connectDB();

// Port configuration for local and cloud databases
const PORT = process.env.PORT || 8081;

// configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Init Middleware
app.use(express.json({extended:false}));

// Route Files
app.get('/', function (req, res) {
  res.status(200).json({msg:'Welcome to backend API'});
});

app.use('/api', require('./routes/backendRoutes.js'));

app.use('/cards', require('./routes/cards.js'));

app.listen(PORT,()=>{
    console.log(`Backend Server running successfully on ${PORT}....\n`);
});
