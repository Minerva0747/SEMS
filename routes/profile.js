const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");

const User = require("../model/User");


router.get("/", auth, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const user = await User.findById(req.user.id);
      res.render('profile/index', {user : user})
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });



router.get('/update', (req, res) => {
    res.render('profile/update')
})


module.exports = router