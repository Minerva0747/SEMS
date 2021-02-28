const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('myevent/index')
})

router.get('/createmyevent', (req, res) => {
    res.render('myevent/createmyevent')
})

router.get('/myeventdetail', (req, res) => {
    res.render('myevent/myeventdetail')
})

router.post('/createmyevent', (req, res) => {
    res.redirect('/myevent')
})


router.get('/updateMyevent', (req, res) => {
    res.render('myevent/updateMyevent')
})

router.get('/viewattendance', (req, res) => {
    res.render('myevent/viewattendance')
})

module.exports = router