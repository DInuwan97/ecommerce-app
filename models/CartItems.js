const mongoose = require('mongoose');

const cartItemsSchema = mongoose.Schema({
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
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
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
  quantity: {
    type: Number,
    default: 1
  }
});


module.exports = Cart = mongoose.model('cartItems', cartItemsSchema);