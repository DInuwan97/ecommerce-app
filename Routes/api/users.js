const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const axios = require('axios');

//-------------------------------Mongoose Schema Imports--------------------------------------
const User = require("../../models/User");

//-------------------------------Middleware Imports---------------------------------------------
const authUserSecureCode = require("../../middleware/Usesr").authenticateUserSecureCode;
const authenticateUser = require("../../middleware/Usesr").authenticateUser;

//-------------------------------NodeMailer Credentials Imports--------------------------------------
const email = require('../../config/mailCredentials').email;
const password = require('../../config/mailCredentials').password;


//-------------------------------User Actions--------------------------------------------------------

// Method         : POST
// Header         : None
// Params         : None
// Body           : userData
// Validation     : User Input Field Validations, Email Validation, two same emails dows not allow
// Return         : Adde user's object (HTTP Standard status codes (200 || 400))
// Description    : Add a  new user into system
// Multi Factor Auth : SMS Gatway
router.post("/register", (req, res) => {
  let userType = req.body.userType; 

  
  let isCustomer = false;
  let isSalesMaager = false;
  let isAdmin = false;
  let isSalesServicer = false;

  let salesManagerVerification = false; //only for sales services
  let adminVerification = false; //only for sales managers

  //generating a 5 digit random number for secure key
  let secureKey = Math.floor(Math.random() * 100001);

  //check the user types and adjust boolean values
  switch (userType) {
    case "Customer":
      isCustomer = true;
      break;
    case "SalesManager":
      isSalesMaager = true;
      break;
    case "SalesServicer":
      isSalesServicer = true;
      break;
    case "Admin":
      isAdmin = true;
      break;
    default:
      isCustomer = true;
      break;
  }

  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobile: req.body.mobile,
    password: req.body.password,
    regDate: req.body.regDate,

    isAdmin: isAdmin,
    isCustomer: isCustomer,
    isSalesManager: isSalesMaager,
    isSalesServicer: isSalesServicer,

    secureKey: secureKey
  };
  //if user is only SalesServicer,Sales Manager should allow the access
  if (isSalesServicer) {
    userData.salasManagerVerification = salesManagerVerification;
  }
  if (isSalesMaager) {
    userData.adminVerification = adminVerification;
  }
  if (isAdmin || isSalesMaager) {
    userData.packageName = req.body.packageName;
  }
  if (isSalesMaager || isAdmin || isSalesServicer) {
    userData.company = req.body.company;
  }

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {

        axios({
          method: "get",
          url: //sms edpoint,
        });
      

        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then(user => {
              jwt.sign(
                { user },
                "secretkey",
                { expiresIn: "1000s" },
                (err, token) => {

                  res.json({
                    status:
                      user.firstName +
                      " " +
                      user.lastName +
                      " was registered from " +
                      secureKey,
                    token: token
                  });
               
                }
              );
            })
            .catch(err => {
              res.json({ error: err });
            });
        });
      } else {
        res.status(400).json({ message: "User already registered" });
      }
    })
    .catch(err => {
      res.json({ error: err });
    });
});


// Method         : POST
// Header         : Authorization - 'bearer token'
// Params         : None
// Body           : userData
// Validation     : User Input Field Validations, Secure Key Validation, Token Timeout Validation
// Return         : HTTP Standard status codes (200 || 404)
// Description    : Verify a  new user into system

router.post("/verify", authUserSecureCode, (req, res) => {

  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json({statuc:"Token Expired"});
    } else {
      //update query in mongodb
      async function updateUserSecureVerification(id) {
        const user = await User.findById(id);
        if (!user) return;

        user.secureKeyVerifyStatus = true;
        user.save();
      }

      //update instructions
      function verifySecureCode() {
        const currentSecureKey = {
          secureCode: req.body.secureCode
        };

        let verifyInfo = {
          id: authData.user._id,
          email: authData.user.email,
          secureCode: authData.user.secureKey
        };

        if (verifyInfo.secureCode == currentSecureKey.secureCode) {
          updateUserSecureVerification(verifyInfo.id);
          res.json({ status: verifyInfo.email + " is verified." });
        } else {
          res.status(404).json({ status: "Secure code is not correct." });
        }

        console.log(currentSecureKey);
      }

      //method calling
      verifySecureCode();
    }
  });
});

