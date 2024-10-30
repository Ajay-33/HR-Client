import React from 'react';

const LinkedInLogin = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8070/auth/linkedin';
  };

  return (
    <button onClick={handleLogin} className="linkedin-login-button">
      Connect with LinkedIn
    </button>
  );
};

export default LinkedInLogin;
