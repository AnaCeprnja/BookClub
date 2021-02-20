
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
            res.redirect('/post/posts')
        })
        .catch(function (error) {
            res.status(400).render('main/404')
        })
})


router.post('/delete', async (req, res) => {
    let post = await db.post.findOne({ where: { id: req.body.postId } }).catch(e => console.log(e.message))
    if (!post) console.log("post not found", req.body.postId)
    else post.destroy()
    res.redirect('/post/posts')
})

module.exports = router;