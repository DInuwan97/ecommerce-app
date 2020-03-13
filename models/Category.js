const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryName : {
        type : String,
        required : true,
        unique : true
    },
    genderType : {
        type : String,
        required : true
    },
    code : {
        type : String
    }
});


module.exports = Category = mongoose.model('category', categorySchema);