// Method         : POST
// Params         : None
// Body           : userData
// Validation     : User Input Field Validations
// Return         : HTTP Standard status codes (200 || 404)
// Description    : Reactivate secure code
// Multi Factor Auth : SMS Gatway

router.post("/resendEmail", (req, res) => {
  //update query in mongodb
  async function updateUserSecureCode(id) {
    const user = await User.findById(id);
    if (!user) return;

    user.secureKey = Math.floor(Math.random() * 100001);
    user.save();
  }

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        res.status(404).json({ message: "User Email is invalid" });
      } else {
        axios({
          method: "get",
          url: //sms endpoint,
        });

        jwt.sign({ user }, "secretkey", { expiresIn: "100s" }, (err, token) => {
          res.json({ 
            'token' :token,
            'securekey':user.secureKey,
            'fistName':user.firstName,
            'mobile':user.mobile
        });
          //res.json({token});
        });
      }
    })
    .catch(err => {
      res.json({ error: err });
    });
});

// Method         : POST
// Header         : Authorization - 'bearer token'
// Body           : username and password
// Validation     : User Input Field Validations, Secure Key Verification,Chekc valid email or not,chek  passwords are incorect or not
// Return         : HTTP Standard status codes (200 || 404)
// Description    : Login to the SYSTEM
// Multi Factor Auth : SMS Gatway

router.post("/login", (req, res) => {
  console.log(req.body.email+ ' : ' +req.body.password);
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          if (user.secureKeyVerifyStatus == true) {
            const payload={
              _id:user._id,
              firstName:user.firstName,
              lastName:user.lastName,
              email:user.email,
              mobile:user.mobile,
              isAdmin:user.isAdmin,
              isCustomer:user.isCustomer,
              isSalesManager:user.isSalesManager,
              isSalesServicer:user.isSalesServicer,
              company:user.company,
              userImageUrl:user.userImageUrl,
              salasManagerVerification:user.salasManagerVerification,
              adminVerification:user.adminVerification
            
          }

            jwt.sign(
              payload,
              "secretkey",  
              { expiresIn: "100h" },
              (err, token) => {
                res.json({ 
                'token' : token,
                'secureKeyVerifyStatus':user.secureKeyVerifyStatus,
                'email':user.email,
                'firstName':user.firstName,
                'lastName':user.lastName,
                'isSalesManager':user.isSalesManager,
                'isSalesServicer':user.isSalesServicer,
                'isAdmin':user.isAdmin,
                'isCustomer':user.isCustomer,
                'adminVerification':user.adminVerification,
                'salasManagerVerification':user.salasManagerVerification});
              }
            );
          } else {
            res.status(403).json({ status: "Update your Security key first..." });
          }
        } else {
          res.status(400).json({ message: "User Password is Incorrect" });
        }
      } else {
        res.status(404).json({ message: "User does ot exist in the system" });
      }
    })
    .catch(err => {
      res.json({ error: err });
    });
});

