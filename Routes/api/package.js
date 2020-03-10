const express = require("express");
const router = express.Router();
const { check, validatorResult } = require("express-validator");
const Package = require("../../models/Packages");

//getting all the packages
//private access
//get request

router.get("/", async (req, res) => {
  try {
    const packages = await Package.find();
    if (!packages) {
      return res.status(400).json({ msg: "No packages available" });
    }
    res.status(200).json(packages);
    console.log(packages);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

//getting a single package type
//private access
//get request
router.get("/:packageName", async (req, res) => {
  try {
    const package = await Package.findOne({
      packageName: req.params.packageName
    });
    if (!package) {
      return res.status(400).json({ msg: "No package available" });
    }
    res.status(200).json(package);
    console.log(package);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

//adding a packages
//admin access only
//post request

router.post(
  "/",
  [
    check("packageName", "Package Name is required")
      .not()
      .isEmpty(),
    check("noOfUsers", "No of User should be a Value").isNumeric(),
    check("noOfUsers", "No of User Should be a Integer").isInt()
  ],
  async (req, res) => {
    try {
      const { packageName, noOfUsers, tags, description } = req.body;
      const checkPackageExist = await Package.findOne({
        packageName
      });
      if (checkPackageExist) {
        return res.status(400).json({ msg: "package already exists" });
      }

      const newPackage = await new Package({
        packageName,
        noOfUsers,
        tags,
        description
      });

      const result = await newPackage.save();
      res.status(200).json(result);
      console.log(result);
    } catch (error) {
      res.status(500).json({ msg: "Server Error" });
      console.error(error);
    }
  }
);

//delete a package
//privaet access
//delete request
router.delete("/", async (req, res) => {
  try {
    const checkPackageExist = await Package.findOne({
      packageName: req.body.packageName
    });
    if (!checkPackageExist) {
      return res.status(400).json({ msg: "package does not exist" });
    }

    await checkPackageExist.remove();
    res.status(200).json({ msg: "package deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
    console.error(error);
  }
});

router.put(
  "/",
  [
    check("packageName", "Package Name is required")
      .not()
      .isEmpty(),
    check("noOfUsers", "No of User should be a Value").isNumeric(),
    check("noOfUsers", "No of User Should be a Integer").isInt()
  ],
  async (req, res) => {
    const { packageName, noOfUsers, tags, description } = req.body;
    try {
      const checkPackageExist = await Package.findOne({
        packageName: req.body.packageName
      });
      if (!checkPackageExist) {
        return res.status(400).json({ msg: "package does not exist" });
      }

      checkPackageExist.set({
        packageName,
        noOfUsers,
        tags,
        description
      });

      const result = await checkPackageExist.save();
      res.status(200).json(result);
      console.log(result);
    } catch (error) {
      res.status(500).json({ msg: "Server Error" });
      console.error(error);
    }
  }
);

module.exports = router;
