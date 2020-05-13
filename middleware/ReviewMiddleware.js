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

    updateLikeCount: (req) => {
        var itemId = req.params.id;
        ReviewComments.find({ item: itemId }, (err, data) => {
            if (err) {
                return;
            } else {
                data.forEach(element => {
                    ReviewHelpful.find({ reviewID: element._id, reviewWasHelpful: true }, (err, helpfulData) => {
                        if (err) {
                            return;
                        } else {
                            ReviewComments.update({ _id: element._id }, { reviewHelpfulCount: helpfulData.length }, (err) => {
                                if (err) {
                                    return;
                                }
                            });
                        }
                    });
                });
            }
        });
    },

    updateDislikeCount: (req) => {
        var itemId = req.params.id;
        ReviewComments.find({ item: itemId }, (err, data) => {
            if (err) {
                return;
            } else {
                data.forEach(element => {
                    ReviewHelpful.find({ reviewID: element._id, reviewWasNotHelpful: true }, (err, helpfulNotData) => {
                        if (err) {
                            return;
                        } else {
                            ReviewComments.update({ _id: element._id }, { reviewNotHelpfulCount: helpfulNotData.length }, (err) => {
                                if (err) {
                                    return;
                                }
                            });
                        }
                    });
                });
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
    },
}