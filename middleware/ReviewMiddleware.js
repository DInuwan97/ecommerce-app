const Item = require("../models/Item");
const ReviewComments = require("../models/ReviewComments");
const jwt = require("jsonwebtoken");
const ReviewHelpful = require("../models/ReviewHelpful");
module.exports = {

    // Pre-requisites : Authorization Header - 'Bearer token' 
    // This Middleware is used to Decode the User Token and add it to the request object so the 
    //    Next method can use it
    // If the user token is not provided or expired this method will end the request and return a response
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

    // Pre-requisites : Params - itemId
    // This Middleware Checks if an Item Id exist in the Database
    // If not it stops the pipeline and sends the response 
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

    // Pre-requisites :Request Body - reviewId
    // This Middleware Checks if an Review Id exist in the Database
    // If not it stops the pipeline and sends the response 
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
    // Pre-requisites : authenticateUser middleware
    // This Middleware verifys if the logged user token belongs to an admin, a Sales Maner or a 
    // Sales Servicer.
    // If not it stops the pipeline and sends the response 
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
    },
    // Pre-requisites : authenticateUser middleware
    // This Middleware verifys if the logged user token belongs to an admin
    // If not it stops the pipeline and sends the response
    verifyOnlyAdmin: (req, res, next) => {
        jwt.verify(req.token, "secretkey", (err, authData) => {
            if (err) {
                return res.status(400).send({ msg: err });
            } else {
                if (authData.isAdmin) {
                    req.authData = authData;
                    next();
                } else {
                    return res.status(403).send({ msg: "No Authorization" })
                }
            };
        })
    },
    // Pre-requisites : authenticateUser middleware
    //                  Request Body  - adminAccess - Optional
    //                                  reviewID
    // This Middleware verifys if the review posters user id matches the 
    // logged in users user id. 
    // If not it stops the pipeline and sends the response
    // This method can be by passed by providing the bypass variable in the request body
    verifyUserIsTheReviewPoster: (req, res, next) => {
        authenticateUser(req, res, () => {
            jwt.verify(req.token, "secretkey", (err, authData) => {
                if (err) {
                    return res.status(400).send({ msg: err });
                } else {
                    if (!req.body.adminAccess) {
                        ReviewComments.findOne({ _id: req.body.reviewID }, (err, data) => {
                            if (err) {
                                return res.status(400).send({ msg: err });
                            } else {
                                if (authData._id == data.reviewedUser) {
                                    console.log("posted");
                                    next();
                                } else {
                                    return res.status(400).send({ msg: "This client didn't posted the review" });
                                }
                            }
                        });
                    } else {
                        console.log("ByPassed");
                        next()
                    }
                }
            });
        })
    }
}