const express = require("express");
const router = express.Router();
const { check, validatorResult } = require("express-validator");
const authAdmin = require('../../middleware/Usesr').onlyAdminAccess;
const authAdminManager = require("../../middleware/Usesr").checkAdminManager;
const Category = require("../../models/Category");

//get all categories in the store
//private access
router.get("/", authAdminManager, async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(400).json({ msg: "No categories found" });
    }

    res.status(200).json(categories);
    console.log(categories);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  const { categoryName, genderType, code } = req.body;

  try {
    const checkCategoryExist = await Category.findOne({
      categoryName
    });
    console.log(checkCategoryExist)
    if (checkCategoryExist != null) {
      return res.status(400).json({ msg: "Category already exist" });
    }

    const newCategory = await new Category({
      categoryName,
      genderType,
      code
    });

    const result = await newCategory.save();
    res.status(200).json({ msg: "Category added sucessfully" });
    console.log(newCategory);
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
    console.error(error);
  }
});

module.exports = router;
