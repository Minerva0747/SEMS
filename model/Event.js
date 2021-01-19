const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },

  organizedBy : {
      type : String,
      required : true
  },
  eventStartDate:{
    type : Date,
    required : true
  },
  eventEndDate:{
      type: Date,
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
  },

  eventApproval : {
    type: Boolean,
    default : false
  },

  eventManagerID: [{
    type : mongoose.ObjectId,
    ref: 'Event'
  }]
  ,

  eventParticipant: [{
    eventParticipantID : { type : mongoose.ObjectId , ref: 'Event'},
    attendanceStatus : { Boolean, defaul : false}
  }],


  eventVolunteerID: [{
    type :mongoose.ObjectId,
    ref: 'Event'
  }]
  
});

module.exports = mongoose.model("event", EventSchema);