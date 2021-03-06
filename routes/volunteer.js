const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");

const User = require("../model/User");
const Event= require("../model/Event");
const { response } = require("express");


router.get('/',auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    user = req.user.id;

    const event = await Event.find({eventVolunteerID:user});
    
    res.render('volunteer/index', {event:event});
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
})


router.get('/tovolunteer',auth, async (req, res) => {
  try {
    const event = await Event.find({volunteerNeeded:{ $gte: 1  }});
    res.render('volunteer/tovolunteer', {event:event});
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
})

router.post('/tovolunteer/:id',auth, async (req, res) => {
  try {
    userid = req.user.id;

    const event = await Event.findById(req.params.id);

    const volunteer = event.eventVolunteerID;

    let y = true;
    for(var x in volunteer)
    {
        if(volunteer[x] == userid)
        {
           y = false;
        }
    }
    if(y){
      await Event.findByIdAndUpdate(req.params.id,
        {$addToSet: {'eventVolunteerID' : userid}},  {new:true},
        function(err, result) {
          if (err) {
            res.redirect("/volunteer");     
        } else {
            res.redirect("/volunteer");     
        }
        }
      );
    }
    else{
      res.redirect("/volunteer/tovolunteer");  
  }}    
    catch (e){
        res.redirect("/home");
    }


})

router.get('/managetask/:id',auth, async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render('volunteer/managetask', {event:event})
})

router.get('/addtask/:id',auth, async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render('volunteer/addtask', {event:event})
})

router.post('/addtask/:id',auth, async (req, res) => {
  const event = await Event.findById(req.params.id);
  await Event.findByIdAndUpdate(req.params.id,
    {$addToSet: {'taskVolunteer' : req.body.task}},  {new:true},
    function(err, result) {
      if (err) {
        res.redirect("/volunteer/managetask/"+ req.params.id);     
    } else {
        res.redirect("/volunteer/managetask/"+ req.params.id);     
    }
    }
  );
})

router.post('/delete/:id',auth, async (req, res) => {
  const event = await Event.findById(req.params.id);
  let task = req.body.delete;

  await Event.findByIdAndUpdate(req.params.id,
    {$pull: {'taskVolunteer' : task}},  {new:true},
    function(err, result) {
      if (err) {

        res.redirect("/volunteer/managetask/"+ req.params.id);     
    } else {
      
        res.redirect("/volunteer/managetask/"+ req.params.id);     
    }
    }
  );


})

router.get("/", auth, async (req, res) => {
    try {
    } catch (e) {
     
    }
  });




module.exports = router