import React from 'react';
import './PolicyTerms.css';

const Policy = () => {
  return (
    <div className="policy-container">
      <div className="section">
        <h2 className="section-title">Privacy Policy</h2>
        <p className="section-description">
          We respect your privacy and are committed to protecting your personal data. This policy explains how we handle your personal information.
        </p>
        <ul className="section-list">
          <li><strong>Information Collection:</strong> We collect only the data necessary to provide our services.</li>
          <li><strong>Data Usage:</strong> Your data is used solely to enhance user experience and improve functionality.</li>
          <li><strong>Cookies:</strong> We may use cookies for analytics and session management. You can disable cookies in your browser settings.</li>
          <li><strong>Third-Party Access:</strong> We do not sell or share your personal data with third parties except when required by law.</li>
          <li><strong>Security:</strong> We implement appropriate security measures to protect your data.</li>
          <li><strong>Account Deletion:</strong> Users can request account/data deletion by contacting us.</li>
        </ul>
      </div>
    </div>
  );
};

export default Policy;
