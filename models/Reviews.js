const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    reviewedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    startRating: {
        type: int,
        required: true
    },
    reviewMessage: {
        type: String,
    },
    hasAParentReview: {
        type: Boolean,
        default: false,
        required:true
    },
    parentReview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
        required: function () {
            if (hasAParentReview) {
                return true
            } else {
                return false
            }
        }
    }

});

module.exports = Review = mongoose.model('review', ReviewSchema);