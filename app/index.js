var mongoose    = require('mongoose');
var express     = require('express');

var app         = express();
var User        = require('./schemas/user')

mongoose.connect('mongodb://admin:12345@ds121099.mlab.com:21099/njs-mdb')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // what to do once we've been connected

    // knows to listen for requests from Localhost: 5000
    app.listen(5000, () => {
        console.log("localhost is 5000");
    });
});