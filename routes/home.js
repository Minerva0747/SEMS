const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");
const imageMimeTypes = ['image/jpeg','image/png','images/gif'];

const User = require("../model/User");
const Event = require("../model/Event");


router.get('/', auth,async  (req, res) => {
    try {

        const event = await Event.find({eventApproval : true});
        res.render('home/index', {event:event});
      } catch (e) {
        res.send({ message: "Error in Fetching user" });
      }

})

router.get('/eventdetail', (req, res) => {
    res.render('home/eventdetail')
})


module.exports = router




