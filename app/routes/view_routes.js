module.exports = (app) => {
    // render index page
    app.get('/', function(err, res) {
        res.render('index.ejs');
    });

    // render login page
    app.get('/login', function(err, res) {
        res.render('login.ejs');
    });

    // render registration page
    app.get('/register', function(err, res) {
        res.render('register.ejs');
    });

    // render create resume page
    app.get('/resumes/new', function(err, res) {
        res.render('resumeNew.ejs');
    });
}