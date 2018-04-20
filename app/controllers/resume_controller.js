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

exports.details = (req, res) => {
    Resume.findById(req.params.resumeId)
    .then(resume => {
        if(!resume) {
            req.session.message = "resume not found"
            req.session.error = 404;
        } else {
            res.render("detailResume.ejs", {
                resume: resume,
                session: req.session
            });
        }
    }).catch(err => {
        req.session.message = "error rendering page"
        req.session.error = 500;
    })
};

exports.edit = (req, res) => {
    var title = '';
    var content = '';

    // check if there's a need to query original resume
    if (!req.body.title || !req.body.content) {
        Resume.findById(req.params.resumeId)
        .then(resume => {
            if(!resume) {
                req.session.message = "resume not found"
                req.session.error = 404;
            } else {
                title = resume.title;
                content = resume.content;
            }
        }).catch(err => {
            req.session.message = "error on search"
            req.session.error = 500;
        });
    }

    // check if new title was entered
    if (req.body.title) {
        title = req.body.title;
    }
    
    // check if new content was entered
    if (req.body.content) {
        content = req.body.content;
    }

    // update resume with this resumeId
    Resume.findByIdAndUpdate(req.params.resumeId, {
        title: title,
        content: content
    }, {new: true})
    .then(resume => {
        if (!resume) {
            req.session.message = "resume not found"
            req.session.error = 404;
        }
        res.redirect('/profile');
    }).catch(err => {
        req.session.message = "error occurred on update"
        req.session.error = 404;
        res.redirect('/profile');
    });
};

exports.delete = (req, res) => {
    Resume.findByIdAndRemove(req.params.resumeId)
    .then(resume => {
        if (!resume) {
            req.session.message = "resume not found";
            req.session.error = 404;
        } else {
            req.session.message = "resume deleted";
        }
        res.redirect('/profile');
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            req.session.message = "resume not found";
            req.session.error = 404;
        } else {
            req.session.message = "error occurred on delete"
            req.session.error = 500;
        }
        res.redirect('/profile');
    })
}