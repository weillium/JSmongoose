var mongoose = require('mongoose');

// skeleton for Resume model
var ResumeSchema = mongoose.Schema({
    title: {
        type: String,
        default: "Untitled Resume"
    },
    content: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        default: ""
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Resume', ResumeSchema);