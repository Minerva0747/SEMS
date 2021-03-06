const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");


const User = require("../model/User");
const Event= require("../model/Event");
const { response } = require("express");
const { eventNames } = require("../model/User");





module.exports = router