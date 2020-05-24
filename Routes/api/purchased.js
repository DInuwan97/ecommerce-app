const express = require("express");
const router = express.Router();

const PurchasedItem = require('../../models/PurchasedItems');
///////////////////////////////////// add pruchase record ////////////////////////////////////////////////
router.post('/add', async (req, res) => {

  console.log("Data came from checkout : ",req.body);
  try {
    
  let purchasedItem = {
    purchasedUserEmail:req.body.purchasedUserEmail,
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


router.get('/viewByOrder/:id', async (req, res) => {
  try {
    let purchasedItems = await PurchasedItem.find({ _id:req.params.id})
    if(!purchasedItems)
      res.status(404).json({msg:'Order Bot Found'})
      else{
        res.status(200).json(purchasedItems)
      }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Sever Error" });
  }
});



router.get('/viewByUser/:email', async (req, res) => {
  try {
    let purchasedOrders = await PurchasedItem.find({ purchasedUserEmail:req.params.email})
    if(!purchasedOrders)
      res.status(404).json({msg:'Order Bot Found'})
      else{
        res.status(200).json(purchasedOrders)
      }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Sever Error" });
  }
});


router.patch('/hideOrder/:id',async(req,res)=>{
  try{
    let TrackOrder = await  PuchasedItem.find({ _id:req.params.id})
    if(!TrackOrder)
      res.status(404).json({msg:'Order Not Found'})
    else{
      TrackOrder.isHide = req.body.isHide;
      res.status(200).json(TrackOrder);
      await TrackOrder.save();
    }
  }catch(err){
    console.log(err);
  }
})



router.get('/viewPurchasedItems/',async(req,res)=>{
  try{
    let TrackOrder = await  PuchasedItem.find()
    if(!TrackOrder)
      res.status(404).json({msg:'Orders Empty'})
    else{
      res.status(200).json(TrackOrder);
    }
  }catch(err){
    console.log(err);
  }
})

module.exports = router;