const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('admin/index')
})

router.get('/admindetail', (req, res) => {
    res.render('admin/admindetail')
})

router.get('/approval', (req, res) => {
    res.render('admin/approval')
})

router.get('/toapprove', (req, res) => {
    res.render('admin/toapprove')
})

module.exports = router