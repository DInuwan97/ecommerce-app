const express = require("express");
const router = express.Router();
const { check, validatorResult } = require("express-validator");
const Package = require("../../models/Packages");

router.get("/", async (req, res) => {
  try {
    const packages = await Package.find();
    if (!packages) {
      return res.status(400).json({ msg: "No packages available" });
    }
    res.status(200).json(packages);
    console.log(packages);

  } catch (error) {
      res.status(500).json({msg : "Server Error"})
  }
});

router.get('/:packageName',async(req,res) => {
        try {
          const package = await Package.findOne({packageName : req.params.packageName});
          if (!package) {
            return res.status(400).json({ msg: "No package available" });
          }
          res.status(200).json(package);
          console.log(package);
      
        } catch (error) {
            res.status(500).json({msg : "Server Error"})
        }
})

module.exports = router;
