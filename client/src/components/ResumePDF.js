import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

const ResumePDF = ({ resume }) => {
  const resumeRef = useRef(null);

  const handleDownload = () => {
    if (!resumeRef.current) {
      console.error("resumeRef is not attached");
      return;
    }

    const opt = {
      margin: 0.5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(resumeRef.current).set(opt).save();
  };

  return (
    <div>
      <div ref={resumeRef} style={styles.container}>
        <h1 style={styles.name}>{resume.personalInfo?.fullName}</h1>
        <p style={styles.contact}>
          {resume.personalInfo?.email} | {resume.personalInfo?.phone} | {resume.personalInfo?.address}
        </p>

        <section style={styles.section}>
          <h2 style={styles.heading}>Professional Summary</h2>
          <p>{resume.personalInfo?.summary}</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>Experience</h2>
          {resume.experience?.map((exp, i) => (
            <div key={i}>
              <strong>{exp.position}</strong>, {exp.company} ({exp.duration})
              <p>{exp.details}</p>
            </div>
          ))}
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>Education</h2>
          {resume.education?.map((edu, i) => (
            <p key={i}>{edu.degree} - {edu.institution} ({edu.year})</p>
          ))}
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>Skills</h2>
          <ul style={styles.list}>
            {resume.skills?.map((skill, i) => (
              <li key={i}>{skill.trim()}</li>
            ))}
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>Projects</h2>
          {resume.projects?.map((proj, i) => (
            <div key={i}>
              <strong>{proj.title}</strong>
              <p>{proj.description}</p>
            </div>
          ))}
        </section>
      </div>

      <br />
      <button onClick={handleDownload} style={styles.downloadBtn}>Download as PDF</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'white',
    color: '#111',
    lineHeight: '1.6',
    maxWidth: '800px',
    margin: '0 auto',
    border: '1px solid #ccc'
  },
  name: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  contact: {
    fontSize: '14px',
    marginBottom: '20px'
  },
  section: {
    marginBottom: '20px'
  },
  heading: {
    fontSize: '18px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '4px',
    marginBottom: '10px'
  },
  list: {
    paddingLeft: '20px'
  },
  downloadBtn: {
    padding: '10px 20px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default ResumePDF;
