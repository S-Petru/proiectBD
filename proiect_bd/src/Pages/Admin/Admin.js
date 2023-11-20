// Admin.js
import React from 'react';

const Admin = () => {
  const handleClick = () => {
    window.location.href = '/login';
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <p>Welcome to the admin page!</p>
      <button onClick={handleClick}>
        Back to Login
      </button>
    </div>
  );
};

export default Admin;
