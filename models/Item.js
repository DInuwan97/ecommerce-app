const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  itemImage: {
    type: String,
    default: null,
  },
  itemImageId: {
    type: String,
    default: null,
  },
  size: {
    type: String,
  },
  color: {
    type: [String],
  },
  Brand: {
    type: String,
  },
  stockQuantity: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  description : {
    type : String,
    default : null
  },
  addedBy: {
    type: mongoose.Schema.Types.String,
    ref: "users",
  },
  company: {
    type: String,
    default: null,
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

module.exports = Item = mongoose.model("item", itemSchema);
