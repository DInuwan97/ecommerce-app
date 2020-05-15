const express = require("express");
const router = express.Router();
const PackageName = require('../../models/PackageNames');

//add package
router.post('/add', (req,res)=>{
    const newPackage = new PackageName(req.body);
    newPackage.save()
    .then((res)=>{
        res.status(200).json({'msg':'Package Added Succssfully'})
    })
    .catch(err=>{
        res.status(400).json(err)
    })
});


//get packages
router.get('/view',async (req,res)=>{
    try {
        const packesNames = await PackageName.find();
        if (!packesNames) {
          return res.status(400).json({ msg: "No Items Found" });
        }
    
        res.json(packesNames);
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
      }
})
module.exports = router;