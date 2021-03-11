const mongoose = require("mongoose");

//Event attribute
const EventSchema = mongoose.Schema
({
  eventName : { type: String, required: true },

  organizedBy : { type : String, required : true },
  
  eventStartDate :{ type : Date, required : true },

  eventEndDate : { type: Date, required : true },
  
  venue : { type : String, required : true },
  
  eventActivities : { type : [String], required : true },

  taskVolunteer : { type : [String], required : true },
  
  description : { type : String, required : true },

  volunteerNeeded : { type : Number, required : true },

  posterImage : { type: Buffer },
  
  posterImageType :{ type: String },

  eventApproval : { type: Boolean, default : false },

  signOffstatus : { type: Boolean, default : false },

  feedback:{ type : String, required:false },

  eventManagerID : [{ type : mongoose.ObjectId, ref: 'Event' }],

  eventParticipant : [{ eventParticipantID : { type : mongoose.ObjectId  }, attendanceStatus : { type: Boolean, default : false }}],

  eventVolunteerID : [{ type : mongoose.ObjectId }]
  
});

EventSchema.virtual('posterPath').get(function() 
{
  if (this.posterImage != null && this.posterImageType != null) 
  {
    return `data:${this.posterImageType};charset=utf-8;base64,${this.posterImage.toString('base64')}`
  }
})

module.exports = mongoose.model("event", EventSchema);