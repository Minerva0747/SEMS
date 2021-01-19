const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");

const User = require("../model/User");
const Event= require("../model/Event");
const { response } = require("express");



  // Get all event managed That Is not Approved Teacher Side
  router.get("/", auth, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const event = await Event.find({eventApproval : "false"});
      res.render('myEventTeacher/index', {event : event})
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });




// Get Detail of Specific Event
  router.get("/:id", auth, async (req, res) => {
      let event
      try{
          event = await Event.findById(req.params.id);
          res.render('/myEventTeacher/detail', {event : event});
      } catch{
          if(event == null){
              res.redirect('/')
          } else{
              res.redirect('/')
          }
      }
  });

  
  // Approve Event
  router.post("/:id/Approve", auth, async (req, res) => {
    let event
    try{
        await Event.findByIdAndUpdate(
            req.params.id,
           {eventApproval : "true"}, {new:true},
            function(err, result) {
              if (err) {
                res.send(err);
              } else {
                res.redirect("/");
              }
            }
        );
        res.redirect('/');
    } catch{
        if(event == null){
            res.redirect('/')
        } else{
            res.redirect('/')
        }
    }
});

// Disaprove Event
router.post("/:id/Disapprove", auth, async (req, res) => {
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
