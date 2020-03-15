const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const ReviewComments = require("../../models/ReviewComments");
const ReviewHelpful = require("../../models/ReviewHelpful");
const ReviewRating = require("../../models/Reviews");
const Item = require("../../models/Item");

const authenticateUser = require("../../middleware/Usesr").authenticateUser;

//new review
router.post("/newReviewComment/:id", authenticateUser, function (req, res) {
    var itemID = req.params.id;

    jwt.verify(req.token, "secretkey", function (err, authData) {
        if (err) {
            return res.status(400).send({ msg: err });
        } else {
            if (authData.user.secureKeyVerifyStatus == true) {
                if (req.body.reviewMessage) {
                    reviewMessageFromBody = req.body.reviewMessage;
                    if (req.body.hasAParentReview) {
                        var ReviewDetails = {
                            reviewedUser: authData.user._id,
                            item: itemID,
                            hasAParentReview: req.body.hasAParentReview,
                            reviewMessage: reviewMessageFromBody,
                            parentReview: req.body.parentReview
                        };
                    } else {
                        var ReviewDetails = {
                            reviewedUser: authData.user._id,
                            item: reviewID,
                            reviewMessage: reviewMessageFromBody,
                            hasAParentReview: false,

                        };
                    }

                    console.log(ReviewDetails);
                    ReviewComments.create(ReviewDetails, function (err) {
                        if (err) {
                            return res.status(400).send({ msg: err });
                        } else {
                            return res.status(201).send({ msg: "Successfull" })
                        }
                    });
                } else {
                    return res.status(400).send({ msg: "Review Message Empty." });
                }

            } else {
                return res.status(401).send({ msg: "Verify Secure Key First." })
            }
        };


    })
});

//new Rating
router.post("/newRating/:id", authenticateUser, function (req, res) {
    var itemID = req.params.id;
    if (0 <= req.body.starRating&& req.body.starRating<= 5) {
        jwt.verify(req.token, "secretkey", function (err, authData) {
            if (err) {
                return res.status(400).send({ msg: err });
            } else {
                if (authData.user.secureKeyVerifyStatus == true) {
                    ReviewRating.findOne({
                        reviewedUser: authData.user._id,
                        item: itemID
                    }, function (err, ReviewData) {
                        if (err) {
                            return res.send({ msg: err });
                        } else {
                            if (ReviewData) {
                                ReviewRating.findByIdAndUpdate(ReviewData._id,
                                    { starRating: req.body.starRating },
                                    function (err) {
                                        if (err) {
                                            return res.status(400).send({ msg: err });
                                        } else {
                                            return res.status(202).send({ msg: "Updated" });
                                        }
                                    });



                            } else {
                                if (req.body.starRating) {
                                    var ReviewRatingDetails = {
                                        reviewedUser: authData.user._id,
                                        item: itemID,
                                        starRating: req.body.starRating
                                    }
                                    console.log(ReviewRatingDetails);
                                    ReviewRating.create(ReviewRatingDetails, function (err) {
                                        if (err) {
                                            return res.status(400).send({ msg: err });
                                        } else {
                                            return res.status(201).send({ msg: "Successfull rating" });
                                        }
                                    })
                                } else {
                                    return res.status(400).send({ msg: "Star Rating is Empty" });
                                }
                            }
                        }
                    })
                } else {
                    return res.status(401).send({ msg: "Verify Secure Code First" });
                }
            }
        })
    } else {
        return res.status(400).send({ msg: "Incorrect Star Rating" })
    }

});


module.exports = router;
