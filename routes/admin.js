const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");
const imageMimeTypes = ['image/jpeg','image/png','images/gif'];

const User = require("../model/User");
const Event = require("../model/Event");

router.post("/updateDescription/:id",auth, async(req,res) =>{


    await Event.findByIdAndUpdate(
        req.params.id,
        {feedback : req.body.feedback}, {new:true},
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.redirect("/admin/toapprove/" + req.params.id);
          }
        }
      );
})


router.post('/toapprove/:id',auth, async(req, res) => {


    await Event.findByIdAndUpdate(
      req.params.id,
      {eventApproval : true}, {new:true},
      function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/admin/approval");
        }
      }
    );
    })

router.post('/todelete/:id',auth, async(req, res) => {

  let event
  try{
      event = await Event.findById(req.params.id);
      await event.remove();
      res.redirect('/admin');
  } catch{
      if(event == null){
          res.redirect('/admin')
      } else{
          res.redirect('/admin')
      }
  }
    })



router.get('/approval',auth, async (req, res) => {
    try {

        const event = await Event.find({eventApproval : false});
        res.render("admin/approval", {event:event});
      } catch (e) 
      {
        res.send({ message: "Error in Fetching user" });
      }
})


router.get('/',auth, async (req, res) => {
    try {

        const event = await Event.find({eventApproval : true});
        res.render('admin/index', {event:event});
      } catch (e) {
        res.send({ message: "Error in Fetching user" });
      }
})

router.get('/admindetail/:id', auth, async(req, res) => {
    let event
    try{
        event = await Event.findById(req.params.id);
        res.render("admin/admindetail", {event:event});
    } catch{
        if(event == null){
            res.redirect('/')
        } else{
            res.redirect('/')
        }
    }
})



router.get('/toapprove/:id',auth, async(req, res) => {
    let event
    try{
        event = await Event.findById(req.params.id);
        res.render('admin/toapprove', {event:event});
    } catch{
        if(event == null){
            res.redirect('/')
        } else{
            res.redirect('/')
        }
    }
})



module.exports = router