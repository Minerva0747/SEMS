const express = require("express");
const router = express.Router();
const auth = require("./../middleware/auth");
const User = require("../model/User");
const Event= require("../model/Event");

// open event detail from student home page 
router.get("/:id", auth, async (req, res) => 
{
    let event;
    try
    {
        event = await Event.findById(req.params.id);
        res.render("home/eventdetail", {event:event});
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

// Student Join Event 
router.post("/:id", auth, async (req, res) => 
{
    try
    {
        userid = req.user.id;
        const event = await Event.findById(req.params.id);
        const eventParticipantList = event.eventParticipant;
        
        let y = true;
        for(var x in eventParticipantList)
        {
            if(eventParticipantList[x].eventParticipantID == userid)
            {
                y = false;
            }
        }
        if(y)
        {
            await Event.findByIdAndUpdate(req.params.id,
            {$addToSet: {'eventParticipant': {"eventParticipantID": userid, "attendanceStatus" : "false"}}},  {new:true},
            function(err, result) 
            {
                if (err) 
                {
                    res.redirect("/participation");     
                } 
                else 
                {
                    res.redirect("/participation");     
                }
            });
        }
        else
        {
            res.redirect("/participation");     
        }          
    }
    catch (e)
    {
        res.redirect("/home");
    }
});

  module.exports = router;