// Method         : POST
// Header         : Authorization - 'bearer token'
// Body           : username and password
// Return         : HTTP Standard status codes (200 || 404)
// Description    : Admin should confirm the Sales Manager
// Multi Factor Auth : Email Sending
router.post(
  "/confirmSalesManager",
  authenticateUser,
  (req, res) => {
    console.log('Method is calling');
    jwt.verify(req.token, "secretkey", (err, authData) => {
      //checking the authenticateUser middleweare
      if (err) {
        res.status(403).json({ status: "User login token was timed up.." });
      } else {
        //update query in mongodb
        async function updateUserSecureCode(email) {
          const result = await User.update(
            { email: email },
            {
              $set: {
                adminVerification: true
              }
            }
          );
        }

        const email = req.body.email;
        User.findOne({
          email: req.body.email
        })
          .then(user => {
            //checking the authenticateUsers middleweare
            if (err) {
              res.sendStatus(403);
            } else {
              if (user) {
                User.find({ email: email })
                  .then(result => {
                    console.log(result[0]);

                    if (result[0].isSalesManager == true) {
                      if (result[0].secureKeyVerifyStatus == true) {
                        updateUserSecureCode(email);
                        res.json({ status: "Admin aproved the Sales Manager" });
                      } else {
                        res.json({
                          status:
                            "Evenif this user registered as a SalesManager,did not verfy secure code"
                        });
                      }
                    } else {
                      //not a Sales Manager
                      res.json({
                        status:
                          "Entered email was not belongs to a Sales Manager"
                      });
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });

                /////email sending t the sales manager abou the approval
              } else {
                res.json({ status: "Invalid Email address" });
              }
            }
          })
          .catch(err => {
            res.json({ errpr: err });
          });
      }
    });
  }
);

// Method         : GET
// Header         : Authorization - 'bearer token'
// Body           : username and password
// Return         : HTTP Standard status codes (200 || 404)
// Description    : Admin should confirm the Sales Manager
// Multi Factor Auth : Email Sending
router.get("/profile", authenticateUser, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.json({ status: "User login token was timed up.." });
    } else {
      if (authData.user.secureKeyVerifyStatus == true) {
        res.json({
          email: authData.user.email,
          firstName: authData.user.firstName,
          lastName: authData.user.lastName
        });
      } else {
        res.json({
          status: "Not Allowed to access the system...Verify Secure Key"
        });
      }
    }
  });
});


// Method         : GET
// Header         : Authorization - 'bearer token'
// Body           : username and password
// Return         : HTTP Standard status codes (200 || 404)
// Description    : Admin should confirm the Sales Manager
// Multi Factor Auth : Email Sending
router.get('/viewusers', authenticateUser,async (req,res)=>{

  console.log('User lITS : ');


  try {
    const users = await User.find();
    if (!users) {
      return res.status(400).json({ msg: "No Users Available" });
    }
    res.status(200).json(users);
   
  } catch (error) {
    res.status(500).json({ msg: "viewusers route error" });
    console.error(error);
  }
})

// Method         : PATCH
// Header         : Authorization - 'bearer token'
// Body           : username and password
// Return         : HTTP Standard status codes (200 || 404)
// Description    : Admin should confirm the Sales Manager
// Multi Factor Auth : Email Sending
router.patch('/confirmSalesServicer/:email',authUserSecureCode,async (req,res)=>{
  try{
    let user = await User.findOne({email:req.params.email})
    if(!user){
      res.status(404).json({"message":"User Not found in to given email"})
    }else{
      if(user.secureKeyVerifyStatus === true){

        user.salasManagerVerification = true;
        await user.save()
        res.status(200).json({"message":"Update the Sales Manager's Verification"})
        console.log('Salese Servicer approved on : ',req.params.email);
      }else{
        res.status(403).json({"message":`${req.params.email} have to verift security key first`})
      }
    }

  }catch(error){
    console.log(error);
  }
});



// Method         : GET
// Header         : Authorization - 'bearer token'
// Body           : username and password
// Return         : HTTP Standard status codes (200 || 404)
// Description    : Admin should confirm the Sales Manager
// Multi Factor Auth : Email Sending
router.patch('/updatemyProfile/:email',authUserSecureCode,async (req,res)=>{

  console.log('Request Body of updateMyProfile : ', req.params);

  jwt.verify(req.token, "secretkey",  async (err, authData) => {

    if(err){
      res.status(400).json({'error':err})
    }else{
 
      let user = await User.findOne({email:req.params.email})
     

      if(req.params.email == authData.email){
        user.firstName = req.body.firstName,
        user.lastName = req.body.lastName,
        user.mobile = req.body.mobile,
        user.address = req.body.address

        await user.save();
        res.status(200).json(user);

      }else{
        res.status(404).json({"msg" : "Email is not logged user's email"})
      }
    }
    });

});



//storage for image uploading
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

