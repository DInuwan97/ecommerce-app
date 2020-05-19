const mongoose = require('mongoose');

const purchasedItemsSchema = mongoose.Schema({
  // user id
  purchasedUserEmail:{
    type:String,
    required:true
  },
  buyerDetails:{
    firstName:{
      type:String,
      required:true
    },
    lastName:{
      type:String,
      required:true
    },
    mobile:{
      type:String,
      required:true
    },
    address:{
      type:String
    }
  },
  items:{
    type:[]
  },
  summary:{
    subtotal:{
      type:Number,
      required:true
    },
    total:{
      type:Number,
      required:true
    },
    totalDiscount:{
      type:Number,
      required:true
    }
  },
  purchasedDate:{
    type:Date,
    default:Date.now()
  }
 
  
});


module.exports = PurchasedItems = mongoose.model('purchasedItems', purchasedItemsSchema);