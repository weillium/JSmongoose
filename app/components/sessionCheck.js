var User = require('../models/user');

exports.sessionCheck = (req, res) => {
    if (req.session && req.session.userId) {
        User.findById(req.session.userId)
        .then(user => {
            if (user === null)  {
                req.session.error = 'not authorized'
                res.redirect('/');
            } else {
                req.user = user;
                delete req.user.password;
                req.session.user = user;
                next();
            }
        }).catch(err => {
            req.session.error = 'not authorized'
            res.redirect('/');
        });
    }
}