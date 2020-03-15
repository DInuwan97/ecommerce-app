const mongoose = require('mongoose');

const ReviewCommentSchema = mongoose.Schema({
    reviewedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "item",
        required: true
    },
    reviewMessage: {
        type: String,
    },
    hasAParentReview: {
        type: Boolean,
        default: false
    },
    parentReview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
        required: function () {
            if (this.hasAParentReview==true) {
                return true;
            } else {
                return false;
            }
        }
    },
    AddedTime:{
        type:Date,
        default:Date.now
    }

});

module.exports = ReviewComment = mongoose.model('reviewComment', ReviewCommentSchema);