module.exports = (app) => {
    // index
    app.get('/', function (err, res) {
        res.render('index.ejs', {
            user: req.session.user,
            message: req.session.message,
            error: req.session.error
        })
    })
};