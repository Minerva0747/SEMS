const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('participation/index')
})

router.get('/epartdetail', (req, res) => {
    res.render('participation/epartdetail')
})

module.exports = router