const express = require("express");
const router = express.Router();
const { check, validatorResult } = require("express-validator");
const authAdmin = require("../../middleware/Usesr").onlyAdminAccess;
const authAdminManager = require("../../middleware/Usesr").checkAdminManager;
const Category = require("../../models/Category");

//get all categories in the store
//private access, only for admin
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

//add new category
//private access, only for admin
//post request
router.post(
  "/",
  [
    check("categoryName", "Category Name is required")
      .not()
      .isEmpty(),
    check("categoryName", "Should not have Numeric values").isString(),
    check("genderType", "Gender type is required").isEmpty()
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { categoryName, genderType, code } = req.body;

    try {
      const checkCategoryExist = await Category.findOne({
        categoryName
      });
      console.log(checkCategoryExist);
      if (checkCategoryExist != null) {
        return res.status(400).json({ msg: "Category already exist" });
      }

      const newCategory = new Category({
        categoryName,
        genderType,
        code
      });

      await newCategory.save();
      res.status(200).json({ msg: "Category added sucessfully" });
      console.log(newCategory);
    } catch (error) {
      res.status(500).json({ msg: "Server Error" });
      console.error(error);
    }
  }
);

//update a existing category
//private access, only for admin
//put request
router.put(
  "/",
  [
    check("categoryName", "Category Name is required")
      .not()
      .isEmpty(),
    check("categoryName", "Should not have Numeric values").isString(),
    check("genderType", "Gender type is required").isEmpty()
  ],
  async (req, res) => {
    const { categoryName, genderType, code } = req.body;
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }
      const checkCategoryExist = await Category.findOne({
        categoryName
      });
      console.log(checkCategoryExist);
      if (!checkCategoryExist) {
        return res.status(400).json({ msg: "Category not found" });
      }

      checkCategoryExist.set({
        categoryName,
        genderType,
        code
      });

      const result = await checkCategoryExist.save();
      res.status(200).json(result);
      console.log(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

//delete request
//private access
//deleting a category
router.delete("/", async (req, res) => {
  try {
    const checkCategoryExist = await Category.findOne({
      categoryName: req.body.categoryName
    });
    console.log(checkCategoryExist);
    if (!checkCategoryExist) {
      return res.status(400).json({ msg: "Category not found" });
    }

    await checkCategoryExist.remove();
    res.status(200).json("Item Deleted Sucessfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
