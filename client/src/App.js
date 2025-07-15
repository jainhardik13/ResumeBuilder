import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ResumeForm from './components/ResumeForm';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';

function App() {
  const isAuthenticated = !!localStorage.getItem('userId');

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />
          }
        />

        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <ResumeForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
