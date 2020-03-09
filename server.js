const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

//Import routes
const Users = require('./Routes/api/Users');

//middlewear
const app = express();

//body parser middlewwear
app.use(bodyParser.json());

app.get('/api/users',(req,res)=>{
    res.json({
        message:"Welcome to the API"
    })
});

//get the mongodb url
const db = require('./config/keys').mongoURI;

//Connet to mongo
mongoose
    .connect(db,{useNewUrlParser:true ,useUnifiedTopology:true})
    .then(() => console.log('Mongo DB Connected.'))
    .catch(err => console.log(err));

app.use('/api/users',Users);




app.listen(5000,()=>console.log('Server started on 5000'));