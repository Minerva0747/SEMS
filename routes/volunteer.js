<<<<<<< Updated upstream
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('volunteer/index')
})
=======
const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");

const User = require("../model/User");
const Event= require("../model/Event");
const { response } = require("express");


router.get("/", auth, async (req, res) => {
    try {
    } catch (e) {
     
    }
  });


>>>>>>> Stashed changes


module.exports = router