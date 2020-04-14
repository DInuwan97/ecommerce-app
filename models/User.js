const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    mobile:{
        type:String,
        required:true,
        lowercase:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isCustomer:{
        type:Boolean,
        default:false
    },
    isSalesManager:{
        type:Boolean,
        default:false
    },
    isSalesServicer:{
        type:Boolean,
        default:false
    },
    company:{
        type:String,
        required: function(){
            if(this.isSalesManager || this.isSalesServicer){
                return true;
            }else{
                return false;
            }
        }
    },
    package:{
        type:String,
        required:function(){
            if(this.isSalesManager || this.isAdmin){
                return true;
            }else{
                return false;
            }
        },
        uppercase:true
    },
    userImageUrl:{
        type:String,
        default:''
    },
    address:{
       type:String,
        default:''
    },
    password:{
        type:String,
        required:true
    },
    regDate:{
        type:String,
        default:Date.now
    },
    secureKey:{
        type:Number,
        required:true
    },
    secureKeyVerifyStatus:{
        type:Boolean,
        default:false,
        required:true
    },
    adminVerification:{
        type:Boolean,
        required: function(){
            return this.isSalesManager;
        }
        
    },
    salasManagerVerification:{
        type:Boolean,
        required:function(){
            return this.isSalesServicer
        }  
    }

});

module.exports = Users = mongoose.model('users',UserSchema);