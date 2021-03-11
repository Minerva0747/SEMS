const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");
const User = require("../model/User");

const imageMimeTypes = ["image/jpeg","image/png","image/gif", "image/jpg"]


// update profile image
router.post("/update/image", auth, async (req, res) => 
{
  
  let user = await User.findById(req.user.id);

  if(req.body.picture == null) return;

  const profile = JSON.parse(req.body.picture);

  if(profile != null && imageMimeTypes.includes(profile.type))
  {
    user.profilePic =  new Buffer.from(profile.data, 'base64');
    user.profilePicType = profile.type;
  }
  await user.save();

  res.redirect("/profile");

});



// student sign up
router.post(
    "/signup",
    [
        check("roleID", "Please Enter a Valid ID")
        .not()
        .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength
        ({
            min: 6
        })
    ],
    async (req, res) => 
    {
        const errors = validationResult(req);

        if (!errors.isEmpty()) 
        {
            return res.status(400).json({errors: errors.array()});
        }
        const { roleID, name, email, password, role = "student"} = req.body;
        try {
            let user = await User.findOne({email});
            if (user) 
            {
                return res.status(400).json({msg: "User Already Exists"});
            }
            user = new User({roleID, name, email, password, role});

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            console.log(req.body)
            await user.save();

            const payload = { user: {id: user.id} };

            jwt.sign
            (
                payload,
                "randomString", {expiresIn: 10000},
                (err, token) => 
                {
                    if (err) throw err;
                    res.redirect('/');
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

//login authentication
router.post
(
    "/login",
    [
        check("roleID", "Please Enter a Valid ID")
        .not()
        .isEmpty(),
        check("password", "Please enter a valid password").isLength({min: 6})
    ],
    async (req, res) => 
    {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) 
      {
        return res.status(400).json({errors: errors.array()});
      }
  
      const { roleID, password } = req.body;
      try 
      {
        let user = await User.findOne({ roleID });
        if (!user)
          return res.status(400).json({ message: "User Not Exist" });
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ message: "Incorrect Password !" });
  
        const payload = { user: { id: user.id } };
  
        jwt.sign(
          payload,
          "randomString",
          {
            expiresIn: 86400
          },
          (err, token) => 
          {
            if (err) throw err;
            res.cookie( 'token', token);
            if(user.role == "student")
            {
              res.redirect('/home');
            }
            else
            {
              res.redirect('/admin');
            }
          
          }
        );
      } 
      catch (e) 
      {
        console.error(e);
        res.status(500).json({ message: "Server Error" });
      }
    }
  );


// logout
router.post("/logout",auth, async (req,res)=> {
  res.clearCookie("token");
  res.redirect('/');
});
 

// update student information
router.post("/update", auth, async (req, res) => {

    updateQuery = {};

    if(req.body.name)
    {
      updateQuery.name = req.body.name;
    }

    if(req.body.email)
    {
      updateQuery.email = req.body.email;
    }

    if(req.body.phoneNumber)
    {
      updateQuery.phoneNumber = req.body.phoneNumber;
    }

    if(req.body.address)
    {
      updateQuery.address = req.body.address;
    }

    if(req.body.school)
    {
      updateQuery.school = req.body.school;
    }

    if(req.body.class)
    {
      updateQuery.class = req.body.class;
    }

    await User.findByIdAndUpdate(
      req.user.id,
      updateQuery, {new:true},
      function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/profile");
        }
      }
    );
  });







  
module.exports = router;
