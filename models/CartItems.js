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
    required:true
  },
  size: {
    type: String,
  },
  color: {
    type: [String],
    default:''
  },
  brand: {
    type: String,
    default:''
  },
  stockQuantity: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  addedUserFirstName:{
    type:String,
    required:true
  },
  addedUserLastName:{
    type:String,
    required:true
  },
  addedUserEmail:{
    type:String,
    required:true
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
    default: true,
  },
  quantity: {
    type: Number,
    default: 1
  },
 company:{
  type:String,
  required:true
 },
 isSelectedItem:{
   type:Boolean
 },
 totalPrice:{
  type:Number
 },
 itemId:{
  type:String,
  required:true
}

});


module.exports = CartItem = mongoose.model('cartItems', cartItemsSchema);