const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const mongoose = require("mongoose");

//getting the auth middlewears
const authUserSecureCode = require("../../middleware/Usesr").authenticateUserSecureCode;
const authenticateUser = require("../../middleware/Usesr").authenticateUser;
//const checkSalesManager = require('../../middleware/Usesr').checkSalesManager;
const onlyAdminAccess = require("../../middleware/Usesr").onlyAdminAccess;

/////////////adding a user////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/register", (req, res) => {
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
    userData.package = req.body.package;
  }
  if (isSalesMaager || isAdmin || isSalesServicer) {
    userData.company = req.body.company;
  }

  //for testing
  console.log(userData);

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
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
                  //res.json({token});
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
/////////////adding a user////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////Secure code verification when registering///////////////////////////////////////////////////////////////////
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

//////////////////////////////Secure code verification when registering///////////////////////////////////////////////////////////////////

//////////////// if user late to verify use email within 100 seconds, the user will ask to enter his email ////////////////////////////////
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
        jwt.sign({ user }, "secretkey", { expiresIn: "100s" }, (err, token) => {
          res.json({ token });
          //res.json({token});
        });
      }
    })
    .catch(err => {
      res.json({ error: err });
    });
});

//////////////// if user late to verify use email within 100 seconds, the user will ask to enter his email ////////////////////////////////

////////////////////////////////////User Login//////////////////////////////////////////////////////////////////
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
              isSalesServicer:user.isSalesServicer
          }

            jwt.sign(
              payload,
              "secretkey",  
              { expiresIn: "100s" },
              (err, token) => {
                res.json({ 
                'token' : token,
                'secureKeyVerifyStatus':user.secureKeyVerifyStatus,
                'email':user.email,
                'firstName':user.firstName,
                'lastName':user.lastName});
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

////////////////////////////////////User Login//////////////////////////////////////////////////////////////////

///////////////////////////admin confirms the Sales Manager/////////////////////////////////////
router.post(
  "/confirmSalesManager",
  authenticateUser,
  onlyAdminAccess,
  (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      //checking the authenticateUser middleweare
      if (err) {
        res.json({ status: "User login token was timed up.." });
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
///////////////////////////admin confirms the Sales Manager/////////////////////////////////////

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


router.post('/confirmSalesServicer', authenticateUser,(req,res)=>{
  
})




module.exports = router;
