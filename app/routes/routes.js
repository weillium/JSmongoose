module.exports = function(app, passport) {
    // homepage
    app.get('/', function(req, res) {
        // render homepage
        res.render('index.ejs');
    });

    // login
    app.get('/login', function(req, res) {
        // render page
        res.render('login.ejs', { message: req.flash('loginMessage') }); // flash is connect-flash way for getting flashdata in session
    });

    // signup
    app.get('/signup', function(req, res) {
        // render signup page
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // profile
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user: req.user // get user out of session and pass to template
        });
    });

    // logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to confirm login state
function isLoggedIn(req, res, next) {
    // check if user is authenticated
    if (req.isAuthenticated())
        return next();

    // if not, back to homepage
    res.redirect('/');
}