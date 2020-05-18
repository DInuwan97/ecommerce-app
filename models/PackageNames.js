const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({

    packageName:{
        type:String,
        uppercase:true
    },
    maxNoOfSalesServicers:{
        type:Number
    },
    packageIconImage:{
        type:String,
        default:''
    },
    packageDscription:{
        type:String,
        default:''
    }

});

module.exports = PackageNames = mongoose.model("packageInformation", packageSchema);