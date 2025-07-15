import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

const ResumePDF = ({ resume }) => {
    const resumeRef = useRef(null);

    const handleDownload = () => {
        if (!resumeRef.current) {
            console.error("resumeRef is not attached");
            return;
        }

        const element = resumeRef.current;

        const opt = {
            margin: 0.5,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(element).set(opt).save();
    };

    return (
        <div>
            <div ref={resumeRef} style={{ padding: '20px', backgroundColor: 'white', color: 'black' }}>
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

            <br />
            <button onClick={handleDownload}>Download as PDF</button>
        </div>
    );
};

export default ResumePDF;