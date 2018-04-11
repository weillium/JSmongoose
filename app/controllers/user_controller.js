var User = require('../models/user');

// create a new user
exports.create = (req, res) => {
    // check if all fields are filled out
    if (!req.body.email || !req.body.password || !req.body.passwordConf) {
        return res.status(400).send({
            message: "please fill out all fields"
        });
    }

    // check if passwords match
    if (req.body.password !== req.body.passwordConf) {
        return res.status(400).send({
            message: "passwords don't match"
        });
    }

    // create a new user object with request params
    var newUser = new User({
        email: req.body.email,
        password: req.body.password
    });

    // save user data to database
    newUser.save()
    .then(data => {
        res.redirect('/profile');
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error occurred on registration"
        });
    });
};

// login a user
exports.login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: "please fill out all fields"
        });
    }
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            res.status(404).send({
                message: "user not found"
            });
        }

        User.authenticate(req.body.password, user.password)
        .then(result => {
            if (result === true) {
                req.session.userId = user._id;
                res.redirect('/profile');
            } else {
                res.status(401).send({
                    message: "wrong email or password"
                });
            }
        }).catch(err => {
            console.log(err);
        });

    }).catch(err => {
        res.status(500).send({
            message: "error on login"
        });
    });
}

// access user profile
exports.profile = (req, res) => {
    User.findById(req.session.userId)
    .then(user => {
        if (user === null)  {
            res.status(400).send({
                message: "not authorized"
            });
        } else {
            res.send("Welcome to Your Profile, " + user.email);
        }
    }).catch(err => {
        res.status(500).send({
            message: "error accessing profile"
        });
    });
}

// logout a user
exports.logout = (req, res) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
          if (err) {
            res.status(500).send({
                message: "error on logout"
            });
          } else {
            res.redirect('/');
          }
        });
    }
}