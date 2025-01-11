import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ResumeBuild from './components/ResumeBuild/ResumeBuild';
import ResumePreview from "./components/ResumePreview/ResumePreview";
import About from "./components/About/About";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resumebuild" element={<ResumeBuild />} />
        <Route path='/about' element={<><About /></>} />
        <Route path="/preview" element={<ResumePreview />} />
      </Routes>
    </Router>
  );
}

export default App;
