import React from "react";

const LivePreview = ({ resume }) => {
    return (
    <div style={styles.preview}>
        <h2>{resume.personalInfo?.fullName}</h2>
        <p><strong>Email:</strong> {resume.personalInfo?.email}</p>
        <p><strong>Phone:</strong> {resume.personalInfo?.phone}</p>
        <p><strong>Address:</strong> {resume.personalInfo?.address}</p>
        <p><strong>Summary:</strong> {resume.personalInfo?.summary}</p>

        <h3>Education</h3>
        {resume.education?.map((edu, i) => (
            <p key={i}>{edu.degree} at {edu.institution} ({edu.year})</p>
        ))}

        <h3>Skills</h3>
        <ul>
            {resume.skills?.map((skill, i) => <li key={i}>{skill}</li>)}
        </ul>

        <h3>Projects</h3>
        {resume.projects?.map((proj, i) => (
            <div key={i}>
                <strong>{proj.title}</strong>
                <p>{proj.description}</p>
            </div>
        ))}

        <h3>Experience</h3>
        {resume.experience?.map((exp, i) => (
            <div key={i}>
                <strong>{exp.position}</strong> at {exp.company} ({exp.duration})
                <p>{exp.details}</p>
            </div>
        ))}
    </div>
);
};

const styles = {
    preview: {
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        color: '#111',
        maxHeight: '80vh',
        overflowY: 'auto',
        fontFamily: 'Segoe UI, sans-serif'
    }
};

export default LivePreview;