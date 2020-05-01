const express = require("express");
const router = express.Router();

///////////////////////////////////// add pruchase record ////////////////////////////////////////////////
router.post('/add', async (req, res) => {
  try {
    console.log("add a purchase record");
    console.log(req.body);
    // rest
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