//image filtering and upploading
const imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are accepted!"), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dsuhs6bf5", //ENTER YOUR CLOUDINARY NAME
  api_key: require("../../config/keys").CLOUDINARY_API_KEY, // THIS IS COMING FROM CLOUDINARY WHICH WE SAVED FROM EARLIER
  api_secret: require("../../config/keys").CLOUDINARY_API_SECRET, // ALSO COMING FROM CLOUDINARY WHICH WE SAVED EARLIER
});



// Method         : PATCH
// Header         : Authorization - 'bearer token'
// Body           : username and password
// Return         : HTTP Standard status codes (200 || 404)
// Description    : Admin should confirm the Sales Manager
// Multi Factor Auth : Email Sending
router.patch('/updateImage/:email',upload.single("image"),async (req,res)=>{

  console.log('image uploading route call : ');

    try {
      console.log('lOgged email : ', req.params.email);
      let user = await User.findOne({email:req.params.email})
      console.log("User Email: ",user);
     
      const result2 = null;
      cloudinary.v2.uploader.upload(req.file.path, async function (err, result) {
        if (err) {
          res.json(err.message);
          console.log('Err msg')
        }

        try {
          user.userImageUrl = result.secure_url;
          user.userImageUrlId = result.public_id;

          console.log(user.userImageUrl);
          result2 = await  user.save();
        } catch (error) {
          console.log('Error : ');
        }
     });
  
      console.log(user);
      
      res.json(user);
    } catch (error) {
      console.log(error);
    }

})


router.get('/singleUser/:email',async (req,res)=>{
  try {
    console.log('Request Body of singeUser : ', req.params);
    const users = await User.findOne({email:req.params.email});
    //const users = await User.find();
    if (!users) {
      return res.status(400).json({ msg: "No User is Available" });
    }
    res.status(200).json(users);
   
  } catch (error) {
    res.status(500).json({ msg: "viewusers route error" });
    console.error(error);
  }
})


// Method         : GET
// Header         : Authorization - 'bearer token'
// Body           : username and password
// Return         : HTTP Standard status codes (200 || 404)
// Description    : Admin should confirm the Sales Manager
// Multi Factor Auth : Email Sending
router.get('/getCompnayNames',async(req,res)=>{
  try{

    

  }catch(err){
    console.log(err);
    res.json(err);
  }
})

// Method         : GET
// Header         : Authorization - 'bearer token'
// Body           : username and password
// Return         : HTTP Standard status codes (200 || 404)
// Description    : Admin should confirm the Sales Manager
// Multi Factor Auth : Email Sending
router.patch('/changePassword/:email',authUserSecureCode,async (req,res)=>{

  console.log('Changing password : ' ,req.body,req.params);
  jwt.verify(req.token, "secretkey",  async (err, authData) => {

    try{

      if(err){
        res.status(500).json({'error':err})
      }else{

        
        let user = await User.findOne({email:req.params.email});
        if(!user) res.status(404).json({msg:'No user Found'})

        if(req.params.email == authData.email){

      

            try{
              if(req.body.newPassword == req.body.confirmPassword){

                bcrypt.hash(req.body.newPassword, 10, async (err, hash) => {
                  user.password = hash;
                  
                  await user.save();
                  res.status(200).json({'user new data' : user});
                })
  
              }else{
                res.status(403).json({'msg':'Passwords does not match'})
              }
            }catch(err){
              res.json('Bcrypt error is : ', err)
            }
           

        }else{
          res.status(400).json('email blongs to another person');
        }
      }
  
    }catch(err){
      console.log(err);
      res.json(err);
    }

  })

})

// Method         : DELETE
// Header         : Authorization - 'bearer token'
// Body           : username and password
// Return         : HTTP Standard status codes (200 || 404)
// Description    : Admin should confirm the Sales Manager
// Multi Factor Auth : Email Sending
router.delete("/deleteSalesManager/:email", async (req, res) => {
  //check if user exist

  console.log('Sales Manager Deleteing : ',req.params)
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) 
       return res.status(400).json({ msg: "User does not exist" });
    
    res.status(200).json(user);
    await user.remove();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});




