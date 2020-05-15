const mongoose = require('mongoose');

const purchasedItemsSchema = mongoose.Schema({
  // user id
  buyerID: {
    type: String,
    required: true
  },
  items: [],
  totalPrice: {
    type: Number,
    required: true
  },
  noOfItems: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});


module.exports = Purchased = mongoose.model('purchasedItems', purchasedItemsSchema);