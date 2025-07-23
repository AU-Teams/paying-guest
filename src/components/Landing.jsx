import './Landing.css';
import React from 'react';

function Landing() {
  return (
    <div className="landing-page">
      <section className="hero">
        <img src="../public/image3.jpeg" alt="image" />
        <div className='hero-info'>
          <h1>Welcome to the Tenant Management System</h1>
          <p>Manage your tenants effectively and efficiently.</p>
        </div>
      </section>
    </div>
  );
}

export default Landing;
