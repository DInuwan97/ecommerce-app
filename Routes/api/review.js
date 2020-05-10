const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const ReviewComments = require("../../models/ReviewComments");
const ReviewHelpful = require("../../models/ReviewHelpful");
const ReviewRating = require("../../models/Reviews");
const Item = require("../../models/Item");

const authenticateUser = require("../../middleware/Usesr").authenticateUser;

const verifyItem = require("../../middleware/ReviewMiddleware").verifyItem;
const verifyReview = require("../../middleware/ReviewMiddleware").verifyReview;
const verifyUserSecureCode = require("../../middleware/ReviewMiddleware").verifyUserSecureCode;

//new review
//user can have multiple reviews
router.post("/newReviewComment/:id", authenticateUser, verifyUserSecureCode, verifyItem, (req, res) => {
    var itemID = req.params.id;
    if (req.body.reviewMessage) {
        reviewMessageFromBody = req.body.reviewMessage;

        var ReviewDetails = {
            reviewedUser: req.authData.user._id,
            item: itemID,
            reviewMessage: reviewMessageFromBody,
            reviewUserFirstName: req.authData.user.firstName,
            reviewUserLastName: req.authData.user.lastName,
            reviewerEmail: req.authData.user.email,
        };
        ReviewComments.create(ReviewDetails, (err) => {
            if (err) {
                return res.status(400).send({ msg: err });
            } else {
                return res.status(201).send({ msg: "Successfull" })
            }
        });
    } else {
        return res.status(400).send({ msg: "Review Message Empty." });
    }


});

