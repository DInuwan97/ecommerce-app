const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const mongoose = require('mongoose');


//getting the auth middlewears
const authUserSecureCode = require('../../middleware/Usesr').authenticateUserSecureCode;
const authenticateUser  = require('../../middleware/Usesr').authenticateUser;
//const checkSalesManager = require('../../middleware/Usesr').checkSalesManager;
const onlyAdminAccess = require('../../middleware/Usesr').onlyAdminAccess;



/////////////adding a user////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/register',(req,res)=>{

    let userType = req.body.userType; //UI ask the type of user

    //bacjend configure,above user type as bellow
    let isCustomer = false;
    let isSalesMaager = false;
    let isAdmin = false;
    let isSalesServicer = false;

    
    let salesManagerVerification = false; //only for sales services
    let adminVerification = false; //only for sales managers

    //generating a 5 digit random number for secure key
    let secureKey = Math.floor(Math.random() * 100001);

    
    //check the user types and adjust boolean values
    switch(userType){
        case 'Customer':
            isCustomer = true;
            break; 
        case 'SalesManager':
            isSalesMaager = true;
            break;
        case 'SalesServicer':
            isSalesServicer = true;
            break;   
        case 'Admin':
            isAdmin=true;
            break;     
         default:
            isCustomer = true;
    }       


        const userData = {

            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            mobile:req.body.mobile,
            password:req.body.password,
            regDate:req.body.regDate,

            isAdmin:isAdmin,
            isCustomer:isCustomer,
            isSalesManager:isSalesMaager,
            isSalesServicer:isSalesServicer,

            secureKey:secureKey,
          

        }
        //if user is only SalesServicer,Sales Manager should allow the access
        if(isSalesServicer){
            userData.salasManagerVerification = salesManagerVerification
        }
        if(isSalesMaager){
            userData.adminVerification = adminVerification
        }
        if(isAdmin || isSalesMaager){
            userData.package = req.body.package
        }
        if(isSalesMaager || isAdmin || isSalesServicer){
            userData.company = req.body.company 
        }

        //for testing
        console.log(userData)


        User.findOne({
            email:req.body.email
        })
        .then(user=>{
            if(!user){
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    userData.password = hash
                    User.create(userData)
                    .then(user=>{
                        
                        
                        jwt.sign({user},'secretkey',{expiresIn:'100s'},(err,token)=>{
                            res.json({status:user.firstName+ " " +user.lastName+ " was registered from " +secureKey,
                                      token:token})
                            //res.json({token});
                        });

                    })
                    .catch(err =>{
                        res.json({error:err})
                    })
                })
            }else{
                res.json({message:"User already registered"})
            }
        })
        .catch(err=>{
            res.json({error:err})
        })
});
/////////////adding a user////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////Secure code verification when registering///////////////////////////////////////////////////////////////////
router.post('/verify',authUserSecureCode,(req,res)=>{

    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{

            //update query in mongodb
            async function updateUserSecureVerification(id){
                const user = await User.findById(id)
                if(!user) return;

                user.secureKeyVerifyStatus = true;
                user.save();
            }


            //update instructions
            function verifySecureCode(){

                const currentSecureKey = {
                    secureCode:req.body.secureCode
                }
              
                    let verifyInfo= {
                        id:authData.user._id,
                        email:authData.user.email,
                        secureCode:authData.user.secureKey
                    }
     
                if(verifyInfo.secureCode == currentSecureKey.secureCode){
                    updateUserSecureVerification(verifyInfo.id)
                    res.json({status:verifyInfo.email+ " is verified."});
                }else{
                    res.json({status:"Secure code is not correct."});
                }
    
            }

            //method calling
            verifySecureCode();
            
        }
    });
});

//////////////////////////////Secure code verification when registering///////////////////////////////////////////////////////////////////


//////////////// if user late to verify use email within 100 seconds, the user will ask to enter his email ////////////////////////////////
router.post('/resendEmail',(req,res)=>{


   //update query in mongodb
   async function updateUserSecureCode(id){
        const user = await User.findById(id)
        if(!user) return;

        user.secureKey =  Math.floor(Math.random() * 100001);
        user.save();
    }


    User.findOne({
        email:req.body.email
    })
    .then(user=>{
        if(!user){
            res.json({message:"User Email is invalid"})
        }else{

            jwt.sign({user},'secretkey',{expiresIn:'100s'},(err,token)=>{
                res.json({token})
                //res.json({token});
            });
        }
    })
    .catch(err=>{
        res.json({error:err})
    })

})

//////////////// if user late to verify use email within 100 seconds, the user will ask to enter his email ////////////////////////////////


////////////////////////////////////User Login//////////////////////////////////////////////////////////////////
router.post('/login',(req,res)=>{
            User.findOne({
                email:req.body.email
            })
            .then(user =>{
                if(user){

                    if(bcrypt.compareSync(req.body.password,user.password)){
                      if(user.secureKeyVerifyStatus == true){
                        jwt.sign({user},'secretkey',{expiresIn:'100s'},(err,token)=>{
                            res.json({token})
                        });
                      }else{
                        res.json({status:"Update your Security key first..."})
                      }
                    }else{
                        res.json({message:"User Password is Incorrect"})
                    }
                }else{
                    res.json({message:"User does ot exist in the system"})
                }
            })
            .catch(err=>{
                res.json({error:err})
            })
      
    })

////////////////////////////////////User Login//////////////////////////////////////////////////////////////////


///////////////////////////admin confirms the Sales Manager/////////////////////////////////////
router.post('/confirmSalesManager',authenticateUser,onlyAdminAccess,(req,res)=>{
    
    jwt.verify(req.token,'secretkey',(err,authData)=>{

        //checking the authenticateUser middleweare 
        if(err){
            res.json({status:"User login token was timed up.."})
        }else{

//////////////////////////////// aulak thibe /////////////////////////////////
            let result =null;
            //select the user
            async function getUserDetails(email){
                 result = await User
                .find({email:email})
                console.log(result[0].isSalesManager)
            }
//////////////////////////////// aulak thibe /////////////////////////////////
 
            
                //update query in mongodb
            async function updateUserSecureCode(email){
                const result = await User.update({email:email},{
                    $set:{
                        adminVerification:true
                    }
                });    
            }

            const email  = req.body.email;
            User.findOne({
               email:req.body.email
            })
            .then(user =>{

                //checking the authenticateUsers middleweare
                if(err){
                    res.sendStatus(403);
                }else{

                    if(user){

                        
                        let result = getUserDetails(email);
                        console.log("The result is :" +result)
                        if(result == true){
                            
                            updateUserSecureCode(email);
                            res.json({status:"Admin aproved the Sales Manager"});
                            /////email sending t the sales manager abou the approval

                        }else{ //not a Sales Manager
                            res.json({status:"Entered email was not belongs to a Sales Manager"})
                        }

                   
                   }else{
                       res.json({status:"Invalid Email address"})
                   }
                }
                
            })
            .catch(err=>{
                    res.json({errpr:err})
            })
         

            


        }

    })



})
///////////////////////////admin confirms the Sales Manager/////////////////////////////////////



router.get('/profile',authenticateUser,(req,res)=>{

    jwt.verify(req.token,'secretkey',(err,authData)=>{

        if(err){
            res.json({status:"User login token was timed up.."})
        }else{

            if(authData.user.secureKeyVerifyStatus == true){
                res.json({
                    email:authData.user.email,
                    firstName:authData.user.firstName,
                    lastName:authData.user.lastName
                   })

            }else{
               
                res.json({status:"Not Allowed to access the system...Verify Secure Key"})
            }
           
        }
    });
})
module.exports = router;