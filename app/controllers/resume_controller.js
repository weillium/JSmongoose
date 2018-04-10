var Resume = require('../models/resume');

// .then -> do this after successfully executing the previous function
// .catch -> catches exceptions, and returns error depending on what was caught
// req -> http request
// res -> http response
// body -> body of the http request (where the title, content, email, etc. live)
// params -> parameters tied to http request, assigned by MongoDB (resumeId, etc.)

// create and save a new resume
exports.create = (req, res) => {
    if (!req.body.title || !req.body.content) {
        return res.status(400).send({
            message: "please fill out all fields"
        });
    }

    const resume = new Resume({
        title: req.body.title,
        content: req.body.content,
        email: req.body.email
    });

    resume.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "an error occurred on creation"
        });
    });
};

// retrieve and return all resumes
exports.findAll = (req, res) => {
    Resume.find()
    .then(resumes => {
        res.send(resumes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "an error occurred on retrieval"
        });
    });
};

// find a single resume with resumeId
exports.findOne = (req, res) => {
    Resume.findById(req.params.resumeId)
    .then(resume => {
        if(!resume) {
            return res.status(404).send({
                message: "resume not found with id " + req.params.resumeId
            });
        }
        res.send(resume);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "resume not found with id " + req.params.resumeId
            });
        }
        return res.status(500).send({
            message: "an error occurred on search"
        });
    });
};

// update a resume with resumeId
exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "content cannot be empty"
        });
    }
    if(!req.body.title) {
        return res.status(400).send({
            message: "title cannot be empty"
        });
    }

    Resume.findByIdAndUpdate(req.params.resumeId, {
        title: req.body.title,
        content: req.body.content
    }, {new: true}) // returns modified document to then() instead of original
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "resume not found with id " + req.params.resumeId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "resume not found with id " + req.params.resumeId
            });
        }
        return res.status(500).send({
            message: "an error occurred on update"
        });
    });
};

// delete a resume with resumeId 
exports.delete = (req, res) => {
    Resume.findByIdAndRemove(req.params.resumeId)
    .then(resume => {
        if (!resume) {
            return res.status(404).send({
                message: "resume not found with id " + req.params.resumeId
            });
        }
        res.send({message: "resume deleted"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "resume not found with id " + req.params.resumeId
            });
        }
        return res.status(500).send({
            message: "an error occurred on delete"
        });
    });
};