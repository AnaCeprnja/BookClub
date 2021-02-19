
const express = require('express')
const db = require('../models')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('comments')
})

router.get('/comments', (req, res) => {
    db.comment.findAll()
        .then(function (comments) {
            console.log(comments)
            res.render('commentsshow', { comments: comments })
        })
})


router.post('/', (req, res) => {
    db.comment.create({
        data: req.body.data,
        postId: req.body.postId
    })
        .then(function (comment) {
            res.redirect('/post/posts')
        })
        .catch(function (error) {
            res.status(400).render('main/404')
        })
})

module.exports = router;