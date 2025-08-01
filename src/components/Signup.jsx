import './Signup.css'
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const { name, username, email, password, confirmPassword } = formData;

    if (!name || !username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:3000/users', {
        name,
        username,
        email,
        password
      });
      alert('Registration successful!');
      setFormData({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label>Name*</label>
        <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Your Name" />
        <label>Username*</label>
        <input name="username" value={formData.username} onChange={handleChange} type="text" placeholder="Username" />
        <label>Email*</label>
        <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email Address" />
        <label>Password*</label>
        <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" />
        <label>Confirm Password*</label>
        <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" placeholder="Confirm Password" />
        <button type="submit">Register</button>
        <p>Already a user? <Link to="/login">Login</Link></p>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Signup;
