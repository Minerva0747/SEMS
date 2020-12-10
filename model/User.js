const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  roleID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  class: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },

});

module.exports = mongoose.model("user", UserSchema);