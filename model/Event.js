const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator')

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

  taskVolunteer :{
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
    type: Buffer,
  },
  posterImageType:{
    type: String,
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
    eventParticipantID : { type : mongoose.ObjectId , unique:true, },
    attendanceStatus : { Boolean, default : false}
  }],


  eventVolunteerID: [{
    type :mongoose.ObjectId,
    ref: 'Event'
  }]
  
});

EventSchema.plugin(uniqueValidator)

module.exports = mongoose.model("event", EventSchema);