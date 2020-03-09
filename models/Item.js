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
      type : [String],
      required : true
  },
  size: {
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
    type: Number
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
