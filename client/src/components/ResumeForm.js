import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResumeForm = () => {
  const [userId] = useState(localStorage.getItem('userId') || '');

  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '', email: '', phone: '', address: '', summary: ''
    },
    education: [{ institution: '', degree: '', year: '' }],
    skills: [''],
    projects: [{ title: '', description: '' }],
    experience: [{ company: '', position: '', duration: '', details: '' }]
  });

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/resume/${userId}`);
        if (res.data) {
          setFormData({
            personalInfo: res.data.personalInfo || { fullName: '', email: '', phone: '', address: '', summary: '' },
            education: res.data.education?.length ? res.data.education : [{ institution: '', degree: '', year: '' }],
            skills: res.data.skills?.length ? res.data.skills : [''],
            projects: res.data.projects?.length ? res.data.projects : [{ title: '', description: '' }],
            experience: res.data.experience?.length ? res.data.experience : [{ company: '', position: '', duration: '', details: '' }]
          });
        }
      } catch (err) {
        console.log("No existing resume found. Starting with empty form.");
      }
    };

    if (userId) fetchResume();
  }, [userId]);

  const handleChange = (section, index, key, value) => {
    const updated = [...formData[section]];
    updated[index][key] = value;
    setFormData({ ...formData, [section]: updated });
  };

  const handlePersonalChange = (key, value) => {
    setFormData({ ...formData, personalInfo: { ...formData.personalInfo, [key]: value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/api/resume/update', {
        userId,
        ...formData
      });
      alert(res.data.message);
    } catch (err) {
      alert('Failed to save resume');
    }
  };

  const addEntry = (section, defaultData) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], defaultData]
    }));
  };

  const removeEntry = (section, index) => {
    const updated = [...formData[section]];
    updated.splice(index, 1);
    setFormData({ ...formData, [section]: updated });
  };


  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create or Edit Your Resume</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Personal Info */}
        <section style={styles.section}>
          <h3 style={styles.subHeading}>Personal Information</h3>
          {['fullName', 'email', 'phone', 'address'].map((field, i) => (
            <input
              key={i}
              type='text'
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData.personalInfo[field]}
              onChange={(e) => handlePersonalChange(field, e.target.value)}
              style={styles.input}
            />
          ))}
          <textarea
            placeholder='Summary'
            value={formData.personalInfo.summary}
            onChange={(e) => handlePersonalChange('summary', e.target.value)}
            style={styles.textarea}
          />
        </section>

        {/* Education */}
        <section style={styles.section}>
          <h3 style={styles.subHeading}>Education</h3>

          {formData.education.map((edu, i) => (
            <div key={i} style={styles.entryContainer}>
              <input
                type='text'
                placeholder='Institution'
                value={edu.institution}
                onChange={(e) => handleChange('education', i, 'institution', e.target.value)}
                style={styles.input}
              />
              <input
                type='text'
                placeholder='Degree'
                value={edu.degree}
                onChange={(e) => handleChange('education', i, 'degree', e.target.value)}
                style={styles.input}
              />
              <input
                type='text'
                placeholder='Year'
                value={edu.year}
                onChange={(e) => handleChange('education', i, 'year', e.target.value)}
                style={styles.input}
              />

              {formData.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntry('education', i)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => addEntry('education', { institution: '', degree: '', year: '' })}
            style={styles.addButton}
          >
            + Add Education
          </button>
        </section>


        {/* Skills */}
        <section style={styles.section}>
          <h3 style={styles.subHeading}>Skills (comma-separated)</h3>
          <input
            type='text'
            placeholder='e.g., JavaScript, MongoDB, React'
            value={formData.skills.join(',')}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',') })}
            style={styles.input}
          />
        </section>

        {/* Projects */}
        <section style={styles.section}>
          <h3 style={styles.subHeading}>Projects</h3>

          {formData.projects.map((proj, i) => (
            <div key={i} style={styles.entryContainer}>
              <input
                type='text'
                placeholder='Project Title'
                value={proj.title}
                onChange={(e) => handleChange('projects', i, 'title', e.target.value)}
                style={styles.input}
              />
              <textarea
                placeholder='Project Description'
                value={proj.description}
                onChange={(e) => handleChange('projects', i, 'description', e.target.value)}
                style={styles.textarea}
              />

              {formData.projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntry('projects', i)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => addEntry('projects', { title: '', description: '' })}
            style={styles.addButton}
          >
            + Add Project
          </button>
        </section>


        {/* Experience */}
        <section style={styles.section}>
          <h3 style={styles.subHeading}>Experience</h3>

          {formData.experience.map((exp, i) => (
            <div key={i} style={styles.entryContainer}>
              <input
                type='text'
                placeholder='Company'
                value={exp.company}
                onChange={(e) => handleChange('experience', i, 'company', e.target.value)}
                style={styles.input}
              />
              <input
                type='text'
                placeholder='Position'
                value={exp.position}
                onChange={(e) => handleChange('experience', i, 'position', e.target.value)}
                style={styles.input}
              />
              <input
                type='text'
                placeholder='Duration'
                value={exp.duration}
                onChange={(e) => handleChange('experience', i, 'duration', e.target.value)}
                style={styles.input}
              />
              <textarea
                placeholder='Details'
                value={exp.details}
                onChange={(e) => handleChange('experience', i, 'details', e.target.value)}
                style={styles.textarea}
              />

              {formData.experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntry('experience', i)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => addEntry('experience', { company: '', position: '', duration: '', details: '' })}
            style={styles.addButton}
          >
            + Add Experience
          </button>
        </section>
        <button type='submit' style={styles.button}>Save Resume</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    background: 'linear-gradient(135deg, #6b21a8, #3b82f6)',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#fff'
  },
  heading: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '30px',
    textAlign: 'center'
  },
  form: {
    background: 'white',
    color: '#111827',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    maxWidth: '800px',
    margin: '0 auto'
  },
  section: {
    marginBottom: '30px'
  },
  subHeading: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '10px'
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '12px',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px'
  },
  textarea: {
    display: 'block',
    width: '100%',
    padding: '12px',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
    resize: 'vertical',
    minHeight: '100px'
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'block',
    margin: '0 auto',
    marginTop: '20px'
  },
  addButton: {
    padding: '8px 14px',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    marginTop: '10px',
    cursor: 'pointer'
  },
  removeButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    marginTop: '5px',
    marginBottom: '15px',
    cursor: 'pointer'
  }

};

export default ResumeForm;
