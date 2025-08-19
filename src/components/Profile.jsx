import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photo: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    axios.get('http://localhost:5000/api/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setProfile(res.data.user);
        setFormData({
          name: res.data.user.name || '',
          email: res.data.user.email || '',
          photo: res.data.user.photo || ''
        });
      })
      .catch(() => setProfile(null));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    const token = localStorage.getItem('token');
    axios.patch('http://localhost:5000/api/auth/profile', formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setProfile(res.data.user);
        setEditMode(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    logout();
    navigate('/');
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile">
      <h2>{editMode ? 'Update Profile' : 'Your Profile'}</h2>

      <div className="photo-section">
        <img
          src={formData.photo || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="profile-pic"
        />
      </div>

      {editMode ? (
        <>
          <label>Upload Photo:
            <input type="file" name="photo" accept="image/*" onChange={handleInputChange} />
          </label>
          <label>Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </label>
          <label>Email:
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
          </label>
          <div className='profile-btn'>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <div className='profile-btn'>
            <button onClick={() => setEditMode(true)}>Update Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
