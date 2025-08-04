import './Landing.css';
import React from 'react';
import bgimage from '../assets/image3.jpeg'

function Landing() {
  return (
    <div className="landing-page">
      <section className="hero">
        <img src={bgimage} alt="image" />
        <div className='hero-info'>
          <h1>Welcome to the Tenant Management System</h1>
          <p>Manage your tenants effectively and efficiently.</p>
        </div>
      </section>
    </div>
  );
}

export default Landing;
