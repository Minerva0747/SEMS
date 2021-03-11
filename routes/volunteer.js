const express = require("express");
const router = express.Router();
const auth = require("./../middleware/auth");
const Event= require("../model/Event");


//Open Event You Volunteered page
router.get('/',auth, async (req, res) => 
{
  try 
  { // request.user is getting fetched from Middleware after token authentication
    user = req.user.id;
    const event = await Event.find({eventVolunteerID:user});
    res.render('volunteer/index', {event:event});
  } 
  catch (e) 
  {
    res.send({ message: "Error in Fetching user" });
  }
});



//Open toVolunteer page
router.get('/tovolunteer',auth, async (req, res) => 
{
  try 
  {
    const event = await Event.find({volunteerNeeded:{ $gte: 1  }});
    res.render('volunteer/tovolunteer', {event:event});
  } 
  catch (e) 
  {
    res.send({ message: "Error in Fetching user" });
  }
});



// open manage MyEvent Volunteer page
router.get('/managetask/:id',auth, async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render('volunteer/managetask', {event:event});
});


// Open Add task page
router.get('/addtask/:id',auth, async (req, res) => 
{
  const event = await Event.findById(req.params.id);
  res.render('volunteer/addtask', {event:event});
});



// Student volunteer event
router.post('/tovolunteer/:id',auth, async (req, res) => 
{
  try 
  {
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
    if(y)
    {
      await Event.findByIdAndUpdate
      (req.params.id, {$addToSet: {'eventVolunteerID' : userid}},  {new:true},
        function(err, result) 
        {
          if (err) 
          {
            res.redirect("/volunteer");     
          } 
          else 
          {
            res.redirect("/volunteer");     
          }
        }
      );
    }
    else
    {
      res.redirect("/volunteer/tovolunteer");  
    }
  }    
  catch (e)
  {
    res.redirect("/home");
  }
});



// Add Task 
router.post('/addtask/:id',auth, async (req, res) => 
{
  const event = await Event.findById(req.params.id);
  await Event.findByIdAndUpdate(req.params.id, {$addToSet: {'taskVolunteer' : req.body.task}},  {new:true},
  function(err, result) 
  {
    if (err) 
    {
        res.redirect("/volunteer/managetask/"+ req.params.id);     
    } 
    else 
    {
        res.redirect("/volunteer/managetask/"+ req.params.id);     
    }
  });
});


// delete task
router.post('/delete/:id',auth, async (req, res) => 
{
  const event = await Event.findById(req.params.id);
  let task = req.body.delete;
  await Event.findByIdAndUpdate(req.params.id, {$pull: {'taskVolunteer' : task}}, {new:true},
  function(err, result) 
  {
    if (err) 
    {
      res.redirect("/volunteer/managetask/"+ req.params.id);     
    } 
    else 
    { 
      res.redirect("/volunteer/managetask/"+ req.params.id);     
    }
  });
});



module.exports = router