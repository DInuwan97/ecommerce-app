const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "package" 
  },
  itemImage : {
    type : String
  }
  ,size: {
    type: [String]
  },
  color: {
    type: [String]
  },
  Brand: {
    type: String
  },
  stockQuantity: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default : 0
  },
  addedBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "users" 
  },
  addedDate: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    default: 0
  }
});

module.exports = Item = mongoose.model("item",itemSchema);
