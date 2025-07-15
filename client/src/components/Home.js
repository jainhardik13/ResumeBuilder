// src/pages/Home.js
import React from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box,
  Container, Grid, Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Build as BuildIcon,
  EditNote as EditNoteIcon,
  Download as DownloadIcon
} from '@mui/icons-material';

const Home = () => {
  const features = [
    {
      icon: <BuildIcon fontSize="large" color="secondary" />,
      title: 'Create',
      description: 'Start building your resume with our user-friendly editor.'
    },
    {
      icon: <EditNoteIcon fontSize="large" color="secondary" />,
      title: 'Edit',
      description: 'Easily update your details, skills and experiences anytime.'
    },
    {
      icon: <DownloadIcon fontSize="large" color="secondary" />,
      title: 'Download',
      description: 'Export a beautiful PDF of your resume instantly.'
    }
  ];

  return (
    <Box sx={{ fontFamily: 'sans-serif' }}>
      {/* Gradient background section */}
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #3a0ca3, #7209b7, #4361ee)',
          color: 'white',
        }}
      >
        {/* Navbar */}
        <AppBar position="static" sx={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              ResumeBuilder
            </Typography>
            <Button color="inherit" href="/login">Login</Button>
            <Button color="inherit" href="/register">Register</Button>
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Box
          sx={{
            py: { xs: 8, md: 12 },
            textAlign: 'center',
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Container>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
              Build a Job-Winning Resume
            </Typography>
            <Typography variant="h6" sx={{ mb: 3 }}>
              It’s free, fast, and easy to use.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#7C3AED',
                px: 4,
                py: 1.5,
                '&:hover': { backgroundColor: '#6D28D9' }
              }}
              size="large"
              href="/login"
            >
              Get Started
            </Button>
          </Container>
        </Box>

        {/* Features Section */}
        <Container sx={{ py: 8 }} component={motion.div} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ staggerChildren: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Paper elevation={4} sx={{
                  p: 4,
                  textAlign: 'center',
                  minHeight: 200,
                  borderRadius: 3,
                  backgroundColor: '#ffffffdd'
                }}>
                  {feature.icon}
                  <Typography variant="h6" sx={{ mt: 2, color: '#3a0ca3' }}>
                    {feature.title}
                  </Typography>
                  <Typography sx={{ mt: 1, color: 'text.secondary' }}>
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Footer */}
        <Box
          sx={{
            bgcolor: 'rgba(0,0,0,0.3)',
            color: 'white',
            py: 4,
            textAlign: 'center'
          }}
          component={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="body1">
            &copy; 2025 ResumeBuilder
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
