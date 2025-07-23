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
    username: '',
    photo: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    axios.get(`http://localhost:3000/users/${user.id}`)
      .then(res => {
        setProfile(res.data);
        setFormData({
          name: res.data.name || '',
          username: res.data.username || '',
          photo: res.data.photo || ''
        });
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files.length > 0) {
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
    axios.patch(`http://localhost:3000/users/${profile.id}`, formData)
      .then(res => {
        setProfile(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        setEditMode(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
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
          <label>Username:
            <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
          </label>
          <div className='profile-btn'>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Username:</strong> {profile.username}</p>
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
