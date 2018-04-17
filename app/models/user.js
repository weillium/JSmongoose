var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// skeleton for User model
var UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// define function for authenticating a user
UserSchema.statics.authenticate = function (password, userPassword) {
    return bcrypt.compare(password, userPassword);
};

// define function for making a user an admin
UserSchema.statics.makeAdmin = function (user) {
    user.admin = true;
    console.log("user is now an admin");
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

module.exports = mongoose.model('User', UserSchema)