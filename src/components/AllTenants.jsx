import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import UpdateTenants from './UpdateTenants';
import './AllTenants.css'

const AllTenants = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/content')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  const btnHandler = (id) => {
    axios.delete(`http://localhost:3000/content/${id}`)
      .then(() => {
        alert("Data deleted")
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className='All-Tenants'>
      {users.map((user) => (
        <div className='Tenants-card' key={user.id}>
          <div className='header-info'>
            <img src={user.photo || 'https://via.placeholder.com/150'} alt="Profile" className="tenant-pic" />  
            <h2>{user.name}</h2>
          </div>
          <table>
            <tbody>
              <tr>
                <td>Name :</td>
                <td className='user-data'>{user.name}</td>
              </tr>
              <tr>
                <td>Room Number :</td>
                <td className='user-data'>{user.room}</td>
              </tr>
              <tr>
                <td>Rent :</td>
                <td className='user-data'>{user.rent}</td>
              </tr>
              <tr>
                <td>Room Type:</td>
                <td className='user-data'>{user.roomtype}</td>
              </tr>
              <tr>
                <td>Address :</td>
                <td className='user-data'>{user.address}</td>
              </tr>
            </tbody>
          </table>
          <div className="card-buttons">
            <Link to={`/update/${user.id}`}>
              <button id='update'>Update</button>
            </Link>
            <button id='delete' onClick={() => btnHandler(user.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AllTenants;