const mongoose = require('mongoose');

const ReviewCommentSchema = mongoose.Schema({
    reviewedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    reviewUserFirstName:{
        type:String,
        required:true
    },
    reviewUserLastName:{
        type:String,
        required:true
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "item",
        required: true
    },
    reviewMessage: {
        type: String,
    },
    
    AddedTime:{
        type:Date,
        default:Date.now
    },
    reviewHelpfulCount:{
        type:Number,
        default:0,
        required:true
    },
    reviewNotHelpfulCount:{
        type:Number,
        default:0,
        required:true
    },
    reviewerEmail:{
        type:String,
        required:true
    },
    itemCompany:{
        type:String,
        required:false
    },
    userImageUrl:{
        type:String,
        default:''
    },
    didAdminReplied:{
        type:Boolean,
        default:false
    },
    adminsReply:{
        type:String,
        default:''
    },
    adminsReplyTime:{
        type:Date,
    },
    repliedAdmin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

module.exports = ReviewComment = mongoose.model('reviewComment', ReviewCommentSchema);