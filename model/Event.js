const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  eventID: {
    type: String,
    required: true
  },
  eventName: {
    type: String,
    required: true
  },

  organizedBy : {
      type : String,
      required : true
  },
  eventStartDate:{
    type : date,
    required : true
  },
  eventEndDate:{
      type: date,
      required : true
  },
  venue : {
      type : String,
      required : true
  },
  eventActivities :{
      type : [String],
      required : true
  },
  description : {
      type : String,
      required : true
  },

  volunteerNeeded: {
      type : Number,
      required : true
  },

  posterImage : {
      type : [String],
      required : false
  },

  photosImage : {
    type : [String],
    required : false
  }
});

module.exports = mongoose.model("event", EventSchema);