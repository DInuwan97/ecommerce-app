const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");

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

module.exports = router;
