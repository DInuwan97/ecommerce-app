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
    if (0 <= req.body.starRating && req.body.starRating <= 5) {
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

//middleware to check reviewID is correct
function verifyReview(req, res, next) {
    ReviewComments.find({ _id: req.body.reviewID }, function (err, data) {
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

};

router.post("/newHelpfulReview/:id", authenticateUser, verifyReview, function (req, res) {
    var itemId = req.params.id;
    var reviewWasHelpful = false;
    var reviewWasNotHelpful = false;
    jwt.verify(req.token, "secretkey", function (err, authData) {
        if (err) {
            return res.status(400).send({ msg: err });
        } else {
            if (authData.user.secureKeyVerifyStatus == true) {
                if (req.body.reviewWasHelpful == "true" || req.body.reviewWasNotHelpful == "false") {
                    reviewWasHelpful = true;
                } else if (req.body.reviewWasNotHelpful == "true" || req.body.reviewWasHelpful == "false") {
                    reviewWasNotHelpful = true;
                } else {
                    return res.status(400).send({ msg: "Invalid details" });
                }
                ReviewHelpful.findOne({ reviewViewesUser: authData.user._id, reviewID: req.body.reviewID },
                    function (err, review) {
                        if (review) {
                            ReviewHelpful.findByIdAndUpdate({ _id: review._id },
                                { reviewWasHelpful: reviewWasHelpful, reviewWasNotHelpful: reviewWasNotHelpful },
                                function (err) {
                                    if (err) {
                                        return res.status(400).send({ msg: err });
                                    } else {
                                        return res.status(200).send({ msg: "Helpful updated" })
                                    }
                                });
                        } else {
                            reviewHelpfulData = {
                                reviewViewesUser: authData.user._id,
                                reviewID: req.body.reviewID,
                                reviewWasHelpful: reviewWasHelpful,
                                reviewWasNotHelpful: reviewWasNotHelpful
                            }
                            ReviewHelpful.create(reviewHelpfulData, function (err) {
                                if (err) {
                                    return res.status(400).send({ msg: err });
                                } else {
                                    return res.status(200).send({ msg: "Helpful created" })
                                }
                            })
                        }
                    });

            } else {
                return res.status(401).send({ msg: "Verify Secure Code First" })
            }
        }

    });
});

router.get("/:id", function (req, res) {
    var itemId = req.params.id;
    var response;
    ReviewRating.find({ item: itemId }, function (err, data) {
        if (err) {
            return res.status(500).send({ msg: err });
        } else {
            if (data) {
                totalStarRating = 0;
                data.forEach(element => {
                    totalStarRating += element.starRating;
                });
                AverageStarRating = totalStarRating / data.length;
                response = { "RatingDocuments": data, "AverageStarRating": AverageStarRating }

                ReviewComments.find({ item: itemId }, function (err, commentData) {
                    if (err) {
                        res.status(500).send({ msg: err });
                    } else {
                        if (commentData) {
                            response.CommentDocuments = commentData;
                            return res.send(response);
                            // commentData.forEach(function (element) {
                            //     ReviewHelpful.find({ reviewID: element._id, reviewWasHelpful: true },
                            //         function (err, helpfulDocuments) {
                            //             if (err) {
                            //                 return res.status(400).send({ msg: err });
                            //             } else {
                            //                 helpfulCount = helpfulDocuments.length;
                            //                 comment.helpfulCount = helpfulCount;
                            //                 ReviewHelpful.find({ reviewID: element._id, reviewWasNotHelpful: true },
                            //                     function (err, helpfulNotDocuments) {
                            //                         if (err) {
                            //                             return res.status(400).send({ msg: err });
                            //                         } else {
                            //                             notHelpfulCount = helpfulNotDocuments.length;

                            //                         }
            
                            //                     });
                            //             }

                            //         });
                                

                            // });

                        } else {
                            return res.status(200).send({ msg: "No Comments to Display" });
                        }
                    }
                });

            } else {
                return res.status(200).send({ msg: "No Rating" });
            }
        }
    });



});


module.exports = router;
