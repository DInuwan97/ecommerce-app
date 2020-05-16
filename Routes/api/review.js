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

const nodemailer = require('nodemailer');

//new review
//user can have multiple reviews
router.post("/newReviewComment/:id", authenticateUser, verifyItem, (req, res) => {
    var itemID = req.params.id;
    if (req.body.reviewMessage) {
        reviewMessageFromBody = req.body.reviewMessage;
        console.log(req.authData);

        var ReviewDetails = {
            reviewedUser: req.authData._id,
            item: itemID,
            reviewMessage: reviewMessageFromBody,
            reviewUserFirstName: req.authData.firstName,
            reviewUserLastName: req.authData.lastName,
            reviewerEmail: req.authData.email,
            itemCompany: req.company,
            userImageUrl: req.authData.userImageUrl
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
router.patch("/newRating/:id", authenticateUser, verifyItem, (req, res) => {
    var itemID = req.params.id;
    if (0 <= req.body.starRating && req.body.starRating <= 5) {
        ReviewRating.findOne({
            reviewedUser: req.authData._id,
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
                    var ReviewRatingDetails = {
                        reviewedUser: req.authData._id,
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
router.put("/newHelpfulReview/:id", authenticateUser, verifyItem, verifyReview, async (req, res) => {
    var itemId = req.params.id;
    var reviewId = req.body.reviewID;
    var reviewLikeStatus = req.body.reviewLikeStatus;

    if (!(reviewLikeStatus >= -1 && reviewLikeStatus <= 1)) {
        return res.status(400).send({ msg: "Invalid Review Like Status" });
    }
    let updateData;
    if (reviewLikeStatus == -1) {
        updateData = {
            reviewLikeStatus: -1,
            reviewID: reviewId,
            reviewViewesUser: req.authData._id,
            item: itemId
        }
    } else if (reviewLikeStatus == 1) {
        updateData = {
            reviewLikeStatus: 1,
            reviewID: reviewId,
            reviewViewesUser: req.authData._id,
            item: itemId
        }
    } else {
        updateData = {
            reviewLikeStatus: 0,
            reviewID: reviewId,
            reviewViewesUser: req.authData._id,
            item: itemId
        }
    }
    ReviewHelpful.findOneAndUpdate({ item: itemId, reviewViewesUser: req.authData._id, reviewID: reviewId }, updateData, { upsert: true }, async (err, prev) => {
        if (err) {
            return res.status(400).send({ msg: err });
        } else {
            if (prev) {
                if (prev.reviewLikeStatus == 0) {
                    if (reviewLikeStatus == 1) {
                        await ReviewComments.findByIdAndUpdate(reviewId, { $inc: { reviewHelpfulCount: 1 } }).catch(err => {
                            return res.status(400).send({ msg: err });
                        });
                    } else if (reviewLikeStatus == -1) {
                        await ReviewComments.findByIdAndUpdate(reviewId, { $inc: { reviewNotHelpfulCount: 1 } }).catch(err => {
                            return res.status(400).send({ msg: err });
                        });
                    }
                } else if (prev.reviewLikeStatus == -1) {
                    if (reviewLikeStatus == 1) {
                        await ReviewComments.update({ _id: reviewId, reviewNotHelpfulCount: { $gte: 1 } }, { $inc: { reviewHelpfulCount: 1, reviewNotHelpfulCount: -1 } }).catch(err => {
                            return res.status(400).send({ msg: err });
                        });
                    } else if (reviewLikeStatus == 0) {
                        await ReviewComments.update({ _id: reviewId, reviewNotHelpfulCount: { $gte: 1 } }, { $inc: { reviewNotHelpfulCount: -1 } }).catch(err => {
                            return res.status(400).send({ msg: err });
                        });
                    }
                } else if (prev.reviewLikeStatus == 1) {
                    if (reviewLikeStatus == -1) {
                        await ReviewComments.update({ _id: reviewId, reviewHelpfulCount: { $gte: 1 } }, { $inc: { reviewNotHelpfulCount: 1, reviewHelpfulCount: -1 } }).catch(err => {
                            return res.status(400).send({ msg: err });
                        });
                    } else if (reviewLikeStatus == 0) {
                        await ReviewComments.update({ _id: reviewId, reviewHelpfulCount: { $gte: 1 } }, { $inc: { reviewHelpfulCount: -1 } }).catch(err => {
                            return res.status(400).send({ msg: err });
                        });
                    }
                }
            } else {
                if (reviewLikeStatus == 1) {
                    await ReviewComments.findByIdAndUpdate(reviewId, { $inc: { reviewHelpfulCount: 1 } }).catch(err => {
                        return res.status(400).send({ msg: err });
                    });
                } else if (reviewLikeStatus == -1) {
                    await ReviewComments.findByIdAndUpdate(reviewId, { $inc: { reviewNotHelpfulCount: 1 } }).catch(err => {
                        return res.status(400).send({ msg: err });
                    });
                }
            }
            return res.status(200).send({ msg: "Successfull" });

        }
    })

});


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
        }).sort({ AddedTime: -1 });
        // });
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
                                if (element.reviewedUser == authData._id) {
                                    myCommentID.push(element._id);
                                }
                            });
                            if (myCommentID.length > 0) {
                                response.myCommentID = myCommentID;
                            }
                            response.CommentDocuments = commentData;
                            if (authData.isAdmin) {
                                response.userType = "Admin";
                            } else if (authData.isCustomer) {
                                response.userType = "Customer";
                            } else if (authData.isSalesManager) {
                                response.userType = "SalesManager";
                            } else if (authData.isSalesServicer) {
                                response.userType = "SalesServicer";
                            } else {
                                response.userType = "Customer"
                            }

                            ReviewHelpful.find({ reviewViewesUser: authData._id, item: itemId }, (err, data) => {
                                if (err) {
                                    return res.status(400).send({ msg: err });
                                } else {
                                    if (data) {

                                        const MyLiked = [];
                                        let dataForLike;
                                        data.forEach(element => {
                                            dataForLike = {
                                                reviewId: element.reviewID,
                                                status: element.reviewLikeStatus,
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
                }).sort({ AddedTime: -1 });
                // });
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

router.patch("/updateReviceComment/:id", authenticateUser, verifyItem, verifyReview, verifyUserIsTheReviewPoster, (req, res) => {
    var itemId = req.params.id;
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            return res.status(400).send({ msg: err })
        } else {

            if (req.body.reviewMessage) {
                ReviewComments.update({ _id: req.body.reviewID, reviewedUser: authData._id, item: itemId }, { reviewMessage: req.body.reviewMessage }, (err) => {
                    if (err) {
                        return res.status(400).send({ msg: err })
                    } else {
                        return res.status(200).send({ msg: "Updated Successfully" })
                    }
                })
            } else {
                return res.status(400).send({ msg: "Review Message is not defined" })
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
                    didAdminReplied: true,
                    repliedAdmin: req.authData._id
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
        didAdminReplied: true,
        repliedAdmin:req.authData._id
    }, (err, prev) => {
        if (err) {
            return res.status(400).send({ msg: err });
        } else {
            return res.status(200).send({ msg: "Marked as Reviewed" })
        }
    })
});



router.get('/admin/getAdminReplyItems/', authenticateUser, verifyAdmin, (req, res) => {
    const company = req.authData.company;
    ReviewComments.find({ didAdminReplied: true, itemCompany: company }, (err, data) => {
        if (err) {
            res.status(400).send({ msg: err });
        } else {
            if (data) {
                const itemIds = [];
                data.sort((a, b) => {
                    var x = a.item.toString();
                    var y = b.item.toString();
                    if (x < y) { return -1 }
                    else if (x > y) { return 1 }
                    else { return 0 }
                })
                let uniqueItems = [], itemCount = [], prev;
                data.forEach(element => {
                    if (element.item.toString() != prev) {
                        uniqueItems.push(element.item);
                        itemCount.push(1);
                    } else {
                        itemCount[uniqueItems.length - 1]++;
                    }
                    prev = element.item.toString();
                });
                let responses = [];

                uniqueItems.forEach(async (element, index) => {
                    await Items.findById(element, { _id: 0, itemName: 1 }).then(itemName => {
                        responses.push({
                            item: element,
                            itemName: itemName.itemName,
                            count: itemCount[index]
                        });
                        if (uniqueItems.length - 1 == index) {
                            res.status(200).send({ data: responses })
                        }
                    }).catch(err=>{
                        res.status(400).send({ msg: err })
                    })

                });

            } else {
                res.status(200).send({ data: [] })
            }
        }
    })
});


router.get('/admin/getAdminReplies/:id',authenticateUser,verifyAdmin,(req,res)=>{
    const itemId = req.params.id;
    ReviewComments.find({item:itemId,didAdminReplied:true},(err,data)=>{
        if(err){
            return res.status(400).send({msg:err});
        }else{
            if(data){
                return res.status(200).send(data)
            }else{
                return res.status(200).send({data:[]})
            }
        }
    })
})



router.get('/admin/viewUser/:id',authenticateUser,verifyAdmin,(req,res)=>{
    let id = req.params.id;
    User.findById(id,(err,data)=>{
        if(err){
            return res.status(400).send({msg:err});
        }else{
            if(data){
                jwt.sign({data}, 'secretkey',{expiresIn:'3m'},(err,token)=>{
                    if(err){
                        return res.status(400).send({msg:err});
                    }else{
                        return res.status(200).send({data:token})
                    }
                })
            }else{
                return res.send(200).send({data:""})
            }
        }
    })
})

module.exports = router;