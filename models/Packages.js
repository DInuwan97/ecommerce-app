const mongoose = require("mongoose");

const packageSchema = mongoose.Schema({
  packageType: {
    type: String,
    required: true,
    unique: true
  },
  noOfUsers: {
    type: Number,
    required: true
  },
  tags: {
    type: [String]
  },
  description: {
    type: String
  }
});

module.exports = Package = mongoose.model("package", packageSchema);
