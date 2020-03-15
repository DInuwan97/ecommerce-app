const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    reviewedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "item",
        required: true,
        
    },

    starRating: {
        type: Number,
        required: true,
        
    }
});

module.exports = Review = mongoose.model('review', ReviewSchema);