const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");

const User = require("../model/User");
const Event= require("../model/Event");
const { response } = require("express");

router.post("/create", auth, async (req, res) => {
    const {
        eventName,
        organizedBy,
        eventStartDate,
        eventEndDate,
        venue,
        eventActivities,
        description,
        volunteerNeeded,
        eventManagerID = req.user.id
    } = req.body;
    try {
        let event = await Event.findOne({
            eventName
        });
        if (event) {
            return res.status(400).json({
                msg: "User Already Exists"
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
        res.status(200).send("Successfully Create Event");
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }

  });




  module.exports = router;
