const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");

const User = require("../model/User");
const Event= require("../model/Event");
const { response } = require("express");


router.get('/', (req, res) => {
  res.render('volunteer/index')
})

router.get('/managetask', (req, res) => {
  res.render('volunteer/managetask')
})

router.get('/addtask', (req, res) => {
  res.render('volunteer/addtask')
})

router.get("/", auth, async (req, res) => {
    try {
    } catch (e) {
     
    }
  });




module.exports = router