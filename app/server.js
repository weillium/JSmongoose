var mongoose        = require('mongoose');
var express         = require('express');
var bodyParser      = require('body-parser');
var session         = require('express-session');

var database        = require('./config/database');

var app             = express();
mongoose.Promise    = global.Promise

// run middlewares with access to request and response objects
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setup express session (session store is place where session data is being stored on server, normally a cookie in client browser)
app.use(session({
    secret: 'kevinandkarlaresluts', // session secret
    resave: false, // resave forces save to session store even without modification
    saveUninitialized: false // forces uninitialized session to be saved to session store
}));

mongoose.connect(database.url)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // what to do once we've been connected

    require('./routes/routes')(app);
    require('./routes/user_routes')(app);

    // knows to listen for requests from Localhost: 5000
    app.listen(5000, () => {
        console.log("localhost is 5000");
    });
});