const mongoose = require('mongoose');

const ReviewHelpfulSchema = mongoose.Schema({
    reviewViewesUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    reviewID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"review",
        required:true
    },
    reviewWasHelpful:{
        type:Boolean,
        default:false

    },
    reviewWasNotHelpful:{
        type:Boolean,
        default:false
    }

});

module.exports = ReviewHelpful = mongoose.model('reviewHelpful',ReviewHelpfulSchema);