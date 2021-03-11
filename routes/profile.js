const express = require("express");
const router = express.Router();
const auth = require("./../middleware/auth");
const User = require("../model/User");

// open profile page
router.get("/", auth, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const user = await User.findById(req.user.id);
      res.render('profile/index', {user : user})
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });


// open the update profile page
router.get('/update', (req, res) => {
    res.render('profile/update')  
});


module.exports = router