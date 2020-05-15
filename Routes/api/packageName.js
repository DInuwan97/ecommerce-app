const express = require("express");
const router = express.Router();
const PackageName = require('../../models/PackageNames');

//add package
router.post('/add', (req,res)=>{
  
    let packageName = {
        packageName:req.body.packageName,
        maxNoOfSalesServicers:req.body.maxNoOfSalesServicers,
        packageIconImage:req.body.packageIconImage
    }

    PackageName.create(packageName,(err)=>{
        if(err){
            return res.status(400).send({ msg: err });
        }else{
            return res.status(201).send(packageName);
        }
    })
});


//get packages
router.get('/view',async (req,res)=>{
    try {
        const packesNames = await PackageName.find();
        if (!packesNames) {
          return res.status(400).json({ msg: "No Packages Found" });
        }
    
        res.json(packesNames);
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
      }
})
module.exports = router;