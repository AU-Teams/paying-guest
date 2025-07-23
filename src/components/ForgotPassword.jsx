import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import './ForgotPassword.css';

function ForgotPassword() {
  const { update } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userFound, setUserFound] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Step 1: Check if user exists
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (email.trim() === '') {
      setError('Please enter your email.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/users?email=${email}`);
      const data = await res.json();

      if (data.length > 0) {
        setUserFound(true); // Show password form
        setMessage('User found. Enter new password below.');
      } else {
        setError('User not found.');
      }
    } catch (err) {
      setError('Something went wrong while checking the user.');
    }
  };

  // Step 2: Submit new password
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword.trim().length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      // Get user by email again
      const res = await fetch(`http://localhost:3000/users?email=${email}`);
      const data = await res.json();
      const user = data[0];

      // Update password
      const updateRes = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (updateRes.ok) {
        setMessage('Password updated successfully. Please log in.');
        setUserFound(false);
        setEmail('');
        setNewPassword('');
      } else {
        setError('Failed to update password.');
      }
    } catch (err) {
      setError('Something went wrong while updating the password.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>

      {!userFound ? (
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Verify Email</button>
        </form>
      ) : (
        <form onSubmit={handlePasswordUpdate}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit">Update Password</button>
        </form>
      )}

      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default ForgotPassword;
