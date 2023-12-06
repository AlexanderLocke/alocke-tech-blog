const router = require('express').Router();
const { User, Post } = require('../../models');

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

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.create({
            username,
            password,
        });
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

module.exports = router;
