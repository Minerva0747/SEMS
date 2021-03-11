const express = require('express')
const router = express.Router()

// get the login page
router.get('/', (req, res) => {
    res.render('login/index')
})

module.exports = router