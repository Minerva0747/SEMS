const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('participation/index')
})


module.exports = router