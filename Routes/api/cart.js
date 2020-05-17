const express = require("express");
const router = express.Router();

const cart = require("../../models/CartItems");

/////////////////////////////////////// get all items from cartItemsSchema to the cart //////////////////////////////////////////
/* after user went to the shopping cart */
router.get('/', async (req, res) => {
  try {
    console.log("get cart items");
    // rest
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Sever Error" });
  }
});


/////////////////////////////////////////////// add item to the cartItemsSchema //////////////////////////////////////////////////
/* once user click button add to cart */
router.post('/add', async (req, res) => {
  try {
    console.log("add a item to cart");
    console.log(req.body);
    // rest
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Sever Error" });
  }
});


/////////////////////////////////////////// remove items from the cartItemsSchema ////////////////////////////////////////////////
/* user can remove item from shopping cart */
router.delete('/remove/:id', async (req, res) => {
  try {
    console.log("remove a item from cart");
    console.log(req.params.id);
    // rest
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Sever Error" });
  }
});

// optional
//////////////////////////////////////////// update items in the cartItemsSchema /////////////////////////////////////////////////
/* user can change the number of quantity of items in the shopping cart
if user increase or decrease the number of quantity of a item, automatically update the necessary record in the database */
router.patch('/setQuantity', async (req, res) => {
  try {
    console.log("set item quantity");
    console.log(req.body);
    // rest
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Sever Error" });
  }
});



module.exports = router;