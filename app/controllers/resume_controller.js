var Resume = require('../models/resume');

// create a new resume
exports.new = (req, res) => {
    // check if all fields are filled out
    if (!req.body.content) {
        req.session.message = "please fill out all fields";
        req.session.error = 400;
    }

    if (!req.body.title) {
        var resume = new Resume({
            content: req.body.content,
            email: req.session.user.email
        });
    } else {
        var resume = new Resume({
            title: req.body.title,
            content: req.body.content,
            email: req.session.user.email
        });
    }

    resume.save()
    .then(resume => {
        req.session.message = "new resume created";
        res.redirect('/profile');
    }).catch(err => {
        res.redirect('/resume/new');
    });
};