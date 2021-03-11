const express = require("express");
const router = express.Router();
const auth = require("./../middleware/auth");
const Event= require("../model/Event");


// open the participation page
router.get("/", auth, async (req, res) => 
{
  try 
  {
    // request.user is getting fetched from Middleware after token authentication
    const event = await Event.find({ "eventParticipant" : {$elemMatch: {eventParticipantID : req.user.id }}});
    res.render('participation/index', {event:event});
  } 
  catch (e) 
  {
    res.send({ message: "Error in Fetching user" });
  }
});


// open the event participation detail
router.get("/:id", auth, async (req, res) => 
{
  try 
  {
    // request.user is getting fetched from Middleware after token authentication
    const event = await Event.findById(req.params.id);
    res.render('participation/epartdetail', {event : event});
  } 
  catch (e) 
  {
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router


