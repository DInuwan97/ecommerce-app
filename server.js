const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

//Import routes
const Users = require("./Routes/api/Users");
const Items = require("./Routes/api/items");
const Category = require("./Routes/api/category");
const Review = require("./Routes/api/review");
const Cart = require("./Routes/api/cart");
const Purchase = require("./Routes/api/purchased");
//middlewear
const app = express();

//body parser middlewwear
app.use(bodyParser.json());

app.get("/api/users", (req, res) => {
  res.json({
    message: "Welcome to the API"
  });
});

//get the mongodb url
const db = require("./config/keys").mongoURI;

//Connet to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("Mongo DB Connected."))
  .catch(err => console.log(err));

app.use("/api/users", Users);
app.use("/api/items", Items);
app.use("/api/category", Category);
app.use("/api/review", Review);
app.use("/api/cart", Cart);
app.use("/api/pruchase", Purchase);

app.listen(5000, () => console.log("Server started on 5000"));
