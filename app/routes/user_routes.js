module.exports = (app) => {
    var users = require('../controllers/user_controller')

    // user register
    app.post('/register', users.create);

    // user login
    app.post('/login', users.login);

    // user profile
    app.get('/profile', users.profile);

    // user logout
    //app.get('/logout', users.logout);

    /*function isLoggedIn(req, res, next) {
        // check if authenticated
        if (req.isAuthenticated())
            return next();
        
            // redirect to homepage
            res.redirect('/');
    }*/
}