import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResumePDF from './ResumePDF';

const Dashboard = () => {
  const userId = localStorage.getItem('userId');
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/resume/${userId}`);
        setResume(res.data);
      } catch (err) {
        console.error("Error fetching resume:", err);
        alert("No resume found. Please create one.");
      }
    };

    if (userId) fetchResume();
    else {
      alert("User not logged in");
      window.location.href = "/login";
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };

  if (!resume) return <p style={{ padding: "20px", fontSize: "18px" }}>Loading your resume...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Dashboard</h2>
      <p style={styles.subheading}>Welcome, {resume.personalInfo?.fullName || "User"}</p>

      <ResumePDF resume={resume} />

      <div style={styles.buttonGroup}>
        <a href="/resume" style={styles.link}>
          <button style={{ ...styles.button, backgroundColor: "#4f46e5" }}>Edit Resume</button>
        </a>
        <button onClick={handleLogout} style={{ ...styles.button, backgroundColor: "#dc2626" }}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    background: 'linear-gradient(135deg, #6b21a8, #3b82f6)', // Purple-blue gradient
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#fff'
  },
  heading: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#fff'
  },
  subheading: {
    fontSize: '18px',
    marginBottom: '30px',
    color: '#e5e7eb'
  },
  buttonGroup: {
    marginTop: '40px',
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    transition: 'background-color 0.2s ease'
  },
  link: {
    textDecoration: 'none'
  }
};

export default Dashboard;
