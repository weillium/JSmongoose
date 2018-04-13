var mongoose = require('mongoose');

// skeleton for our Resume model
var ResumeSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        default: 0
    }
}, {
    timestamps: true
});

// use defined schema to create Resume model
module.exports = mongoose.model('Resume', ResumeSchema)