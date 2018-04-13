var User = require('../models/user');

User.findById(req.session.userId)
    .then(user => {
        if (user === null)  {
            res.status(400).send({
                message: "not authorized"
            });
        } else {
            res.render("profile.ejs", {
                user : user // get user out of session and pass to template
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "error accessing profile"
        });
    });