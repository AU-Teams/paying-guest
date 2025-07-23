import './Login.css';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter both username and password.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
      const data = await res.json();

      if (data.length > 0) {
        const user = data[0];
        localStorage.setItem('token', 'true');
        localStorage.setItem('user', JSON.stringify(user));
        login();
        navigate('/');
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>User Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={loginHandler} className="login-form">
          <label>Username*</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password*</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

          <div className="extra-links">
            <p><Link to="/password">Forgot Password?</Link></p>
            <p>Don't have an account? <Link to="/Signup">Sign-up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
