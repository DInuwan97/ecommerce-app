const express = require('express');
const router = express.Router();
const Company = require('../../models/Companies');

//add companies
router.post('/add',(req,res)=>{
    
    var company = {
        companyName:req.body.companyName,
        packageName:req.body.packageName,
        mobile:req.body.mobile,
        email:req.body.email
    }

    Company.create(company,(err)=>{
        if(err){
            return res.status(400).send({ msg: err });
        }else{
            return res.status(201).send(company);
        }
    })
  
});

//get companies
router.get('/view',async (req,res)=>{
    try {
        const companies = await Company.find();
        if (!companies) {
          return res.status(400).json({ msg: "No companies Found" });
        }
    
        res.json(companies);
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
      }
})


module.exports = router;