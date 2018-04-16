module.exports = (app) => {
    var users = require('../controllers/user_controller')

    // user register
    app.post('/register', users.create);

    // render user registration page
    app.get('/register', function (err, res) {
        if (!req.session) {
            res.render('register.ejs');
        }
    });

    // user login
    app.post('/login', users.login);

    // render user login page
    app.get('/login', function (err, res) {
        res.render('login.ejs', {
            message: req.session.message,
            error: req.session.error
        })
    });

    // user profile
    app.get('/profile', users.profile);

    // user logout
    app.get('/logout', users.logout);

}