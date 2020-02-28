const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//Import routes
//const Users = require('./Routes/api/users');


//middlewear
const app = express();



//get the mongodb url
const db = require('./config/keys').mongoURI;

//Connet to mongo
mongoose
    .connect(db,{useNewUrlParser:true ,useUnifiedTopology:true})
    .then(() => console.log('Mongo DB Connected.'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log('Server started on ' +PORT));