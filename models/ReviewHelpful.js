const mongoose = require('mongoose');

const ReviewHelpful = mongoose.Schema({
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
        type:boolean,
        default:false

    },
    reviewWasNotHelpful:{
        type:boolean,
        default:false
    }

});

module.exports = ReviewHelpful = mongoose.model('reviewHelpful',ReviewHelpful);