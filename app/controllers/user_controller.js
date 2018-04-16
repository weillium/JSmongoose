var User = require('../models/user');
var sessionCheck = require('../components/sessionCheck');

// create a new user
exports.create = (req, res) => {
    // check if all fields are filled out
    if (!req.body.email || !req.body.name || !req.body.password || !req.body.passwordConf) {
        req.session.message = "please fill out all fields";
        req.session.error = 400;
        res.redirect('/register');
    }

    // check if passwords match
    if (req.body.password !== req.body.passwordConf) {
        req.session.message = "passwords don't match";
        req.session.error = 400;
        res.redirect('/register');
    }

    // create a new user object with request params
    var newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    });

    // save user data to database
    newUser.save()
    .then(data => {
        req.session.userId = data._id; // store userId into session data
        req.session.message = "successful registration";
        res.redirect('/profile');
    }).catch(err => {
        req.session.message = "error occurred on registration";
        req.session.error = 500;
        res.redirect('/register');
    });
}

// login a user
exports.login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        req.session.message = "please fill out all fields";
        req.session.error = 400;
        res.redirect('/login');
    }
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            req.session.message = "user not found";
            req.session.error = 404;
            res.redirect('/login');
        }

        User.authenticate(req.body.password, user.password)
        .then(result => {
            if (result === true) {
                req.session.userId = user._id; // store userId into session data
                res.redirect('/profile');
            } else {
                req.session.message = "wrong email or password";
                req.session.error = 401;
                res.redirect('/login');
            }
        }).catch(err => {
            req.session.message = "error authenticating user";
            req.session.error = 500;
            res.redirect('/login');
        });

    }).catch(err => {
        req.session.message = "error on login";
        req.session.error = 500;
        res.redirect('/login');
    });
}

// access user profile
exports.profile = (req, res) => {
    sessionCheck.sessionCheck;
    res.render("profile.ejs", {
        user : req.session.user, // get user out of session and pass to profile template
        message: req.session.message,
        error: req.session.error
    })
}

// logout user
exports.logout = (req, res) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
          if (err) {
            req.session.message = 'error on logout'
            req.session.error = 500;
            res.redirect('/profile')
          } else {
            req.session.message = 'successfully logged out'
            res.redirect('/');
          }
        });
    }
}