const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const ReviewComments = require("../../models/ReviewComments");
const ReviewHelpful = require("../../models/ReviewHelpful");
const ReviewRating = require("../../models/Reviews");
const Item = require("../../models/Item");

const authenticateUser = require("../../middleware/ReviewMiddleware").authenticateUser;

const verifyItem = require("../../middleware/ReviewMiddleware").verifyItem;
const verifyReview = require("../../middleware/ReviewMiddleware").verifyReview;
const verifyUserSecureCode = require("../../middleware/ReviewMiddleware").verifyUserSecureCode;

const nodemailer = require('nodemailer');

//new review
//user can have multiple reviews
router.post("/newReviewComment/:id", authenticateUser, verifyUserSecureCode, verifyItem, (req, res) => {
    var itemID = req.params.id;
    if (req.body.reviewMessage) {
        reviewMessageFromBody = req.body.reviewMessage;
        console.log(req.authData);

        var ReviewDetails = {
            reviewedUser: req.authData.user._id,
            item: itemID,
            reviewMessage: reviewMessageFromBody,
            reviewUserFirstName: req.authData.user.firstName,
            reviewUserLastName: req.authData.user.lastName,
            reviewerEmail: req.authData.user.email,
            itemCompany: req.company,
            userImageUrl: req.authData.user.userImageUrl
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


const updateLike = require('../../middleware/ReviewMiddleware').updateLikeCount;
const updateDisLike = require('../../middleware/ReviewMiddleware').updateDislikeCount;
router.post('/updateHelpfuls/:id', async (req, res) => {
    await updateLike(req);
    await updateDisLike(req);
    return res.status(200).send({ msg: "updated" })
});


//liking and unliking a comment by other user. only one time for a comment per a user.
//need to add a method to delete useless data from the DB
//reviewhelpful and reviewnothelful both false data are useless and therefor no need to keep them inside
//the DB
router.patch("/newHelpfulReview/:id", authenticateUser, verifyUserSecureCode, verifyItem, verifyReview, async (req, res) => {
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
        async (err, review) => {
            if (err) {
                res.send({ msg: err });
            }
            // let update = false;
            if (review) {
                await ReviewHelpful.findByIdAndUpdate({ _id: review._id }, { reviewWasHelpful: reviewWasHelpful, reviewWasNotHelpful: reviewWasNotHelpful },
                    { new: true }, (err, data) => {
                        if (err) {
                            return res.status(400).send({ msg: err });
                        } else {
                            // update = true;
                            return res.status(200).send({ msg: "Helpful updated", data })
                        }
                    });
            } else {
                reviewHelpfulData = {
                    reviewViewesUser: req.authData.user._id,
                    reviewID: req.body.reviewID,
                    reviewWasHelpful: reviewWasHelpful,
                    reviewWasNotHelpful: reviewWasNotHelpful,
                    item: itemId
                }
                await ReviewHelpful.create(reviewHelpfulData, (err) => {
                    if (err) {
                        return res.status(400).send({ msg: err });
                    } else {
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
    await updateLike(req);
    await updateDisLike(req);
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


router.get("/getRating/:id", verifyItem, (req, res) => {
    const itemId = req.params.id;
    ReviewRating.find({ item: itemId }, (err, data) => {
        if (err) {
            return res.status(400).send({ msg: err });
        } else {
            if (data) {
                let totalStarRating = 0;
                data.forEach(element => {
                    totalStarRating += element.starRating;
                });
                if (totalStarRating == 0) {
                    AverageStarRating = 0;
                } else {
                    AverageStarRating = totalStarRating / data.length;
                }
                return res.status(200).send({ AverageStarRating });

            } else {
                return res.status(200).send({ AverageStarRating: 0 })
            }
        }
    });
});

router.get("/MyRating/:id", authenticateUser, verifyItem, (req, res) => {
    const itemId = req.params.id;
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            return res.status(400).send({ msg: err });
        } else {
            ReviewRating.find({ item: itemId, reviewedUser: authData._id }, (err, data) => {
                if (err) {
                    return res.status(400).send({ msg: err });
                } else {
                    if (data[0]) {
                        return res.status(200).send({ MyRating: data[0].starRating });
                    } else {
                        return res.status(200).send({ MyRating: 0 });
                    }
                }
            });
        }
    });

});


//publicaly accessible 
//can see all the ratings 

// router.get("/:id", verifyItem, helpfulCount, helpfulNotCount, (req, res) => {
router.get("/:id", verifyItem, async (req, res) => {
    //     await updateLike(req);
    //     await updateDisLike(req);
    const userHeader = req.headers["authorization"];
    var itemId = req.params.id;
    if (typeof userHeader == "undefined") {
        var response = {};
        ReviewComments.find({ item: itemId }, (err, commentData) => {
            if (err) {
                res.status(400).send({ msg: err });
            } else {
                if (commentData) {
                    response.CommentDocuments = commentData;
                    return res.status(200).send(response)
                } else {
                    return res.status(200).send({ msg: "No Reviews to Display" });
                }
            }
            // }).sort({ reviewHelpfulCount: -1 });
        });
    } else {
        req.token = (userHeader.split(" "))[1];
        jwt.verify(req.token, "secretkey", (err, authData) => {
            if (err) {
                res.status(400).send({ msg: err });
            } else {
                console.log(authData)
                var response = {};

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

                            ReviewHelpful.find({ reviewViewesUser: authData.user._id, item: itemId }, (err, data) => {
                                if (err) {
                                    return res.status(400).send({ msg: err });
                                } else {
                                    if (data) {
                                        const MyLiked = [];
                                        let dataForLike;
                                        data.forEach(element => {
                                            dataForLike = {
                                                reviewId: element.reviewID,
                                                liked: element.reviewWasHelpful,
                                                disliked: element.reviewWasNotHelpful
                                            }
                                            MyLiked.push(dataForLike);
                                        });
                                        if (MyLiked.length > 0) {
                                            response.myLiked = MyLiked;
                                        }
                                    }
                                    return res.send(response);
                                }
                            });
                        } else {
                            return res.status(200).send({ msg: "No Reviews to Display" });
                        }
                    }
                    // }).sort({ reviewHelpfulCount: -1 });
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
                if (!req.body.adminAccess) {
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
                } else {
                    next()
                }
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
                ReviewComments.deleteOne({ _id: req.body.reviewID, item: itemId },
                    function (err) {
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

const verifyAdmin = require('../../middleware/ReviewMiddleware').verifyAdmin;
const Items = require('../../models/Item');

router.get('/admin/itemsReviews/', authenticateUser, verifyAdmin, (req, res) => {
    ReviewComments.find({ itemCompany: req.authData.company }, { item: 1, _id: 0, didAdminReplied: 1 }, async (err, data) => {
        if (err) {
            return res.status(400).send({ msg: err });
        } else {
            if (data) {

                data.sort((a, b) => {
                    var x = a.item.toString().toLowerCase();
                    var y = b.item.toString().toLowerCase();
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                });

                let unique = [], count = [], before, items = [];
                for (let index = 0; index < data.length; index++) {
                    if (data[index].item.toString() !== before) {
                        if (data[index].didAdminReplied) {
                            unique.push({ item: data[index].item.toString(), replyCount: 1 });
                        } else {
                            unique.push({ item: data[index].item.toString(), replyCount: 0 });
                        }
                        count.push(1);
                        // await Items.findById(data[index].item.toString(), (err, data) => {
                        //     if (err) {
                        //         return res.status(500).send({ msg: err });
                        //     } else {
                        //         items.push(data.itemName);
                        //     }
                        // })
                        await Items.findById(data[index].item.toString()).then(dat => {
                            items.push(dat.itemName);
                        }).catch(err => {
                            return res.status(500).send({ msg: err });
                        })
                    } else {
                        count[count.length - 1]++;
                        if (data[index].didAdminReplied) {
                            unique[unique.length - 1].replyCount++;
                        }
                    }
                    before = data[index].item.toString();
                }
                response = [];
                console.log(unique);

                unique.forEach((element, index) => {
                    response.push({ item: element.item, itemName: items[index], count: count[index], replyCount: element.replyCount })
                });
                res.status(200).send({ data: response });

            } else {
                return res.status(200).send({ data: [] })
            }
        }
    })
});

const email = require('../../config/mailCredentials').email;
const password = require('../../config/mailCredentials').password;
router.post('/admin/sendMail/', authenticateUser, verifyAdmin, async (req, res) => {
    const msg = req.body.msg;
    const to = req.body.to;
    const subject = req.body.subject;
    const cc = req.body.cc;
    const bcc = req.body.bcc;
    const reviewId = req.body.reviewId;
    if (msg && subject && (to || cc || bcc)) {
        console.log(to, cc, bcc, subject, msg);
        const transporter = await nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: email,
                pass: password
            }
        });
        //Sending the Email
        await transporter.sendMail({
            to: to,
            cc: cc,
            bcc: bcc,
            subject: subject,
            html: msg

        }).then(async done => {
            if (reviewId) {
                let reviewUpdate = {
                    adminsReplyTime: new Date(),
                    adminsReply: msg,
                    didAdminReplied: true
                }
                await ReviewComments.findByIdAndUpdate(reviewId, reviewUpdate, (err, previous) => {
                    if (err) {
                        return res.status(400).send({ msg: err });
                    }
                });
            }
            return res.status(200).send({ msg: "Email Sent", data: done });
        }).catch(err => {
            res.status(400).send({ msg: err });
        });


    } else {
        res.status(400).send({ msg: "Mandory fields are missing. To/CC/BCC or Subject or message" })
    }

});



router.post('/admin/changeUserData', (req, res) => {
    ReviewComments.find((err, allReviews) => {
        if (err) {
            res.status(400).send({ msg: err });
        } else {
            if (allReviews) {
                allReviews.map(async (element, index, self) => {
                    await User.findById(element.reviewedUser, (err, user) => {
                        if (err) {
                            console.log(err);
                        } else {
                            if (user) {
                                if (user.firstName != element.reviewUserFirstName || user.lastName != element.reviewUserLastName || user.userImageUrl != element.userImageUrl) {
                                    let update = {
                                        reviewUserFirstName: user.firstName,
                                        reviewUserLastName: user.lastName,
                                        userImageUrl: user.userImageUrl
                                    }
                                    ReviewComments.findByIdAndUpdate(element._id, update, (err, data) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                    })
                                }
                            }
                        }
                    });
                });
                res.status(200).send({ msg: "Updated" });
            } else {
                res.status(200).send({ msg: "No Reviews to Update" });
            }
        }
    });
});


router.patch('/admin/markAsRead/:id', authenticateUser, verifyAdmin, (req, res) => {
    ReviewComments.findByIdAndUpdate(req.params.id, {
        adminsReplyTime: new Date(),
        adminsReply: "Marked as Reviewed",
        didAdminReplied: true
    }, (err, prev) => {
        if(err){
            return res.status(400).send({msg:err});
        }else{
            return res.status(200).send({msg:"Marked as Reviewd"})
        }
    })
});

module.exports = router;