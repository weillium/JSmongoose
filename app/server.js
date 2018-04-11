var mongoose        = require('mongoose');
var express         = require('express');
var bodyParser      = require('body-parser');
var database        = require('./config/database');
var userRoutes      = require('./routes/resume_routes');

var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var flash           = require('connect-flash');
var passport        = require('passport')

var app             = express();
mongoose.Promise    = global.Promise

// connect server
mongoose.connect(database.url)

// express setup
app.use(morgan('dev')); // log every request to console
app.use(cookieParser()); // read cookies (needed for authorization)

// required for passport
app.use(session({ secret: 'karlandkevinaresluts' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine', 'ejs');

// run middlewares with access to request and response objects
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // what to do once we've been connected
    app.get('/', (req, res) => {
        res.json({"message": "TEST TEST TEST"});
    });

    // require('./config/passport')(passport); // pass passport for configuration
    require('./routes/routes')(app, passport); // load routes and pass in app + passport

    require('./routes/resume_routes')(app);

    // knows to listen for requests from Localhost: 5000
    app.listen(5000, () => {
        console.log("localhost is 5000");
    });
});