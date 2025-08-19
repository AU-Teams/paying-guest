import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UpdateTenants from './UpdateTenants';
import './AllTenants.css';

const AllTenants = () => {
  const [tenants, setTenants] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/tenants', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        setTenants(res.data.tenants);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const btnHandler = (id) => {
    axios.delete(`http://localhost:5000/api/tenants/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert("Tenant deleted");
        setTenants((prevTenants) => prevTenants.filter(tenant => tenant._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='All-Tenants'>
      {tenants.map((tenant) => (
        <div className='Tenants-card' key={tenant._id}>
          <div className='header-info'>
            <img src={tenant.photo || 'https://via.placeholder.com/150'} alt="Profile" className="tenant-pic" />  
            <h2>{tenant.name}</h2>
          </div>
          <table>
            <tbody>
              <tr>
                <td>Name :</td>
                <td className='user-data'>{tenant.name}</td>
              </tr>
              <tr>
                <td>Room Number :</td>
                <td className='user-data'>{tenant.room}</td>
              </tr>
              <tr>
                <td>Rent :</td>
                <td className='user-data'>{tenant.rent}</td>
              </tr>
              <tr>
                <td>Room Type:</td>
                <td className='user-data'>{tenant.roomtype}</td>
              </tr>
              <tr>
                <td>Address :</td>
                <td className='user-data'>{tenant.address}</td>
              </tr>
            </tbody>
          </table>
          <div className="card-buttons">
            <Link to={`/update/${tenant._id}`}>
              <button id='update'>Update</button>
            </Link>
            <button id='delete' onClick={() => btnHandler(tenant._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllTenants;