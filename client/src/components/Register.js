// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Box, TextField, Typography, Button, Paper
} from '@mui/material';
import { motion } from 'framer-motion';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      alert(res.data.message);
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #3a0ca3, #7209b7, #4361ee)',
        color: '#fff',
        px: 2
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography variant="h4" align="center" gutterBottom sx={{ color: '#3a0ca3', fontWeight: 600 }}>
              Create a New Account
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                name="name"
                label="Full Name"
                variant="outlined"
                margin="normal"
                required
                onChange={handleChange}
              />
              <TextField
                fullWidth
                type="email"
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
                required
                onChange={handleChange}
              />
              <TextField
                fullWidth
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                margin="normal"
                required
                onChange={handleChange}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.5,
                  backgroundColor: '#7C3AED',
                  '&:hover': { backgroundColor: '#6D28D9' }
                }}
                type="submit"
              >
                Register
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Register;
