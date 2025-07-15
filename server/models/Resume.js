const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    personalInfo: {
        fullName: String,
        email: String,
        phone: String,
        address: String,
        summary: String
    },

    education: [
        {
            institution: String,
            degree: String,
            year: String
        }
    ],

    skills: [String],

    projects: [
        {
            title: String,
            description: String
        }
    ],

    experience: [
        {
            company: String,
            position: String,
            duration: String,
            details: String
        }
    ]
});

module.exports = mongoose.model('Resume', resumeSchema);