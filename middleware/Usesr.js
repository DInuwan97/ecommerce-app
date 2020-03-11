const jwt = require("jsonwebtoken");

module.exports = {
  //middlewear 01
  authenticateUserSecureCode: (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  },

  //middlewear 05 - logged user
  authenticateUser: (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.json({ status: "User login token was timed up.." });
    }
  },

  //middlewear04 //admin can only process those tasks
  onlyAdminAccess: (req, res, next) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.json({ status: "User login token was timed up.." });
      } else {
        if (authData.user.isAdmin == false) {
          res.json({ message: "You are not an Admin" });
        } else {
          next();
        }
      }
    });
  },

  //middlewear03 check the entered email address is belongs to a sales manager
  checkSalesManager: (req, res, next) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.json({ message: "You are not an Admin" });
      } else {
        if (
          authData.user.secureKeyVerifyStatus == true &&
          authData.user.isSalaseManager == false
        ) {
          res.json({ message: "Not a sales manager" });
        } else {
          next();
        }
      }
    });
  },

  ///////////////////////////////////////////

  //dinuka
  //middleware to get access for admin,salesmanager and anith eka
  checkAdminManager: (req, res, next) => {
    const token = req.header("Authorization");

    //check if no token
    if (!token) {
      return res.status(401).json({ msg: "No token , authorization denied" });
    }

    try {
      const decoded = jwt.verify(token, "secretkey");
      req.user = decoded.user;

      if(req.user.isSalaseManager == true|| req.user.isAdmin == true || req.user.isSalesServicer == true){
          next();
      }else{
        return res.status(400).json({ msg: "Cannot perform this action" });
      }
      console.log(req.user);
    } catch (err) {
      res.status(401).json({ msg: err });
      console.error(err)
    }
  }
};
