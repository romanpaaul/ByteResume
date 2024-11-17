import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login attempted with:', { email, password });
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
