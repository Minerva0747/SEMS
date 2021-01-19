const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");

const User = require("../model/User");
const Event= require("../model/Event");
const { response } = require("express");


router.get("/", auth, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const event = await Event.find({eventApproval : "true"});
      res.render('participation/index', {event : event})
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });


router.get("/:id", auth, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const event = await Event.findById(req.params.id);
      res.render('participation/event/detail', {event : event})
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });


router.post("/:id",auth , async (req,res) => {
    let event
    try{
    await Event.findByIdAndUpdate(
      req.params.id,
      { $push : { eventParticipant : {
          eventParticipantID : req.user.id,
          attendanceStatus : false
      } } }, {new:true},
      function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/");
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


router.get('/epartdetail', (req, res) => {
    res.render('participation/epartdetail')
})

module.exports = router