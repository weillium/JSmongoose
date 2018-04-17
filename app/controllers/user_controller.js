var User = require('../models/user');
var Resume = require('../models/resume');

// register a new user
exports.register = (req, res) => {
    // check if all fields are filled out
    if (!req.body.email || !req.body.password || !req.body.passwordConf) {
        req.session.message = "please fill out all fields";
        req.session.error = 400;
    }
    
    // check if passwords match
    if (req.body.password !== req.body.passwordConf) {
        req.session.message = "passwords don't match";
        req.session.error = 400;
        res.redirect('/register');
    }
    
    // create a new User object
    var newUser = new User({
        email: req.body.email,
        password: req.body.password
    })
    
    // save User object to database
    newUser.save()
    .then(user => {
        req.session.user = user;
        req.session.message = null;
        res.redirect('/profile');
    }).catch(err => { // handle errors that occur on save
        res.redirect('/register');
    });
}

// login a user
exports.login = (req, res) => {
    // check if all fields are filled in
    if (!req.body.email || !req.body.password) {
        req.session.message = "please fill out all fields";
        req.session.error = 400;
    }

    // query User object from database
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) { // handle case where User object with request email can't be found
            req.session.message = "user not found";
            req.session.error = 404;
        }

        // authenticate entered password against password in database
        User.authenticate(req.body.password, user.password)
        .then(result => {
            if (result === true) {
                req.session.user = user; // store user in session
                req.session.message = null;
                res.redirect('/profile');
            } else {
                req.session.message = "wrong email or password"; // error from passwords not matching
                req.session.error = 401;
                res.redirect('/login');
            }
        }).catch(err => {
            res.redirect('/login');
        });
    }).catch(err => {
        res.redirect('/login');
    })
}

// access user profile
exports.profile = (req, res) => {
    user = req.session.user;
    if (user === null) {
        req.session.message = "not authorized";
        req.session.error = 400;
        res.redirect('/');
    } else {

        // find all resumes tagged with user_id
        Resume.find()
        .then(resumes => {
            if(!resumes) {
                req.session.message = "no resumes found";
                req.session.error = 404;
            }
            req.session.resumes = resumes;
        }).catch(err => {
            req.session.message = "error occurred on resume retrieval";
            req.session.error = 500;
        });

        res.render("profile.ejs", {
            user: user,
            session: req.session
        });
    }
};

// logout a user
exports.logout = (req, res) => {
    if (req.session) {
        req.session.destroy(function (err, res) {
            if (err) {
                req.session.message = "error on logout";
                req.session.error = 500;
                res.redirect('/profile');
            } 
        });
        res.redirect('/');
    }
};