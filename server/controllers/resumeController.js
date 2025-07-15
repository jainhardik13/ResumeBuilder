const Resume = require('../models/Resume');

exports.createResume = async (req, res) => {
    try {
        const resume = new Resume({
            userId: req.body.userId,
            personalInfo: req.body.personalInfo,
            education: req.body.education,
            skills: req.body.skills,
            projects: req.body.projects,
            experience: req.body.experience
        });

        await resume.save();
        res.status(201).json({ message: "Resume saved!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error saving resume" });
    }
};

exports.getResumeByUser = async (req,res) => {
    const userId = req.params.userId;

    try {
        const resume = await Resume.findOne({ userId });
        if (!resume) return res.status(404).json({ message: "Resume not found" });

        res.json(resume);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching resume" });
    }
};

exports.updateResume = async (req,res) => {
    try {
        const updated = await Resume.findOneAndUpdate(
            { userId: req.body.userId},
            {
                personalInfo: req.body.personalInfo,
                education: req.body.education,
                skills: req.body.skills,
                projects: req.body.projects,
                experience: req.body.experience
            },
            { new: true, upsert: true } // Create if not exists
        );

        res.json({ message: 'Resume updated successfully', resume: updated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update resume' });
    }
};