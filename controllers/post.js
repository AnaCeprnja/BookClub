
const express = require('express')
const db = require('../models')
const router = express.Router()

router.get('/', (req, res) => {
    db.post.findAll()
        .then(function (posts) {
            res.render('posts', { posts: posts })
        })
})


router.post('/', (req, res) => {
    db.post.create({
        data: req.body.data,

    })
        .then(function (post) {
            res.redirect('/')
        })
        .catch(function (error) {
            res.status(400).render('main/404')
        })
})

module.exports = router;