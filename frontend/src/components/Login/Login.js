import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful! Welcome, ' + data.user.username);
        setUser(data.user);

        // Salvează userId în localStorage
        localStorage.setItem('userId', data.user.id);

        // Navighează la pagina "home"
        navigate('/home');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>welcome back!</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
          <p>
            Forgot your password? <Link to="/reset-password">Reset it here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
