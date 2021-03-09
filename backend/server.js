//jshint esversion: 8

// Require Modules
const express = require('express');
const connectDB = require('./database/mongoUtil');

// Create App
const app = express();

// Connect to database
connectDB();

// Port configuration for local and cloud databases
const PORT = process.env.PORT || 8081;

// Init Middleware
app.use(express.json({extended:false}));
app.use(express.urlencoded({ extended: true }));

// Route Files
app.get('/', function (req, res) {
  res.status(200).json({msg:'Welcome to backend API'});
});

app.use('/api', require('./routes/backendRoutes.js'));

// Add a credit card (POST /cards, this includes verification)
// Get list of cards associated for a user (GET /cards with userid)
app.use('/cards', require('./routes/cards.js'));

// Payment of the bill (POST /cards/{id}/pay)
app.use('/cards', require('./routes/payment.js'));

app.listen(PORT,()=>{
    console.log(`Backend Server running successfully on ${PORT}....\n`);
});
