
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


router.post('/delete', async (req, res) => {
    let comment = await db.comment.findOne({ where: { id: req.body.commentId } }).catch(e => console.log(e.message))
    if (!comment) console.log("comment not found", req.body.commentId)
    else comment.destroy()
    res.redirect('/post/posts')
})

module.exports = router;


