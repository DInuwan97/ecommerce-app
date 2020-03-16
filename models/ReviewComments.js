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
    }

});

module.exports = ReviewComment = mongoose.model('reviewComment', ReviewCommentSchema);