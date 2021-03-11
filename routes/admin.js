const express = require("express");
const router = express.Router();
const auth = require("./../middleware/auth");
const Event = require("../model/Event");

//Give feedback by admin, can be updated 
router.post("/updateDescription/:id",auth, async(req,res) =>
{
  await Event.findByIdAndUpdate
  (
    req.params.id, {feedback : req.body.feedback}, {new:true}, function(err, result) 
    {
      if (err) 
      {
        res.send(err);
      } 
      else 
      {
        res.redirect("/admin/toapprove/" + req.params.id);
      }
    }
  );
});

//approve event by admin
router.post('/toapprove/:id',auth, async(req, res) => 
{
  await Event.findByIdAndUpdate
  (
    req.params.id,{ eventApproval : true }, { new:true }, function(err, result) 
    {
      if (err) 
      {
        res.send(err);
      } 
      else 
      {
        res.redirect("/admin/approval");
      }
    }
  );
});

//disapprove event by admin
router.post('/todelete/:id',auth, async(req, res) => 
{
  let event;
  try
  {
    event = await Event.findById(req.params.id);
    await event.remove();
    res.redirect('/admin');
  } 
  catch
  {
    if(event == null)
    {
      res.redirect('/admin');
    } 
    else
    {
        res.redirect('/admin');
    }
  }
});

//open Approval page in admin side
router.get('/approval',auth, async (req, res) => 
{
  try 
  {
    const event = await Event.find({eventApproval : false});
    res.render("admin/approval", {event:event});
  } 
  catch (e) 
  {
    res.send({ message: "Error in Fetching user" });
  }
});

//open home page of admin
router.get('/',auth, async (req, res) => 
{
  try 
  {
    const event = await Event.find({eventApproval : true});
    res.render('admin/index', {event:event});
  } 
  catch (e) 
  {
    res.send({ message: "Error in Fetching user" });
  }
});

//open event detail from the home page
router.get('/admindetail/:id', auth, async(req, res) => 
{
  let event;
  try
  {
    event = await Event.findById(req.params.id);
    res.render("admin/admindetail", {event:event});
  } 
  catch
  {
    if(event == null)
    {
      res.redirect('/');
    } 
    else
    {
      res.redirect('/');
    }
  }
});


//open event detail from Approvalpage
router.get('/toapprove/:id',auth, async(req, res) => {
  let event;
  try
  {
    event = await Event.findById(req.params.id);
    res.render('admin/toapprove', {event:event});
  } 
  catch
  {
    if(event == null)
    {
      res.redirect('/');
    } 
    else
    {
      res.redirect('/');
    }
  }
});



module.exports = router;