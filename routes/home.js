const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('home/index')
})

router.get('/eventdetail', (req, res) => {
    res.render('home/eventdetail')
})


module.exports = router




