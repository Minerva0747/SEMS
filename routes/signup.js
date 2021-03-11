const express = require('express')
const router = express.Router()

//open the sign up page
router.get('/', (req, res) => {
    res.render('signup/index')
})




module.exports = router