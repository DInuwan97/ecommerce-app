const mongoose = require('mongoose');

const companySchema = mongoose.Schema({

    companyName:{
        type:String,
        required:true
    },
    packageName:{
        type:String,
        required:true,
        uppercase:true
    },
    mobile:{
        typr:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    companyLogo:{
        type:String,
        default:''
    }
});

module.exports = Companies = mongoose.model("companies", companySchema);