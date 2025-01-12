import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { UserContext } from '../context/UserContext'; // Assuming user context is used for logged-in user data

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext); // Access user and logout function from UserContext

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getBackgroundStyle = () => {
    if (scrollY < 300) {
      return '#ffffff'; // White for Hero
    } else if (scrollY >= 300 && scrollY < 800) {
      return '#eef7ff'; // Light blue for Features
    } else if (scrollY >= 800 && scrollY < 1400) {
      return '#e6fff5'; // Light green for Advantages
    } else {
      return '#f9f9f9'; // Light grey for Steps
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      className="home-container"
      style={{
        background: getBackgroundStyle(),
        transition: 'background-color 0.5s ease-in-out',
      }}
    >
      {/* Navbar */}
      <nav className="home-navbar">
        <div className="logo">ByteResume</div>
        <div className="nav-links">
          <Link to="/faq">FAQ</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="auth-buttons">
          {user ? (
            <>
              <span
                className="user-profile-link"
                onClick={() => navigate('/profile')}
                style={{
                  cursor: 'pointer',
                  marginRight: '1rem',
                  color: '#007bff',
                }}
              >
                {user.username}'s Profile
              </span>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="login-button"
                onClick={() => navigate('/login')}
              >
                Log In
              </button>
              <button
                className="signup-button"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="home-header">
        <h1>Free Online CV Maker</h1>
        <p>Create your professional resume effortlessly.</p>
        <button
          className="cta-button"
          onClick={() => navigate('/resumebuild')}
        >
          Create a CV
        </button>
      </header>

      {/* Features Section */}
      <section className="home-features">
        <div className="feature">
          <span>🖋️</span>
          <p>Easy to create and customize</p>
        </div>
        <div className="feature">
          <span>📋</span>
          <p>Thousands of free templates and layouts</p>
        </div>
        <div className="feature">
          <span>📑</span>
          <p>Professionally designed and formatted</p>
        </div>
        <div className="feature">
          <span>⬇️</span>
          <p>Easily download or share</p>
        </div>
      </section>

      {/* Why ByteResume Section */}
      <section className="home-advantages">
        <h2>Why ByteResume?</h2>
        <div className="advantages-grid">
          <div className="advantage">
            <span>⏱️</span>
            <p>Save time with pre-built templates</p>
          </div>
          <div className="advantage">
            <span>🛠️</span>
            <p>Easy customization for everyone</p>
          </div>
          <div className="advantage">
            <span>📄</span>
            <p>Export resumes in multiple formats</p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="home-steps">
        <h2>Make a job-winning CV in four simple steps</h2>
        <div className="steps-grid">
          <div className="step">
            <img src="https://via.placeholder.com/150" alt="Step 1" />
            <h3>Step 1</h3>
            <p>Pick a template</p>
            <small>Select from 18 professional templates crafted by career experts and designers.</small>
          </div>
          <div className="step">
            <img src="https://via.placeholder.com/150" alt="Step 2" />
            <h3>Step 2</h3>
            <p>Use expert prompts</p>
            <small>Quickly add customized, job-specific content to your resume created by career experts.</small>
          </div>
          <div className="step">
            <img src="https://via.placeholder.com/150" alt="Step 3" />
            <h3>Step 3</h3>
            <p>Play with the design</p>
            <small>Easily adjust colors, fonts, and layout using our intuitive interface.</small>
          </div>
          <div className="step">
            <img src="https://via.placeholder.com/150" alt="Step 4" />
            <h3>Step 4</h3>
            <p>Hit download and enjoy</p>
            <small>Download your polished resume in the preferred file format and apply for your dream job.</small>
          </div>
        </div>
      </section>

      {/* Scroll to Top */}
      {scrollY > 300 && (
        <button
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ⬆️
        </button>
      )}
    </div>
  );
};

export default Home;
