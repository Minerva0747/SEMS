const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");
const imageMimeTypes = ['image/jpeg','image/png','images/gif'];

const User = require("../model/User");
const Event = require("../model/Event");

router.get('/',auth,  async (req, res) => {
    try {

        const event = await Event.find({eventManagerID : req.user.id});
        res.render('myevent/index', {event:event});
      } catch (e) {
        res.send({ message: "Error in Fetching user" });
      }

})

router.get('/createmyevent', (req, res) => {
    res.render('myevent/createmyevent')
})


// Create new Event Student Side
router.post("/createmyevent", auth, async (req, res) => {
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
        res.redirect('/myevent');
    }
    catch (err) {
        res.status(500).send("Error in Saving");
    }

  });



router.get('/:id', auth,async (req, res) => {
    let event
    try{
        event = await Event.findById(req.params.id);
        res.render('myevent/myeventdetail',{ event : event});
    } catch{
        if(event == null){
            res.redirect('/')
        } else{
            res.redirect('/')
        }
    }
   
})

router.get('/updateMyEvent/:id', auth,async (req, res) => {
    let event
    try{
        event = await Event.findById(req.params.id);
        res.render('myevent/updateMyEvent',{ event : event});
    } catch{
        if(event == null){
            res.redirect('/')
        } else{
            res.redirect('/')
        }
    }
   
})


 // Update specific event Student Side
 router.post("/updateMyEvent/:id", auth, async (req, res) => {

        updateQuery = {};

        if(req.body.eventName)
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
          eventStartTime = "00:00"
          if(req.body.eventStartTime)
          {
            eventStartTime = req.body.eventStartTime;
          }
          eventStartTimeHour = eventStartTime.slice(0,2);
          eventStartTimeMinute = eventStartTime.slice(3);
      
          updateQuery.eventStartDate = new Date( updateQuery.eventStartDate);
          updateQuery.eventStartDate.setHours( updateQuery.eventStartDate.getHours() + eventStartTimeHour);
          updateQuery.eventStartDate.setMinutes(eventStartTimeMinute);
      
      
              

        }
    
        if(req.body.eventEndDate)
        {
          updateQuery.eventEndDate = req.body.eventEndDate;
          eventEndTime = "00:00"
          if(req.body.eventEndTime)
          {
            eventEndTime = req.body.eventEndTime;
          }
          eventEndTimeHour = eventEndTime.slice(0,2);
          eventEndTimeMinute = eventEndTime.slice(3);
      
          updateQuery.eventEndDate = new Date( updateQuery.eventEndDate);
          updateQuery.eventEndDate.setHours( updateQuery.eventEndDate.getHours() + eventEndTimeHour);
          updateQuery.eventEndDate.setMinutes(eventEndTimeMinute);
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
          res.redirect("/myevent");
        }
      }
    );

    
});

router.post("/updateBanner/:id",auth, async(req,res) =>{
    
    let event =  await Event.findById(req.params.id);
    if (req.body.poster != null && req.body.poster !== '') {
      saveImage(book, req.body.poster)
    }



    try{
      const e = await event.save();
      res.redirect("/myevent")
    }
    catch{

    }
});


// Cancel Event Student Side
  router.post("/cancel/:id", auth, async (req, res) => {
      let event
      try{
          event = await Event.findById(req.params.id);
          await event.remove();
          res.redirect('/myevent');
      } catch{
          if(event == null){
              res.redirect('/myevent')
          } else{
              res.redirect('/myevent')
          }
      }
  });

  
// signoff Event Student Side
router.post("/signoff/:id", auth, async (req, res) => {
  let event
  try{
      event = await Event.findById(req.params.id);
      await event.remove();
      res.redirect('/myevent');
  } catch{
      if(event == null){
          res.redirect('/myevent')
      } else{
          res.redirect('/myevent')
      }
  }
});



// router.get('/viewattendance', (req, res) => {
//     res.render('myevent/viewattendance')
// })

function saveImage(event, posterEncoded){
    if(posterEncoded == null) return
    const poster = JSON.parse(posterEncoded);
    if(poster != null && imageMimeTypes.includes(poster.type)){
        event.posterImage = new Buffer.from(poster.data, 'base64') 
        event.posterImageType = poster.type
    }
}

module.exports = router