module.exports = (app) => {
    var resumes = require('../controllers/resume_controller')

    // create a resume
    app.post('/resumes', resumes.create);

    // retrieve all resumes
    app.get('/resumes', resumes.findAll);

    // retrieve a single resume with resumeId
    app.get('/resumes/:resumeId', resumes.findOne);

    // update a resume with resumeId
    app.put('/resumes/:resumeId', resumes.update);

    // delete a resume with resumeId
    app.delete('/resumes/:resumeId', resumes.delete);
}