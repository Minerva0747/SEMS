const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");

const User = require("../model/User");
const Event= require("../model/Event");
const { response } = require("express");

router.post("/create", auth, async (req, res) => {
    const {
        eventName,
        organizedBy,
        eventStartDate,
        eventEndDate,
        venue,
        eventActivities,
        description,
        volunteerNeeded,
        eventManagerID = req.user.id
    } = req.body;
    try {
        let event = await Event.findOne({
            eventName
        });
        if (event) {
            return res.status(400).json({
                msg: "User Already Exists"
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
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }

  });

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
        
   await User.findByIdAndUpdate(
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
