const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('myevent/index')
})

router.get('/createmyevent', (req, res) => {
    res.render('myevent/createmyevent')
})

router.post('/createmyevent', (req, res) => {
    res.redirect('/myevent')
})



module.exports = router