ResumeBuilder

A full-stack web application to create, edit, and download professional resumes with real-time preview and user authentication.

Features

- User Registration and Login with session-based authentication
- Resume form with multiple sections:
  - Personal Information
  - Education
  - Skills
  - Projects
  - Experience
- Add/Remove entries in Education, Projects, and Experience
- Live resume preview while editing
- Download resume as professionally formatted PDF
- Protected routes (dashboard and resume form accessible only after login)

Tech Stack

- **Frontend**: React.js (with useState, useEffect, conditional rendering, styling)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: LocalStorage-based session handling
- **PDF Export**: html2pdf.js
- **Live Preview**: Real-time reflection of form changes
- **Styling**: Inline styles with purple-blue gradient theme

## How It Works

1. User signs up or logs in.
2. After login, redirected to dashboard.
3. User can create or edit their resume.
4. All data is saved to MongoDB.
5. Resume can be downloaded as a PDF.
6. Logout clears session and redirects to login.

## Project Structure

- `client/` → React frontend
- `server/` → Node.js + Express backend
- `models/` → Mongoose schemas
- `routes/` → API endpoints
- `components/` → React components (Register, Login, ResumeForm, Dashboard, etc.)

## Requirements

- Node.js
- MongoDB (local or cloud)
- npm or yarn

