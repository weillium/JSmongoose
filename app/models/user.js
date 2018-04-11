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

// runs this before creating a new model with the UserSchema
UserSchema.pre('save', function(next) {
    var user = this;

    // has password if its modified or is new
    if (!user.isModified('password')) {
        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) 
        }
    }
})

// use defined schema to create User model
module.exports = mongoose.model('User', UserSchema)