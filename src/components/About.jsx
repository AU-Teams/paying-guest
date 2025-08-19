import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <h2>About</h2>
        <p>
          This Tenant Management System allows you to easily manage room allocations, tenant details, and update or delete user data in real time. All data is securely stored in MongoDB and managed via a Node.js/Express backend.
        </p>
        <p>
          Built using <strong>MERN Stack</strong> (MongoDB, Express, React, Node.js) with secure authentication and REST API, it provides a smooth, responsive, and user-friendly interface.
        </p>
        <p>
          Key features include:
        </p>
        <ul>
          <li>View all tenants</li>
          <li>Update tenant information</li>
          <li>Delete tenants instantly</li>
          <li>Real-time updates without page reload</li>
          <li>Fully responsive design</li>
        </ul>
      </div>
    </section>
  );
};

export default About;
