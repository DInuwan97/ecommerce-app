const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");

//getting all the items
//public access
router.get("/", async (req, res) => {
  try {
    const Items = await Item.find();
    if (!Items) {
      return res.status(400).json({ msg: "No Items Found" });
    }

    res.json(Items);
    console.log(Items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

//getting a specific item
//publuic access
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById({ _id: req.params.id });
    if (!item) {
      return res.status(400).send({ msg: "No item found" });
    }
    res.json(item);
    console.log(item);
  } catch (error) {
    res.status(500).json({ msg: "Sever Error" });
    console.error(error);
  }
});


//adding a new item to the store
//access private
router.post('/',async (req,res) => {
    let {itemName,price,category,size,color,Brand,stockQuantity,discount,rating} = req.body
    const checkItemExist = await Item.findOne({itemName});
    let result = null;
    let newItem = null;
    try {

    if(checkItemExist){
        stockQuantity = parseInt(checkItemExist.stockQuantity) + parseInt(stockQuantity);
         newItem = await  Item.findOneAndUpdate({itemName},{
            itemName,
            price,
            category,
            size,
            color,
            Brand,
            stockQuantity,
            discount,
            rating
        });

    }else{
         newItem = await new Item({
            itemName,
            price,
            category,
            size,
            color,
            Brand,
            stockQuantity,
            discount,
            rating
        });
    }
   
        result = await newItem.save();
        console.log(result);
        res.json(result)
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;
