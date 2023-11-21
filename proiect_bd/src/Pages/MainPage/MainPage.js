import React from 'react';
import Navbar from '../../Components/Navbar';

const MainPage = () => {
  const handleLogout = () => {
    // Clear authentication state (example: using a state management system)
    // ...

    // Redirect to LoginPage after logout
    window.location.href = '/login'; // You can use history.push('/login') if you have access to useHistory
  };

  return (
    <div>
      <Navbar />
      <h2>Main Page</h2>
      {/* Your main page content */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default MainPage;