// Method       : Post
// Headers      : Authorization - 'Bearer token'
// Params       : None
// Body         : to, cc, bcc, subject, msg, reviewId - Optional 
// Validation   : User Validation
// Return       : msg , +data - if success
// Description  : This Method sends an Email if the user haves the permission 
//                  and the valid details are provided
// Optional     : If the ReviedId is provided the method updates the review tables relavent id as Admin Replied
//                  and sets the replied message, and time
router.post('/admin/sendMail/',authUserSecureCode,async (req, res) => {
  const msg = req.body.msg;
  const to = req.body.to;
  const subject = req.body.subject;


  if (msg && subject && (to)) {
      const transporter = await nodemailer.createTransport({
          service: "Gmail",
          auth: {
              user: email,
              pass: password
          }
      });

      await transporter.sendMail({
          to: to,
          subject: subject,
          html: msg

      }).then(async done => {
          return res.status(200).send({ msg: "Email Sent", data: done });

      }).catch(err => {
          res.status(400).send({ msg: err });
      });


  } else {
      res.status(400).send({ msg: "Mandory fields are missing. To/CC/BCC or Subject or message" })
  }

});

// Method       : Post
// Headers      : Authorization - 'Bearer token'
// Params       : None
// Body         : to, cc, bcc, subject, msg, reviewId - Optional 
// Validation   : User Validation
// Return       : msg , +data - if success
// Description  : This Method sends an Email if the user haves the permission 
//                  and the valid details are provided
// Optional     : If the ReviedId is provided the method updates the review tables relavent id as Admin Replied
//                  and sets the replied message, and time
router.post('/forgotPassword',(req,res)=>{

  console.log('Fog pwd : ',req.body)
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        res.status(404).json({ message: "User Email is invalid" });
      } else {

        if(user.mobile !== req.body.mobile){
          res.status(400).json({ message: "User Mobile is invalid" });
        }
 
        axios({
          method: "get",
          url: `http://api.liyanagegroup.com/sms_api.php?sms=Hello ${user.firstName}. Your Verification code is ${user.secureKey}&to=94${user.mobile}&usr=0766061689&pw=4873`,
        });

        jwt.sign({ user }, "secretkey", { expiresIn: "100s" }, (err, token) => {
          res.json({ 
            'token' :token,
            'securekey':user.secureKey,
            'fistName':user.firstName,
            'mobile':user.mobile,
            'email':user.email
        });


        });
      }
    })
    .catch(err => {
      res.json({ error: err });
    });
})


// Method         : POST
// Header         : Authorization - 'bearer token'
// Body           : username and password
// Return         : HTTP Standard status codes (200 || 404)
// Description    : Admin should confirm the Sales Manager
// Multi Factor Auth : Email Sending
router.post('/enterSecureCode/:email',(req,res)=>{

  User.findOne({
    email: req.params.email
  })
  .then(user=>{
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    }else{
      if(user.secureKey !== parseInt(req.body.secureKey)){
        console.log('User Key :',user.secureKey)
        console.log('Secure cODE DETAILS : ' ,req.body.secureKey)
        res.status(400).json({message:'Secure Keys not Match'})
      }else{
        res.json({message:'Process OK'})
      }
    }
  })
})



// Method         : PATCH
// Header         : Authorization - 'bearer token'
// Body           : username and password
// Return         : HTTP Standard status codes (200 || 404)
// Description    : Admin should confirm the Sales Manager
// Multi Factor Auth : Email Sending
router.patch('/changePasswordForgot/:email',async (req,res)=>{

  console.log('Changing password : ' ,req.body,req.params);

        let user = await User.findOne({email:req.params.email});
        if(!user) res.status(404).json({msg:'No user Found'})

            try{
              if(req.body.newPassword == req.body.confirmPassword){

                bcrypt.hash(req.body.newPassword, 10, async (err, hash) => {
                  user.password = hash;
                  
                  await user.save();
                  res.status(200).json({'user new data' : user});
                })
  
              }else{
                res.status(403).json({'msg':'Passwords does not match'})
              }
            }catch(err){
              res.json('Bcrypt error is : ', err)
            }

})

module.exports = router;
