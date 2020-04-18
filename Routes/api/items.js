const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/Usesr").checkAdminManager;
const adminAuth = require("../../middleware/Usesr").onlyAdminAccess;
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

//adding a new item to the store &  checking whether the
//item exist from the name if exist update the stock quantity and other details
// update other values
//access private
//Here the authorization has to implemented

router.post(
  "/",
  [
    // auth,
    [
      check("itemName", "Item Name is required").not().notEmpty(),
      check("price", "Price is requried").not().notEmpty(),
      check("price", "Price should a Number").isNumeric(),
      check("category", "Category is required").not().isEmpty(),
      check("stockQuantity", "Quantity is required").not().isEmpty(),
      check("stockQuantity", "Quantity is Number").isInt(),
    ],
  ],
  async (req, res) => {
    //checking for errors
    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //   return res.status(400).json({ error: error.array() });
    // }
    let {
      itemName,
      price,
      category,
      size,
      color,
      Brand,
      stockQuantity,
      rating,
    } = req.body;

    if (
      !(
        category == "BRONZE" ||
        category == "SILVER" ||
        category == "GOLD" ||
        category == "PLATINUM"
      )
    ) {
      return res.status(400).json({ msg: "Not a Valid Category" });
    }

    const checkItemExist = await Item.findOne({ itemName });
    let result = null;
    let newItem = null;
    try {
      if (checkItemExist) {
        stockQuantity =
          parseInt(checkItemExist.stockQuantity) + parseInt(stockQuantity);
        newItem = await Item.findOneAndUpdate(
          { itemName },
          {
            itemName,
            price,
            category,
            size,
            color,
            Brand,
            stockQuantity,
            rating,
          }
        );
      } else {
        newItem = new Item({
          itemName,
          price,
          category,
          size,
          color,
          Brand,
          stockQuantity,
          rating,
        });
      }

      result = await newItem.save();
      console.log(result);
      res.json(result);
    } catch (error) {
      console.error(error);
    }
  }
);

//update and item
//access private
//put request
router.patch(
  "/updateItem/:id",
  [
    // auth,
    [
      check("itemName", "Item Name is required").not().notEmpty(),
      check("price", "Price is requried").not().notEmpty(),
      check("price", "Price should a Number").isNumeric(),
      check("category", "Category is required").not().isEmpty(),
      check("stockQuantity", "Quantity is required").not().isEmpty(),
      check("stockQuantity", "Quantity is Number").isInt(),
    ],
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    try {
      const checkItemExist = await Item.findOne({ _id: req.params.id });
      if (!checkItemExist) {
        return res.status(400).json({ msg: "No item Exist" });
      }
      let {
        itemName,
        price,
        category,
        size,
        color,
        Brand,
        stockQuantity,
        rating,
      } = req.body;

      checkItemExist.set({
        itemName,
        price,
        category,
        size,
        color,
        Brand,
        stockQuantity,
        rating,
      });

      const result = await checkItemExist.save();
      res.send(result);
      console.log(result);
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
      console.error(error);
    }
  }
);

//delete a specifi Item
//private access
//delete request

//authorization  adminAuth,
router.delete("/:id", async (req, res) => {
  //check if item exist
  try {
    const checkItemExits = await Item.findOne({ _id: req.params.id });
    if (!checkItemExits) {
      return res.status(400).json({ msg: "Item does not exist" });
    }
    res.status(200).json(checkItemExits);
    await checkItemExits.remove();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

//adding a discount to a item
//patch request
//authentication required
//private access
router.patch(
  "/addDiscount",
  [
    auth,
    [
      check("itemName", "Item Name is required").not().notEmpty(),
      check("discount", "Discount is required").not().isEmpty(),
      check("discount", "Discount is Number").isNumeric(),
    ],
  ],
  async (req, res) => {
    //check whetaher the item exist
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }
      const checkItemExits = await Item.findOne({
        itemName: req.body.itemName,
      });
      if (!checkItemExits) {
        return res.status(400).json({ msg: "Item does not exist" });
      }

      checkItemExits.set({
        discount: req.body.discount,
      });
      const result = await checkItemExits.save();

      res.json(result);
      console.log(result);
    } catch (error) {
      res.status(500).json({ msg: "Server Error" });
      console.error(error);
    }
  }
);

router.patch("/:id", async (req, res) => {
  try {
    const checkItemExits = await Item.findOne({ _id: req.params.id });
    if (!checkItemExits) {
      return res.status(400).json({ msg: "Item does not exist" });
    }

    checkItemExits.isApproved = true;
    await checkItemExits.save();

    //sending email to the client
    let transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "cd1d2b8d863288",
        pass: "41ff48f6db0ffa",
      },
    });

    console.log(req.body.clientEmail);
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "dinuka@gmail.com", // sender address
      to: req.body.clientEmail, // list of receivers
      subject: "Item Approved", // Subject line
      text: "Hello world?", // plain text body
      html: `
              <h2>Thank You</h2><br/>
              <span>The Item ${req.body.item}</span> has been Approved  
              `, // html body
    });

    transporter.sendMail(info, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });

    res.json(checkItemExits)
  } catch (error) {}
});


module.exports = router;