//new Rating
//each user get only 1 chance to rate a item
// the second time the previous rating gets updated
router.patch("/newRating/:id", authenticateUser, verifyUserSecureCode, verifyItem, (req, res) => {
    var itemID = req.params.id;
    if (0 <= req.body.starRating && req.body.starRating <= 5) {
        ReviewRating.findOne({
            reviewedUser: req.authData.user._id,
            item: itemID
        }, (err, ReviewData) => {
            if (err) {
                return res.send({ msg: err });
            } else {
                if (ReviewData) {
                    ReviewRating.findByIdAndUpdate(ReviewData._id, { starRating: req.body.starRating },
                        (err) => {
                            if (err) {
                                return res.status(400).send({ msg: err });
                            } else {
                                return res.status(202).send({ msg: "Updated" });
                            }
                        });
                } else {
                    if (req.body.starRating) {
                        var ReviewRatingDetails = {
                            reviewedUser: req.authData.user._id,
                            item: itemID,
                            starRating: req.body.starRating
                        }
                        console.log(ReviewRatingDetails);
                        ReviewRating.create(ReviewRatingDetails, (err) => {
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
        return res.status(400).send({ msg: "Incorrect Star Rating" })
    }
});


//liking and unliking a comment by other user. only one time for a comment per a user.
//need to add a method to delete useless data from the DB
//reviewhelpful and reviewnothelful both false data are useless and therefor no need to keep them inside
//the DB
router.patch("/newHelpfulReview/:id", authenticateUser, verifyUserSecureCode, verifyItem, verifyReview, (req, res) => {
    var itemId = req.params.id;
    var reviewWasHelpful = false;
    var reviewWasNotHelpful = false;

    if (req.body.reviewWasHelpful == true && req.body.reviewWasNotHelpful == false) {
        reviewWasHelpful = true;
    } else if (req.body.reviewWasHelpful == false && req.body.reviewWasNotHelpful == false) {
        reviewWasHelpful = false;
    } else if (req.body.reviewWasNotHelpful == true && req.body.reviewWasHelpful == false) {
        reviewWasNotHelpful = true;
    } else if (req.body.reviewWasHelpful == true && req.body.reviewWasNotHelpful == true) {
        return res.status(400).send({ msg: "Invalid details" });
    } else {
        return res.status(400).send({ msg: "Invalid details" });
    }
    ReviewHelpful.findOne({ reviewViewesUser: req.authData.user._id, reviewID: req.body.reviewID },
        async(err, review) => {
            if (err) {
                res.send({ msg: err });
            }
            let update = false;
            if (review) {
                await ReviewHelpful.findByIdAndUpdate({ _id: review._id }, { reviewWasHelpful: reviewWasHelpful, reviewWasNotHelpful: reviewWasNotHelpful },
                    (err) => {
                        if (err) {
                            return res.status(400).send({ msg: err });
                        } else {
                            update = true;
                            console.log(update);
                            return res.status(200).send({ msg: "Helpful updated" })
                        }
                    });
            } else {
                reviewHelpfulData = {
                    reviewViewesUser: req.authData.user._id,
                    reviewID: req.body.reviewID,
                    reviewWasHelpful: reviewWasHelpful,
                    reviewWasNotHelpful: reviewWasNotHelpful
                }
                await ReviewHelpful.create(reviewHelpfulData, (err) => {
                    if (err) {
                        return res.status(400).send({ msg: err });
                    } else {
                        console.log(update);
                        return res.status(200).send({ msg: "Helpful created" })

                    }
                })
            }
            // if (update == true) {
            //     console.log(review);
            //     if (review.reviewWasHelpful == true && reviewWasHelpful == false) {
            //         ReviewComments.update({ _id: req.body.reviewID }, { $inc: { reviewHelpfulCount: -1 } }, (err, data) => {
            //             if (err) {
            //                 return res.status(400).send({ msg: err });
            //             }
            //         });
            //     } else if (review.reviewWasNotHelpful == true && reviewWasNotHelpful == false) {
            //         ReviewComments.update({ _id: req.body.reviewID }, { $inc: { reviewNotHelpfulCount: -1 } }, (err, data) => {
            //             if (err) {
            //                 return res.status(400).send({ msg: err });
            //             }
            //         });
            //     } else if (review.reviewWasHelpful == false && reviewWasHelpful == true) {
            //         ReviewComments.update({ _id: req.body.reviewID }, { $inc: { reviewHelpfulCount: +1 } }, (err, data) => {
            //             if (err) {
            //                 return res.status(400).send({ msg: err });
            //             }
            //         });
            //     } else if (reviewWasNotHelpful == false && reviewWasNotHelpful == true) {
            //         ReviewComments.update({ _id: req.body.reviewID }, { $inc: { reviewNotHelpfulCount: +1 } }, (err, data) => {
            //             if (err) {
            //                 return res.status(400).send({ msg: err });
            //             }
            //         });
            //     } else if (review.reviewWasHelpful == true && reviewWasNotHelpful == true) {
            //         ReviewComments.update({ _id: req.body.reviewID }, { $inc: { reviewHelpfulCount: -1 } }, (err, data) => {
            //             if (err) {
            //                 return res.status(400).send({ msg: err });
            //             }
            //         });
            //         ReviewComments.update({ _id: req.body.reviewID }, { $inc: { reviewNotHelpfulCount: +1 } }, (err, data) => {
            //             if (err) {
            //                 return res.status(400).send({ msg: err });
            //             }
            //         });
            //     } else if (review.reviewWasNotHelpful == true && reviewWasHelpful == true) {
            //         ReviewComments.update({ _id: req.body.reviewID }, { $inc: { reviewHelpfulCount: +1 } }, (err, data) => {
            //             if (err) {
            //                 return res.status(400).send({ msg: err });
            //             }
            //         });
            //         ReviewComments.update({ _id: req.body.reviewID }, { $inc: { reviewNotHelpfulCount: -1 } }, (err, data) => {
            //             if (err) {
            //                 return res.status(400).send({ msg: err });
            //             }
            //         });
            //     }
            // } else {
            //     if (reviewWasHelpful == true) {
            //         ReviewComments.update({ _id: req.body.reviewID }, { $inc: { reviewHelpfulCount: +1 } }, (err, data) => {
            //             if (err) {
            //                 return res.status(400).send({ msg: err });
            //             }
            //         });
            //     } else if (reviewWasNotHelpful == true) {
            //         ReviewComments.update({ _id: req.body.reviewID }, { $inc: { reviewNotHelpfulCount: +1 } }, (err, data) => {
            //             if (err) {
            //                 return res.status(400).send({ msg: err });
            //             }
            //         });
            //     }
            // }
        });


});
// //middleware to update like count of reviews
helpfulCount = (req, res, next) => {
    verifyItem(req, res, () => {
        var itemId = req.params.id;
        ReviewComments.find({ item: itemId }, (err, data) => {
            if (err) {
                return res.status(400).send({ msg: err });
            } else {
                data.forEach(element => {
                    ReviewHelpful.find({ reviewID: element._id, reviewWasHelpful: true }, (err, helpfulData) => {
                        if (err) {
                            return res.status(400).send({ msg: err });
                        } else {
                            ReviewComments.update({ _id: element._id }, { reviewHelpfulCount: helpfulData.length }, (err) => {
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

helpfulNotCount = (req, res, next) => {
    verifyItem(req, res, () => {
        var itemId = req.params.id;
        ReviewComments.find({ item: itemId }, (err, data) => {
            if (err) {
                return res.status(400).send({ msg: err });
            } else {
                data.forEach(element => {
                    ReviewHelpful.find({ reviewID: element._id, reviewWasNotHelpful: true }, (err, helpfulNotData) => {
                        if (err) {
                            return res.status(400).send({ msg: err });
                        } else {
                            ReviewComments.update({ _id: element._id }, { reviewNotHelpfulCount: helpfulNotData.length }, (err) => {
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

router.get('/updateHelpfuls/:id', helpfulNotCount, helpfulCount, (req, res) => {
    return res.status(200).send({ msg: "updated" })
});

//publicaly accessible 
//can see all the ratings 

router.get("/:id", verifyItem, helpfulCount, helpfulNotCount, (req, res) => {
    // router.get("/:id", verifyItem, (req, res) => {
    const userHeader = req.headers["authorization"];
    var itemId = req.params.id;
    if (typeof userHeader == "undefined") {
        var response;
        ReviewRating.find({ item: itemId }, (err, data) => {
            if (err) {
                return res.status(400).send({ msg: err });
            } else {
                if (data) {
                    totalStarRating = 0;
                    data.forEach(element => {
                        totalStarRating += element.starRating;
                    });
                    if (totalStarRating == 0) {
                        AverageStarRating = 0;
                    } else {
                        AverageStarRating = totalStarRating / data.length;
                    }
                    response = { "AverageStarRating": AverageStarRating }

                    ReviewComments.find({ item: itemId }, (err, commentData) => {
                        if (err) {
                            res.status(400).send({ msg: err });
                        } else {
                            if (commentData) {
                                response.CommentDocuments = commentData;

                                return res.send(response);

                            } else {
                                return res.status(200).send({ msg: "No Reviews to Display" });
                            }
                        }
                    }).sort({ reviewHelpfulCount: -1 });

                } else {
                    return res.status(200).send({ msg: "No Reviews" });
                }
            }
        });
    } else {
        req.token = (userHeader.split(" "))[1];
        jwt.verify(req.token, "secretkey", (err, authData) => {
            if (err) {
                res.status(400).send({ msg: err });
            } else {
                console.log(authData)
                var response;
                ReviewRating.find({ item: itemId }, (err, data) => {
                    if (err) {
                        return res.status(400).send({ msg: err });
                    } else {
                        if (data) {
                            response = {}
                            totalStarRating = 0;
                            data.forEach(element => {
                                totalStarRating += element.starRating;
                                if (element.reviewedUser == authData.user._id) {
                                    response.myStarRating = element.starRating;
                                }
                            });
                            if (totalStarRating == 0) {
                                AverageStarRating = 0;
                            } else {
                                AverageStarRating = totalStarRating / data.length;
                            }
                            response.AverageStarRating = AverageStarRating;

                            ReviewComments.find({ item: itemId }, (err, commentData) => {
                                if (err) {
                                    res.status(400).send({ msg: err });
                                } else {
                                    if (commentData) {
                                        var myCommentID = [];
                                        commentData.forEach(element => {
                                            if (element.reviewedUser == authData.user._id) {
                                                myCommentID.push(element._id);
                                            }

                                        });
                                        if (myCommentID.length > 0) {
                                            response.myCommentID = myCommentID;
                                        }
                                        response.CommentDocuments = commentData;
                                        if (authData.user.isAdmin) {
                                            response.userType = "Admin";
                                        } else if (authData.user.isCustomer) {
                                            response.userType = "Customer";
                                        } else if (authData.user.isSalesManager) {
                                            response.userType = "SalesManager";
                                        } else if (authData.user.isSalesServicer) {
                                            response.userType = "SalesServicer";
                                        } else {
                                            response.userType = "Customer"
                                        }


                                        return res.send(response);

                                    } else {
                                        return res.status(200).send({ msg: "No Reviews to Display" });
                                    }
                                }
                            }).sort({ reviewHelpfulCount: -1 });

                        } else {
                            return res.status(200).send({ msg: "No Reviews" });
                        }
                    }
                });
            }
        });

    }
});

//middleware to verify the review is posted by the same person
verifyUserIsTheReviewPoster = (req, res, next) => {
    authenticateUser(req, res, () => {
        jwt.verify(req.token, "secretkey", (err, authData) => {
            if (err) {
                return res.status(400).send({ msg: err });
            } else {
                ReviewComments.findOne({ _id: req.body.reviewID }, (err, data) => {
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

router.patch("/updateReviceComment/:id", authenticateUser, verifyItem, verifyReview, verifyUserIsTheReviewPoster, (req, res) => {
    var itemId = req.params.id;
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            return res.status(400).send({ msg: err })
        } else {
            if (authData.user.secureKeyVerifyStatus == true) {
                if (req.body.reviewMessage) {
                    ReviewComments.update({ _id: req.body.reviewID, reviewedUser: authData.user._id, item: itemId }, { reviewMessage: req.body.reviewMessage }, (err) => {
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

router.delete("/deleteReviewComment/:id", authenticateUser, verifyItem, verifyReview, verifyUserIsTheReviewPoster, (req, res) => {
    var itemId = req.params.id;
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            return res.status(400).send({ msg: err })
        } else {
            if (authData.user.secureKeyVerifyStatus == true) {
                ReviewComments.deleteOne({ _id: req.body.reviewID, item: itemId, reviewedUser: authData.user._id },
                    function(err) {
                        if (err) {
                            return res.status(400).send({ msg: err });
                        } else {
                            ReviewHelpful.deleteMany({ reviewID: req.body.reviewID }, (err) => {
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