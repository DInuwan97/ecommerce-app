const mongoose = require('mongoose');

const contactus = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    msg:{
        type:String,
        required:true
    },
    replied:{
        type:Boolean,
        default:false
    },
    repliedAdmin:{
        type:mongoose.Schema.Types.ObjectId
    },
    replyTime:{
        type:Date
    },
    reply:{
        type:String,
        default:""
    }
})

module.exports = ContactUs = mongoose.model("ContactUs",contactus);