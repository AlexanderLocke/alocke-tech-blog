const router = require('express').Router();
const { Post, User } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }]
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
