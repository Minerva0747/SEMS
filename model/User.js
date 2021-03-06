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

  school: {
    type: String,
    required: false
  },

  profilePic: {
    type: Buffer,
    required: false
  },
  
  profilePicType:{
    type: String,
    required : false
  },

  createdAt: {
    type: Date,
    default: Date.now()
  }

});

UserSchema.virtual('profilePath').get(function() {
  if (this.profilePic != null && this.profilePicType != null) {
    return `data:${this.profilePicType};charset=utf-8;base64,${this.profilePic.toString('base64')}`
  }
})

module.exports = mongoose.model("user", UserSchema);
