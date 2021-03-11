const express = require("express");
const router = express.Router();
const auth = require("./../middleware/auth");
const Event = require("../model/Event");

// Open student home page
router.get('/', auth,async  (req, res) => 
{
  try 
  {
    const event = await Event.find({eventApproval : true});
    res.render('home/index', {event:event});
  } 
  catch (e) 
  {
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router




