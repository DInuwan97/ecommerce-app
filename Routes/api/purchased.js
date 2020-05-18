const express = require("express");
const router = express.Router();

const PurchasedItem = require('../../models/PurchasedItems');
///////////////////////////////////// add pruchase record ////////////////////////////////////////////////
router.post('/add', async (req, res) => {

  console.log("Data came from checkout : ",req.body);
  try {
    
  let purchasedItem = {
    buyerDetails:req.body.buyerDetails,
    items:req.body.items,
    summary:req.body.summary
  }

  PurchasedItem.create(purchasedItem ,(err)=>{
    if(err){
        return res.status(400).send({ msg: err });
    }else{
        return res.status(201).send(purchasedItem);
    }
  })
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Sever Error" });
  }
});

///////////////////////////////////// remove a purchase records /////////////////////////////////////////////
router.delete('/remove/:id', async (req, res) => {
  try {
    console.log("remove a purchase record");
    console.log(req.params.id);
    // rest
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Sever Error" });
  }
});

///////////////////////////////////// remove a purchase records /////////////////////////////////////////////
router.get('/removeAll', async (req, res) => {
  try {
    console.log("remove all purchase records");
    // rest
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Sever Error" });
  }
});

module.exports = router;