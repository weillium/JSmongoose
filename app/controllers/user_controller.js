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
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error occurred on registration"
        });
    });
};

// login a user
exports.login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "please fill out all fields"
        });
    }

    User.findOne({ email: req.body.email })
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with email" + req.body.email
            })
        }
        User.authenticate(req.body.password, user.password, user)
        .then(user => {
            req.session.userId = user._id;
            res.send(user);
            // return res.redirect('/profile');
        }).catch(err => {
            res.status(500).send({
                message: err.message || "an error occurred on login"
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "an error occurred while finding user"
        });
    });
}