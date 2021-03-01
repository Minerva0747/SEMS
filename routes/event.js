const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");


const User = require("../model/User");
const Event= require("../model/Event");
const { response } = require("express");


// Create new Event Student Side
router.post("/create", auth, async (req, res) => {
    let {
        eventName,
        organizedBy,
        eventStartDate,
        eventStartTime,
        eventEndDate,
        eventEndTime,
        venue,
        eventActivities,
        description,
        volunteerNeeded,
        eventManagerID = req.user.id
    } = req.body;
    
    eventStartTimeHour = eventStartTime.slice(0,2);
    eventStartTimeMinute = eventStartTime.slice(3);

    eventStartDate = new Date(eventStartDate);
    eventStartDate.setHours(eventStartDate.getHours() + eventStartTimeHour);
    eventStartDate.setMinutes(eventStartTimeMinute);


        
    eventEndTimeHour = eventEndTime.slice(0,2);
    eventEndTimeMinute = eventEndTime.slice(3);

    eventEndDate = new Date(eventEndDate);
    eventEndDate.setHours(eventEndDate.getHours() + eventEndTimeHour);
    eventEndDate.setMinutes(eventEndTimeMinute);


    try {
        let event = await Event.findOne({
            eventName
        });
        if (event) {
            return res.status(400).json({
                msg: "Event Already Exist"
            });
        }

        event = new Event({
            eventName,
            organizedBy,
            eventStartDate,
            eventEndDate,
            venue,
            eventActivities,
            description,
            volunteerNeeded,
            eventManagerID
        });
        await event.save();
        res.status(200).send("Successfully Create Event");
    }
    catch (err) {
        res.status(500).send("Error in Saving");
    }

  });

  // Get all event managed by Student side
  router.get("/", auth, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const event = await Event.find({eventManagerID : req.user.id});
      res.json(event);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });


  router.get("/:id", auth, async (req, res) => {
    let event
    try{
        event = await Event.findById(req.params.id);
        res.json(event);
    } catch{
        if(event == null){
            res.redirect('/')
        } else{
            res.redirect('/')
        }
    }
});



  // Update specific event Student Side
  router.put("/:id", auth, async (req, res) => {
    let event
    try{
        updateQuery = {};

        if(req.body.name)
        {
          updateQuery.eventName = req.body.eventName;
        }
    
        if(req.body.organizedBy)
        {
          updateQuery.organizedBy = req.body.organizedBy;
        }
    
        if(req.body.eventStartDate)
        {
          updateQuery.eventStartDate = req.body.eventStartDate;
        }
    
        if(req.body.eventEndDate)
        {
          updateQuery.eventEndDate = req.body.eventEndDate;
        }
    
        if(req.body.venue)
        {
          updateQuery.venue = req.body.venue;
        }
    
        if(req.body.eventActivities)
        {
          updateQuery.eventActivities = req.body.eventActivities;
        }

        if(req.body.description)
        {
          updateQuery.description = req.body.description;
        }
        
   await Event.findByIdAndUpdate(
      req.params.id,
      updateQuery, {new:true},
      function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/myEvent");
        }
      }
    );

    } catch{
        if(event == null){
            res.redirect('/');
        } else{
            res.redirect('/');
        }
    }
});

// Cancel Event Student Side
  router.delete("/:id", auth, async (req, res) => {
      let event
      try{
          event = await Event.findById(req.params.id);
          await event.remove();
          res.redirect('/');
      } catch{
          if(event == null){
              res.redirect('/')
          } else{
              res.redirect('/')
          }
      }
  });








  module.exports = router;
