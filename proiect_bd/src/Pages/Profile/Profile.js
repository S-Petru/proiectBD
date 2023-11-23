// Profile.js
import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';

const Profile = () => {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('user');

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);

      const fetchData = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/profil/tranzactii`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: foundUser.username }), // Use foundUser.username
          });

          if (response.ok) {
            const data = await response.json();
            setTransactions(data);
          } else {
            console.error('Error fetching transactions:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      };

      fetchData();
    }
  }, []); // Make sure to include the dependency array

  

  return (
    <div>
      <Navbar />
      <h2>Profile Page</h2>
      {user ? (
        <>
          <p>Welcome to your profile page_{user.username}!</p>
          <h3>Tranzactiile pentru:: {user.username}</h3>
          {/* Display transactions in a paragraph */}
          <p>
            {transactions.map((transaction) => (
              `Transaction ID: ${transaction.idtranzactie}, Car ID: ${transaction.idmasina}, Date and Time: ${transaction.data_ora} `
            ))}
          </p>
        </>
      ) : (
        <p>Log in to display transactions</p>
      )}
    </div>
  );
};

export default Profile;
