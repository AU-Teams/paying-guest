import React, { useState, useEffect } from 'react';
import './AddTenants.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateTenants = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [rent, setRent] = useState('');
  const [roomtype, setRoomType] = useState('');
  const [photo, setPhoto] = useState('');
  const [address, setAddress] = useState('');
  const [originalData, setOriginalData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/content/${id}`)
      .then((res) => {
        const data = res.data;
        setOriginalData(data); // Save original data to compare later
        setName(data.name);
        setRoom(data.room);
        setRent(data.rent);
        setRoomType(data.roomtype);
        setPhoto(data.photo || '');
        setAddress(data.address);
      })
      .catch((err) => {
        console.log('Error fetching data:', err);
      });
  }, [id]);

  const nameHandler = (e) => setName(e.target.value);
  const roomHandler = (e) => setRoom(e.target.value);
  const rentHandler = (e) => setRent(e.target.value);
  const roomtypeHandler = (e) => setRoomType(e.target.value);
  const addressHandler = (e) => setAddress(e.target.value);

  const photoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateHandler = (e) => {
    e.preventDefault();

    const payload = { name, room, rent, roomtype, photo, address };

    // Check if any data changed
    const isChanged = Object.keys(payload).some(
      (key) => payload[key] !== originalData[key]
    );

    if (!isChanged) {
      alert('No changes made.');
      return;
    }

    axios.put(`http://localhost:3000/content/${id}`, payload)
      .then(() => {
        alert('Tenant updated successfully!');
        navigate('/alltenants');
      })
      .catch((err) => {
        console.log('Error updating tenant:', err);
      });
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    navigate('/alltenants');
  };

  return (
    <div className='Add-Tenants'>
      <h2>Update Tenant</h2>
      <form onSubmit={updateHandler}>
        <label>Name*</label>
        <input type="text" value={name} onChange={nameHandler} placeholder="Update Tenant Name" required />

        <label>Room Number*</label>
        <input type="number" value={room} onChange={roomHandler} placeholder="Update Tenant Room number" required />

        <label>Room Rent*</label>
        <select value={rent} onChange={rentHandler} required>
          <option value="">-- Select Rent --</option>
          <option value="Unpaid">Unpaid</option>
          <option value="10000">10,000</option>
          <option value="8000">8000</option>
          <option value="7000">7000</option>
          <option value="6000">6000</option>
        </select>

        <label>Room Type*</label>
        <select value={roomtype} onChange={roomtypeHandler} required>
          <option value="">-- Select Room Type --</option>
          <option value="Fan">Fan</option>
          <option value="Non-AC">Non-AC</option>
          <option value="AC">AC</option>
        </select>

        <label>Photo</label>
        <input type="file" name="photo" className="choose-pic" onChange={photoHandler} />

        <label>Address*</label>
        <input type="text" value={address} onChange={addressHandler} placeholder="Update Tenant Address" />

        <div className="form-buttons" style={{display: 'flex', justifyContent: 'space-around'}}>
          <button type="submit" style={{padding: '10px 40px'}}>Update</button>
          <button style={{padding: '10px 40px'}} onClick={cancelHandler}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTenants;
