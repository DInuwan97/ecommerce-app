const express = require('express');
const mongoose = require('mongoose');






//routes
//
//
//



const app = express();


//DB config
const db = require('./config/keys').mongoURI;


//Connecting to the DB
mongoose
    .connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log('Conneted to MOngoDB'))
    .catch(err => console.log(err));







//use routes
//
//
//








const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server started on ${PORT}`));

