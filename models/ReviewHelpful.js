const mongoose = require('mongoose');

const ReviewHelpfulSchema = mongoose.Schema({
    reviewViewesUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    reviewID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"reviewComment",
        required:true
    },
    reviewLikeStatus:{
        type:Number,
        default:0
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "item",
        required: true
    }
});

module.exports = ReviewHelpful = mongoose.model('reviewHelpful',ReviewHelpfulSchema);
