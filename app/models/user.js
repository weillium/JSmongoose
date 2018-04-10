var mongoose = require('mongoose');

// skeleton for our User model
var UserSchema = mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// use defined schema to create User model
module.exports = mongoose.model('User', UserSchema)