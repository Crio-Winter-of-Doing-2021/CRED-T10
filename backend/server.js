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

app.use('/api/users', require('./routes/users.js'));
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/cards', require('./routes/cards.js'));

app.listen(PORT,()=>{
    console.log(`Backend Server running successfully on ${PORT}....\n`);
});
