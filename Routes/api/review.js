const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const ReviewComments = require("../../models/ReviewComments");
const ReviewHelpful = require("../../models/ReviewHelpful");
const ReviewRating = require("../../models/Reviews");
const Item = require("../../models/Item");

const authenticateUser = require("../../middleware/Usesr").authenticateUser;

//middleware to check item id is valid
function verifyItem(req, res, next) {
    var itemID = req.params.id;
    Item.find({ _id: itemID }, function (err, itemDocuments) {
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
}

//new review
//user can have multiple reviews
router.post("/newReviewComment/:id", authenticateUser, verifyItem, function (req, res) {
    var itemID = req.params.id;

    jwt.verify(req.token, "secretkey", function (err, authData) {
        if (err) {
            return res.status(400).send({ msg: err });
        } else {
            if (authData.user.secureKeyVerifyStatus == true) {
                if (req.body.reviewMessage) {
                    reviewMessageFromBody = req.body.reviewMessage;


                    var ReviewDetails = {
                        reviewedUser: authData.user._id,
                        item: reviewID,
                        reviewMessage: reviewMessageFromBody,
                        reviewUserFirstNamr: authData.user.firstName,
                        reviewUserLastName: authData.user.lastName

                    };

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
//each user get only 1 chance to rate a item
// the second time the previous rating gets updated
router.post("/newRating/:id", authenticateUser, verifyItem, function (req, res) {
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
//liking and unliking a comment by other user. only one time for a comment per a user.
//need to add a method to delete useless data from the DB
//reviewhelpful and reviewnothelful both false data are useless and therefor no need to keep them inside
//the DB
router.post("/newHelpfulReview/:id", authenticateUser, verifyItem, verifyReview, function (req, res) {
    var itemId = req.params.id;
    var reviewWasHelpful = false;
    var reviewWasNotHelpful = false;
    jwt.verify(req.token, "secretkey", function (err, authData) {
        if (err) {
            return res.status(400).send({ msg: err });
        } else {
            if (authData.user.secureKeyVerifyStatus == true) {
                if (req.body.reviewWasHelpful == "true") {
                    reviewWasHelpful = true;
                } else if (req.body.reviewWasHelpful == "false") {
                    reviewWasHelpful = false;
                } else if (req.body.reviewWasNotHelpful == "true") {
                    reviewWasNotHelpful = true;
                } else if (req.body.reviewWasNotHelpful == "false") {
                    reviewWasNotHelpful = false;
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
//middleware to update like count of reviews
function helpfulCount(req, res, next) {
    verifyItem(req, res, function () {
        var itemId = req.params.id;
        ReviewComments.find({ item: itemId }, function (err, data) {
            if (err) {
                return res.status(400).send({ msg: err });
            } else {
                data.forEach(element => {
                    ReviewHelpful.find({ reviewID: element._id, reviewWasHelpful: true }, function (err, helpfulData) {
                        if (err) {
                            return res.status(400).send({ msg: err });
                        } else {
                            ReviewComments.update({ _id: element._id }, { reviewHelpfulCount: helpfulData.length }, function (err) {
                                if (err) {
                                    return res.status(400).send({ msg: err });
                                }
                            })
                        }
                    });
                });
                next();

            }
        });
    });
}

function helpfulNotCount(req, res, next) {
    verifyItem(req, res, function () {
        var itemId = req.params.id;
        ReviewComments.find({ item: itemId }, function (err, data) {
            if (err) {
                return res.status(400).send({ msg: err });
            } else {
                data.forEach(element => {
                    ReviewHelpful.find({ reviewID: element._id, reviewWasNotHelpful: true }, function (err, helpfulNotData) {
                        if (err) {
                            return res.status(400).send({ msg: err });
                        } else {
                            ReviewComments.update({ _id: element._id }, { reviewNotHelpfulCount: helpfulNotData.length }, function (err) {
                                if (err) {
                                    return res.status(400).send({ msg: err });
                                }
                            })
                        }
                    });
                });

                next();
            }
        });
    });
}

//publicaly accessible 
//can see all the ratings 


router.get("/:id", verifyItem, helpfulCount, helpfulNotCount, function (req, res) {
    var itemId = req.params.id;
    var response;
    ReviewRating.find({ item: itemId }, function (err, data) {
        if (err) {
            return res.status(400).send({ msg: err });
        } else {
            if (data) {
                totalStarRating = 0;
                data.forEach(element => {
                    totalStarRating += element.starRating;
                });
                AverageStarRating = totalStarRating / data.length;
                response = { "AverageStarRating": AverageStarRating }

                ReviewComments.find({ item: itemId }, function (err, commentData) {
                    if (err) {
                        res.status(400).send({ msg: err });
                    } else {
                        if (commentData) {
                            response.CommentDocuments = commentData;

                            return res.send(response);

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

router.get("/:id",)
//middleware to verify the review is posted by the same person
function verifyUserIsTheReviewPoster(req, res, next) {
    authenticateUser(req, res, function () {
        jwt.verify(req.token, "secretkey", function (err, authData) {
            if (err) {
                return res.status(400).send({ msg: err });
            } else {
                ReviewComments.findOne({ _id: req.body.reviewID }, function (err, data) {
                    if (err) {
                        return res.status(400).send({ msg: err });
                    } else {
                        if (authData.user._id == data.reviewedUser) {
                            next();
                        } else {
                            return res.status(400).send({ msg: "This client didn't posted the review" });
                        }
                    }
                });
            }
        });
    })
}

router.post("/updateReviceComment/:id", authenticateUser, verifyItem, verifyReview, verifyUserIsTheReviewPoster, function (req, res) {
    var itemId = req.params.id;
    jwt.verify(req.token, "secretkey", function (err, authData) {
        if (err) {
            return res.status(400).send({ msg: err })
        } else {
            if (authData.user.secureKeyVerifyStatus == true) {
                if (req.body.reviewMessage) {
                    ReviewComments.update({ _id: req.body.reviewID, reviewedUser: authData.user._id, item: itemId },
                        { reviewMessage: req.body.reviewMessage }, function (err) {
                            if (err) {
                                return res.status(400).send({ msg: err })
                            } else {
                                return res.status(200).send({ msg: "Updated Successfully" })
                            }
                        })
                } else {
                    return res.status(400).send({ msg: "Review Message is not defined" })
                }
            } else {
                return res.status(401).send({ msg: "Verify Secure code first" });
            }
        }
    })
});

router.delete("/deleteReviewComment/:id", authenticateUser, verifyItem, verifyReview, verifyUserIsTheReviewPoster, function (req, res) {
    var itemId = req.params.id;
    jwt.verify(req.token, "secretkey", function (err, authData) {
        if (err) {
            return res.status(400).send({ msg: err })
        } else {
            if (authData.user.secureKeyVerifyStatus == true) {
                ReviewComments.deleteOne({ _id: req.body.reviewID, item: itemId, reviewedUser: authData.user._id },
                    function (err) {
                        if (err) {
                            return res.status(400).send({ msg: err });
                        } else {
                            ReviewHelpful.deleteMany({ reviewID: req.body.reviewID }, function (err) {
                                if (err) {
                                    return res.status(400).send({ msg: err });
                                } else {

                                    return res.status(200).send({ msg: "Deleted" });


                                }
                            });
                        }
                    });


            } else {
                return res.status(401).send({ msg: "Verify Secure code first" });
            }
        }
    });
});



module.exports = router;
