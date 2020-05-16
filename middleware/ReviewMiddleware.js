const Item = require("../models/Item");
const ReviewComments = require("../models/ReviewComments");
const jwt = require("jsonwebtoken");
const ReviewHelpful = require("../models/ReviewHelpful");
module.exports = {

    authenticateUser: (req, res, next) => {
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== "undefined") {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.token = bearerToken;
            jwt.verify(req.token, "secretkey", (err, authData) => {
                if (err) {
                    return res.status(400).send({ msg: err });
                } else {
                    req.authData = authData;
                    next();
                };
            })
        } else {
            return res.status(400).send({ msg: "Login/Signup token expired" })
        }
    },



    //middleware to check item id is valid
    verifyItem: (req, res, next) => {
        var itemID = req.params.id;
        Item.find({ _id: itemID }, (err, itemDocuments) => {
            if (err) {
                return res.status(400).send({ msg: err });
            } else {
                if (itemDocuments.length == 1) {
                    req.company = itemDocuments[0].company;
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

    verifyAdmin: (req, res, next) => {
        jwt.verify(req.token, "secretkey", (err, authData) => {
            if (err) {
                return res.status(400).send({ msg: err });
            } else {
                if (authData.isAdmin || authData.isSalesManager || authData.isSalesServicer) {
                    req.authData = authData;
                    next();
                } else {
                    return res.status(403).send({ msg: "No Authorization" })
                }
            };
        })
    }
}