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
UserSchema.statics.authenticate = function (password, userPassword, user) {
    bcrypt.compare(password, user.password)
    .then(result => {
        if(result === false) {
            return new Errorstatus(401).send({
                message: "wrong email or password"
            })
        } else {
            return user;
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "an error occurred on authentication"
        });
    });
}

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