const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const multer = require("multer");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/Usesr").checkAdminManager;
const adminAuth = require("../../middleware/Usesr").onlyAdminAccess;
const Item = require("../../models/Item");

//storage for image uploading
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

//image filtering and upploading
const imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are accepted!"), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dsuhs6bf5", //ENTER YOUR CLOUDINARY NAME
  api_key: require("../../config/keys").CLOUDINARY_API_KEY, // THIS IS COMING FROM CLOUDINARY WHICH WE SAVED FROM EARLIER
  api_secret: require("../../config/keys").CLOUDINARY_API_SECRET, // ALSO COMING FROM CLOUDINARY WHICH WE SAVED EARLIER
});

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
    let {
      itemName,
      price,
      category,
      size,
      color,
      Brand,
      stockQuantity,
      rating,
      itemImage,
      addedBy,
      company
    } = req.body;
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
            itemImage,
            size,
            color,
            Brand,
            stockQuantity,
            rating,
            addedBy,
            company

          }
        );
      } else {
        newItem = new Item({
          itemName,
          price,
          category,
          itemImage,
          size,
          color,
          Brand,
          stockQuantity,
          rating,
          addedBy,
          company
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

//patching the image to the added item
router.patch("/image/:id", upload.single("image"), async (req, res) => {


  setTimeout(async function(){
    try {
      console.log(req.params.id);
      const itemNameImage = await Item.findOne({ itemName: req.params.id });
      console.log(itemNameImage._id);
      console.log("hello world 2");
      //image uplaoding part
      const result2 = null;
      cloudinary.v2.uploader.upload(req.file.path, async function (err, result) {
        if (err) {
          res.json(err.message);
        }
        //req.body.image = result.secure_url;
        try {
          itemNameImage.itemImage = result.secure_url;
          itemNameImage.itemImageId = result.public_id;
          result2 = await itemNameImage.save();
        } catch (error) {
          
        }
      });
  
      console.log(result2);
      res.json(result2);
    } catch (error) {
      console.log(error);
    }
  },3000);


 
});

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

    console.log(req.body.addedBy);
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "dinuka@gmail.com", // sender address
      to: req.body.addedBy, // list of receivers
      subject: "Item Approved", // Subject line
      text: "Hello world?", // plain text body
      html: `
              <h2>Thank You</h2><br/>
              <span>The Item ${req.body.itemName}</span> has been Approved  
              `, // html body
    });

    transporter.sendMail(info, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });


    res.json(checkItemExits);
  } catch (error) {}

});

module.exports = router;
