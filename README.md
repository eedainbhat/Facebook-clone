# Social Media App

A full-stack social media application with a React + Vite frontend and an Express/MongoDB backend.

## Project Structure

- `facebook-backend/` - Backend API server
  - `server.js` - Entry point for the backend server
  - `src/` - Application logic, controllers, routes, models, services, and middleware
  - `public/` - Static frontend assets or upload file access
  - `uploads/` - Uploaded images/files
- `facebook-frontend/` - React frontend built with Vite
  - `src/` - React components, pages, context providers, and service utilities
  - `index.html` - Application shell
  - `vite.config.js` - Vite configuration

## Features

- User authentication and authorization
- Profile pages, settings, and security management
- Post creation, comments, and interaction support
- Image/file uploads and file handling
- Responsive React UI with a modular component structure

## Technologies

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, Vite, Tailwind CSS
- Auth: JSON Web Tokens, bcryptjs
- File uploads: Multer
- HTTP client: Axios
- Validation: express-validator
