import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResumeForm = () => {
  const [userId] = useState(localStorage.getItem('userId') || '');

  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      summary: ''
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
            personalInfo: res.data.personalInfo || {
              fullName: '', email: '', phone: '', address: '', summary: ''
            },
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

  return (
    <form onSubmit={handleSubmit}>
      <h2>Personal Information</h2>
      <input type='text' placeholder='Full Name' value={formData.personalInfo.fullName} onChange={(e) => handlePersonalChange('fullName', e.target.value)} />
      <input type='email' placeholder='Email' value={formData.personalInfo.email} onChange={(e) => handlePersonalChange('email', e.target.value)} />
      <input type='text' placeholder='Phone' value={formData.personalInfo.phone} onChange={(e) => handlePersonalChange('phone', e.target.value)} />
      <input type='text' placeholder='Address' value={formData.personalInfo.address} onChange={(e) => handlePersonalChange('address', e.target.value)} />
      <textarea placeholder='Summary' value={formData.personalInfo.summary} onChange={(e) => handlePersonalChange('summary', e.target.value)}></textarea>

      <h2>Education</h2>
      <input type='text' placeholder='Institution' value={formData.education[0].institution} onChange={(e) => handleChange('education', 0, 'institution', e.target.value)} />
      <input type='text' placeholder='Degree' value={formData.education[0].degree} onChange={(e) => handleChange('education', 0, 'degree', e.target.value)} />
      <input type='text' placeholder='Year' value={formData.education[0].year} onChange={(e) => handleChange('education', 0, 'year', e.target.value)} />

      <h2>Skills (comma separated)</h2>
      <input type="text" placeholder='Skills' value={formData.skills.join(',')} onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',') })} />

      <h2>Projects</h2>
      <input type='text' placeholder='Project Title' value={formData.projects[0].title} onChange={(e) => handleChange('projects', 0, 'title', e.target.value)} />
      <textarea placeholder='Project Description' value={formData.projects[0].description} onChange={(e) => handleChange('projects', 0, 'description', e.target.value)}></textarea>

      <h2>Experience</h2>
      <input type='text' placeholder='Company' value={formData.experience[0].company} onChange={(e) => handleChange('experience', 0, 'company', e.target.value)} />
      <input type='text' placeholder='Position' value={formData.experience[0].position} onChange={(e) => handleChange('experience', 0, 'position', e.target.value)} />
      <input type='text' placeholder='Duration' value={formData.experience[0].duration} onChange={(e) => handleChange('experience', 0, 'duration', e.target.value)} />
      <textarea placeholder='Details' value={formData.experience[0].details} onChange={(e) => handleChange('experience', 0, 'details', e.target.value)}></textarea>

      <br />
      <button type='submit'>Save Resume</button>
    </form>
  );
};

export default ResumeForm;
