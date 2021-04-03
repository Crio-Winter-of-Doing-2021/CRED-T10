//jshint esversion: 8

// Require Modules
const express = require('express');
const connectDB = require('./database/mongoUtil');
const cors = require('cors');

// Create App
const app = express();

// Connect to database
connectDB();

// cors
app.use(cors());

// api-docs-swagger
const swaggerUi = require("swagger-ui-express");
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs.yaml');

app.use('/api/swagger-ui/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Port configuration for local and cloud databases
const PORT = process.env.PORT || 8081;

// Init Middleware
app.use(express.json({extended:false}));
app.use(express.urlencoded({ extended: true }));

// Route Files
app.get('/', function (req, res) {
  res.status(200).json({msg:'Welcome to backend API NOW'});
});

app.use('/api', require('./routes/backendRoutes.js'));

app.use('/api/users', require('./routes/users.js'));
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/cards', require('./routes/cards.js'));
app.use(`/api/cards/:id/statements`, require('./routes/statements.js'));

// Payment of the bill (POST /cards/{id}/pay)
app.use('/api/cards/:id/pay', require('./routes/payment.js'));

// Smart Statement API (GET /cards/{id}/smartstatements)
app.use('/api/cards/:id/smartstatement', require('./routes/smartStatement.js'));

app.listen(PORT,()=>{
    console.log(`Backend Server running successfully on ${PORT}....\n`);
});
