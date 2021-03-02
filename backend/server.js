const express = require('express')
const app = express()
const PORT = process.env.PORT || 8081;

// Init Middleware
app.use(express.json({extended:false}));

//Route Files
app.use('/api',require('./routes/backendRoutes.js'));

app.get('/', function (req, res) {
  res.status(200).json({msg:'Welcome to backend API'});
})

app.listen(PORT,()=>{
    console.log(`Backend Server running successfully on ${PORT}....\n`);

})