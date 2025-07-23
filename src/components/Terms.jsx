import React from 'react';
import './PolicyTerms.css';

const Terms = () => {
  return (
    <div className="policy-container">
      <div className="section">
        <h2 className="section-title">Terms of Service</h2>
        <p className="section-description">
          By using our platform, you agree to the following terms and conditions:
        </p>
        <ul className="section-list">
          <li><strong>User Responsibilities:</strong> Users must provide accurate information and respect the platform’s rules.</li>
          <li><strong>Usage Restrictions:</strong> You may not use the platform for illegal or harmful activities.</li>
          <li><strong>Content Ownership:</strong> Users retain ownership of content they upload but grant us limited rights to display it on the platform.</li>
          <li><strong>Termination:</strong> We reserve the right to suspend or delete accounts for violating terms.</li>
          <li><strong>Changes:</strong> Terms may change over time; continued use means you accept updates.</li>
          <li><strong>Support:</strong> For questions, users can contact us through the support form or email.</li>
        </ul>
      </div>
    </div>
  );
};

export default Terms;
