const router = require('express').Router();
const { User, Post} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// signup route
router.get('/signup', (req, res) => {
    res.render('signup');
});

// signup
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

// login route
router.get('/login', (req, res) => {
    res.render('login');
});

// login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !user.checkPassword(password)) {
            return res.status(401).send('Invalid username or password');
        }
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

// logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});

// get the dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.userId },
            include: [{ model: User }]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        const user = await User.findByPk(req.params.id);
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// get the new post page
router.get('/newpost', withAuth, async (req, res) => {
    res.render('newpost', {
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
    })
})

// create new post
router.post('/newpost', withAuth, async (req, res) => {
    try {
        const { title, body } = req.body;
        const userId = req.session.userId;

        const post = await Post.create({
            title,
            content: body,
            user_id: userId
        });

        res.redirect(`/dashboard`);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

router.get('/profile/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        const postData = await Post.findAll({
            where: { user_id: userId },
            include: [{ model: User }]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('profile', {
            user,
            posts,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

module.exports = router;
