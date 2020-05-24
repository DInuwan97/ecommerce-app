const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

//-------------------------------Mongoose Schema Imports--------------------------------------
const User = require("../../models/User");
const ReviewComments = require("../../models/ReviewComments");
const ReviewHelpful = require("../../models/ReviewHelpful");
const ReviewRating = require("../../models/Reviews");
const Items = require('../../models/Item');

//-------------------------------Middleware Imports---------------------------------------------
const verifyAdmin = require('../../middleware/ReviewMiddleware').verifyAdmin;
const authenticateUser = require("../../middleware/ReviewMiddleware").authenticateUser;
const verifyItem = require("../../middleware/ReviewMiddleware").verifyItem;
const verifyReview = require("../../middleware/ReviewMiddleware").verifyReview;
const verifyUserIsTheReviewPoster = require('../../middleware/ReviewMiddleware').verifyUserIsTheReviewPoster;

//-------------------------------NodeMailer Credentials Imports--------------------------------------
const email = require('../../config/mailCredentials').email;
const password = require('../../config/mailCredentials').password;

//-------------------------------User Actions--------------------------------------------------------

// Method         : POST
// Header         : Authorization - 'bearer token'
// Params         : itemId
// Body           : reviewMessage
// Validation     : User Validation, Item Validation
// Return         : msg
// Description    : Add a  new Review to an item
//                : User can have multiple reviews
router.post("/newReviewComment/:id", authenticateUser, verifyItem, (req, res) => {
    var itemID = req.params.id;
    if (req.body.reviewMessage) {
        reviewMessageFromBody = req.body.reviewMessage;

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


// Method          : Patch
// Headers         : Authorization - 'bearer token'
// Params          : itemId
// Body            : starRating( 0<= startRating <= 5)
// Validation      : User Validation, Item Validation, Star Rating inside the limit validation
// Return          : msg
// Description     : Rating an item based on a 0-5 scale
//                 : One user can only give the rating one time
//                 : Next time the previous rating get updated
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





// Method       : Put
// Headers      : Authorization - 'bearer token'
// Params       : itemId
// Body         : reviewId, reviewLikeStatus (reviewLikeStatus === 1,0,-1)
// Validation   : User Validation, Item Validation, Review Validation, Like Status Validation
// Return       : msg
// Description  : Like/Unlike a review message posted by a user.
//              : First time the data gets added to the database
//              : Next time the previous data get reset
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

// Method       : Get
// Headers      : None
// Params       : itemId
// Body         : None
// Validation   : Item Validation
// Return       : msg - if Error , AverageStarRating - if Success
// Description  : Getting the Star rating of an item
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



// Method       : Get
// Headers      : Authorization - 'Bearer token'
// Params       : itemId
// Body         : None
// Validation   : Item Validation
// Return       : msg - if error, MyRating - if success
// Description  : Getting an user's rating for an item
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



// Method       : Get
// Headers      : 'Authorization 'Bearer token' -Not Required
// Params       : itemId
// Body         : None
// Validation   : Item Validation
// Return       : msg - if error, response - if success
// Description  : Getting the reviews for an item
//              : If the Authorization token is retunred the user's reviews and like/unlikes
//                   are provided along with the response
router.get("/:id", verifyItem, async (req, res) => {
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

// Method       : Patch
// Headers      : Authorization - 'Bearer token'
// Params       : ItemId
// Body         : reviewMessage, reviewID
// Validations  : User Validation, Item Validation,  Review Validation, Review Posted User Validation
// Return       : msg 
// Description  : Update a Review
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

// Method       : Delete
// Headers      : Authorization - 'Bearer token'
// Params       : ItemId
// Body         : reviewID , (AdminAccess - Optional)
// Validations  : User Validation, Item Validation, Item Validation, Review Validation, Review Posted User Validation
// Return       : msg 
// Description  : Delete a Review
// Optional     : This method can be bypassed by an admin, The Review Posted User Validation Can be
//                   ByPassed by send the AdminAccess valus as true in the request body
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

//-------------------------------Administrator Actions--------------------------------------

// Method       : Get
// Headers      : Authorization - 'Bearer token'
// Params       : None
// Body         : None
// Validations  : User Validation, Admin Validation ( Currently Admin, Sales Manger, Sales Servicer Accounts)
// Return       : msg -if Error , Data - if Success
// Description  : Getting the Reviews For all items in the current users company
//              : The Company name is decoded by the authorization token
//              : This method is used to take the count of Admin replied reviews and the all the review count for all items
// Additional   : This Method Operates Like this
//              : First the method takes all the item reviews for the company
//              : Then it takes all the unique item ids and take a count of unique ids and duplicates
//              : Simply it takes the count of reviews for an item.
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

// Method       : Post
// Headers      : Authorization - 'Bearer token'
// Params       : None
// Body         : to, cc, bcc, subject, msg, reviewId - Optional 
// Validation   : User Validation
// Return       : msg , +data - if success
// Description  : This Method sends an Email if the user haves the permission 
//                  and the valid details are provided
// Optional     : If the ReviedId is provided the method updates the review tables relavent id as Admin Replied
//                  and sets the replied message, and time
router.post('/admin/sendMail/', authenticateUser, verifyAdmin, async (req, res) => {
    const msg = req.body.msg;
    const to = req.body.to;
    const subject = req.body.subject;
    const cc = req.body.cc;
    const bcc = req.body.bcc;
    const reviewId = req.body.reviewId;
    
    if (msg && subject && (to || cc || bcc)) {
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


// Method       : Post
// Headers      : None
// Params       : None
// Body         : None 
// Validation   : None
// Return       : msg
// Description  : This methods Refresh all the User names and Profile Pictures in the Review Table
//              : This method is called after a Username or Profile picture change in the User Account
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

// Method       : Post
// Headers      : Authorization - 'Bearer token'
// Params       : ItemId
// Body         : None 
// Validation   : User Validation, Admin Validation
// Return       : msg
// Description  : This methods updates a user review as Mark As Read.
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


// Method       : Get
// Headers      : Authorization - 'Bearer token'
// Params       : None
// Body         : None 
// Validation   : User Validation, Admin Validation
// Return       : msg - if error, data - if success
// Description  : This method gets the reviews which are replied by the admin and send the 
//                  item name and the reply count for each item and also the total review count for each item
router.get('/admin/getAdminReplyItems/', authenticateUser, verifyAdmin, (req, res) => {
    const company = req.authData.company;
    
    ReviewComments.find({ didAdminReplied: true, itemCompany: company }, (err, data) => {
        if (err) {
            res.status(400).send({ msg: err });
        } else {
            if (data) {
                if(data.length==0){
                   return res.status(200).send({data:[]});
                }
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
                            setTimeout(()=>{
                                res.status(200).send({ data: responses })
                            },100)
                            
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

// Method       : Get
// Headers      : Authorization - 'Bearer token'
// Params       : ItemId
// Body         : None 
// Validation   : User Validatiob, Admin Validation
// Return       : msg -if error , data - if success
// Description  : This Methods returns the reviews which got a reply or the reviews which are marked as read
//                  in the database.
router.get('/admin/getAdminReplies/:id',authenticateUser,verifyAdmin,(req,res)=>{
    const itemId = req.params.id;
    ReviewComments.find({item:itemId,didAdminReplied:true,itemCompany:req.authData.company},(err,data)=>{
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


// Method       : Get
// Headers      : Authorization - 'Bearer token'
// Params       : UserId
// Body         : None 
// Validation   : User Validatiob, Admin Validation
// Return       : msg -if error , data - if success
// Description  : This methods returns a user's details if the user Id is provided.
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

// Method       : Get
// Headers      : None
// Params       : Company Name
// Body         : None 
// Validation   : None
// Return       : msg , review - if success
// Description  : This methods returns all the reviews for items for a company
router.get('/reviews/view/:company',async(req,res)=>{
    let review = await ReviewComments.find({itemCompany:req.params.company})

    if(!review)
        res.status(404).json({msg:'No Data Found'})
    else{
        res.json(review);
    }
})

module.exports = router;