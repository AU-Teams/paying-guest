import './AddTenants.css'
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthContext';

const AddTenants = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [rent, setRent] = useState('');
  const [photo, setPhoto] = useState('');
  const [roomtype, setRoomType] = useState('');
  const [address, setAddress] = useState('');

  const { addtenants } = useContext(AuthContext);
  const navigate = useNavigate();

  const nameHandler = (e) => setName(e.target.value);
  const roomHandler = (e) => setRoom(e.target.value);
  const addressHandler = (e) => setAddress(e.target.value);
  const rentHandler = (e) => setRent(e.target.value);
  const roomtypeHandler = (e) => setRoomType(e.target.value);

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

  const btnHandler = (e) => {
    e.preventDefault();

    const payload = { name, room, rent, roomtype, photo, address };

    axios.post('http://localhost:3000/content', payload)
      .then(() => {
        alert('Data saved successfully!');
        setName('');
        setRoom('');
        setRent('');
        setRoomType('');
        setPhoto('');
        setAddress('');
        addtenants();
      })
      .catch((err) => {
        console.log('Error saving data:', err);
      })
      navigate('/alltenants');
  }

  return (
    <div className='Add-Tenants'>
      <h1>Add Tenants</h1>
      <form onSubmit={btnHandler}>
        <label>Name*</label>
        <input type="text" value={name} onChange={nameHandler} placeholder='Enter Tenant Name' required />

        <label>Room Number*</label>
        <input type="number" value={room} onChange={roomHandler} placeholder='Enter Tenant Room number' required />

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
        <input type="file" name="photo" className='choose-pic' onChange={photoHandler} />

        <label>Address*</label>
        <input type="text" value={address} onChange={addressHandler} placeholder='Enter Tenant Address' required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddTenants;
