const Item = require("../models/Item");
const ReviewComments = require("../models/ReviewComments");
const jwt = require("jsonwebtoken");

module.exports = {
    //middleware to verify security code
    verifyUserSecureCode: (req, res, next) => {
        jwt.verify(req.token, "secretkey", (err, authData) => {
            if (err) {
                return res.status(400).send({ msg: err });
            } else {
                if (authData.user.secureKeyVerifyStatus == true) {
                    req.authData = authData;
                    next();
                } else {
                    return res.status(401).send({ msg: "Verify Secure Key First." })
                }
            };
        })
    },

    //middleware to check item id is valid
    verifyItem: (req, res, next) => {
        var itemID = req.params.id;
        Item.find({ _id: itemID }, (err, itemDocuments) => {
            if (err) {
                return res.status(400).send({ msg: err });
            } else {
                if (itemDocuments.length != 0) {
                    next();
                } else {
                    return res.status(400).send({ msg: "Invalid Item ID" });
                }
            }
        });
    },

    //middleware to check reviewID is correct
    verifyReview: (req, res, next) => {
        ReviewComments.find({ _id: req.body.reviewID }, (err, data) => {
            if (err) {
                res.status(400).send({ msg: err })
            } else {
                if (data.length != 0) {
                    next();
                } else {
                    res.status(400).send({ msg: "Invalid Review ID" });
                }
            }
        });

    },

}