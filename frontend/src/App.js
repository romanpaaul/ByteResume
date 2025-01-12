import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ResumeBuild from './components/ResumeBuild/ResumeBuild';
import ResumePreview from "./components/ResumePreview/ResumePreview";
import { UserProvider } from './components/context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProteectedRoute';
import UserProfile from './components/UserProfile/UserProfile';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
          
          {/* Protected Routes */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/resumebuild" 
            element={
              <ProtectedRoute>
                <ResumeBuild />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/preview" 
            element={
              <ProtectedRoute>
                <ResumePreview />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
