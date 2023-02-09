
const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// TODO - create a POST route for creating a new post
// This should be a protected route, so you'll need to use the withAuth middleware
router.post('/', withAuth, async (req,res)=> {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            body: req.body.body,
            userId: req.session.userId,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// TODO - create a PUT route for updating a post's title or body
// This should be a protected route, so you'll need to use the withAuth middleware
router.put('/update/:id', withAuth, async (req,res) => {
    try {
        const updatePost = await Post.update({
            title: req.body.title,
            body: req.body.body,
        },
        {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(updatePost);
    } catch (err) {
        res.status(500).json(err);
    }

});


// TODO - create a DELETE route for deleting a post with a specific id
// This should be a protected route, so you'll need to use the withAuth middleware
router.delete('/delete/:id', withAuth, async (req,res) => {
    try {
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(deletePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
