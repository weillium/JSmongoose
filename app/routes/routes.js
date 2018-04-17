var User = require('../models/user');
var users = require('../controllers/user_controller');
var resumes = require('../controllers/resume_controller');

module.exports = (app) => {

    // render index page
    app.get('/', function (req, res) {
        if (req.session) {
            res.render('index.ejs', {
                session: req.session
            });
        } else {
            res.render('index.ejs');
        }
    });

    // render registration page
    app.get('/register', function (req, res) {
        if (req.session) {
            res.render('register.ejs', {
                session: req.session
            });
        } else {
            res.render('register.ejs');
        }
    });

    // handle registration POST request
    app.post('/register', users.register);

    // render login page
    app.get('/login', function (req, res) {
        if (req.session) {
            res.render('login.ejs', {
                session: req.session
            });
        } else {
            res.render('login.ejs');
        }
    });

    // handle login POST request
    app.post('/login', users.login);

    // render profile page
    app.get('/profile', users.profile);

    // handle logout GET request
    app.get('/logout', users.logout);

    // render resume creation page
    app.get('/resume/new', function (req, res) {
        if (req.session.user) {
            res.render('newResume.ejs', {
                session: req.session
            });
        } else {
            req.session.message = "not authorized";
            req.session.error = 500;
            res.redirect('/');
        }
    });

    // handle resume creation POST request
    app.post('/resume/new', resumes.new);
};