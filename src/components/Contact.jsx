import './Contact.css'
import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

function Contact() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [mess,setMess] = useState('');
  const navigate = useNavigate();

  const nameHandler=(e)=>{setName(e.target.value)}
  const emailHandler=(e)=>{setEmail(e.target.value)}
  const messHandler=(e)=>{setMess(e.target.value)}
  
  const btnHandler=(e)=>{
    e.preventDefault();
    const payload = { name, email, message: mess };
    axios.post('http://localhost:5000/api/contact', payload)
      .then(() => {
        alert('Message sent!');
        setName('');
        setEmail('');
        setMess('');
        navigate('/');
      })
      .catch(() => {
        alert('Failed to send message.');
      });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form className="contact-form" onSubmit={btnHandler} >
        <label>Name*</label>
        <input value={name} onChange={nameHandler} type="text" name="name" placeholder="Your Name" required />
        <label>Email*</label>
        <input value={email} onChange={emailHandler} type="email" name="email" placeholder="Your Email" required />
        <label>Message*</label>
        <textarea value={mess} onChange={messHandler} name="message" placeholder="Your Message" required />
        <button type="submit">Send Message</button>
      </form>
    </div>
  )
}

export default Contact