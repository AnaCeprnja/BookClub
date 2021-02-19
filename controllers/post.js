
const express = require('express')
const db = require('../models')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('posts')
})

/*router.get('/posts', (req, res) => {
    db.post.findAll({ include: [{ model.Comments }] })
        .then(function (posts) {
            console.log(posts)
            res.render('postsshow', { posts: posts })
        })
})
*/
router.get('/posts', function (req, res) {
    db.post.findAll({
        include: [db.comment]
    })
        .then(function (posts) {
            if (!posts) throw Error()
            console.log(posts.comment)
            res.render('postsshow', { posts: posts })
        })
        .catch(function (error) {
            console.log(error)
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