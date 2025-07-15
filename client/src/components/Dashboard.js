import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResumePDF from './ResumePDF';

const handleLogout = () => {
    localStorage.removeItem('userId');
    window.location.href = '/login';
};

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

  if (!resume) {
    return <p>Loading your resume...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard - Your Resume</h2>

      {/* Display + PDF Export */}
      <ResumePDF resume={resume} />

      <br />
      <a href="/resume">
        <button>Edit Resume</button>
      </a>
      <button onClick={handleLogout} style={{ marginTop: "20px", backgroundColor: "red", color: "white", marginLeft: "50px" }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
