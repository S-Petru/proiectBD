// authContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user`);
        setUser(response.data); // Set user data when the request is successful
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // The empty dependency array ensures that this effect runs only once

  const login = async (username, password, onSuccess) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
        username,
        password,
      });

      const { message, user } = response.data;
      setUser(user);
      console.log(message, user);

      // Call the onSuccess callback if provided
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(user);
      }

      if (user && user.rol) {
        window.location.href = '/admin';
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Login failed', error.response.data);
      // Handle login failure, set an error state, etc.
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { AuthProvider };
