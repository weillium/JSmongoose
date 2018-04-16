var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

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

// define function for authenticating a user
UserSchema.statics.authenticate = function (password, userPassword) {
    return bcrypt.compare(password, userPassword);
};

// this is done before the user model is created
UserSchema.pre('save', function (next) {
    var user = this;

    // hash the password for secure transfers to and from mongoDB
    bcrypt.hash(user.password, 10, function (err, hash){
        if (err) {
            return next(err);
        }

        // save password as the hash
        user.password = hash;
        next();
    })
});

// use defined schema to create User model
module.exports = mongoose.model('User', UserSchema)