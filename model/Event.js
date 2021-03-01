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
    data: Buffer,
    contentType: String
  },

  photosImageOne : {
    data: Buffer,
    contentType: String
  },

  photosImageTwo : {
    data: Buffer,
    contentType: String
  },

  photosImageThree : {
    data: Buffer,
    contentType: String
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