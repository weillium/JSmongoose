var mongoose        = require('mongoose');
var express         = require('express');
var bodyParser      = require('body-parser');
var database        = require('./config/database');
var userRoutes      = require('./routes/resume_routes');

var app             = express();
mongoose.Promise    = global.Promise

// run middlewares with access to request and response objects
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(database.url)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // what to do once we've been connected
    app.get('/', (req, res) => {
        res.json({"message": "TEST TEST TEST"});
    });

    require('./routes/resume_routes')(app);

    // knows to listen for requests from Localhost: 5000
    app.listen(5000, () => {
        console.log("localhost is 5000");
    });
});