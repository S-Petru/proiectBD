// Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the server's login endpoint
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, formData);

      // Assuming your backend returns a message and user data upon successful login
      const { message, user } = response.data;

      // You can do something with the user data if needed
      console.log(message, user);
      sessionStorage.setItem('user', JSON.stringify(user));
      // Redirect to MainPage or update the state to reflect a successful login
      console.log('Login successful');
      if(user.rol) {
        window.location.href = '/admin';
      } else {
        window.location.href = '/';
      }
      
    } catch (error) {
      // If the login fails, show an error message on the browser
      console.error('Login failed', error.response.data);
      alert('Wrong credentials. Please try again.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div  className={styles.banner}>
        <h2><Link to="/" className={styles.bannerTitle}>MOTOR DEALS</Link></h2>
      </div>
      <div className={styles.container}>
        <h2 className={styles.title}>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </label>
          
          <label className={styles.label}>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </label>

          <button className={styles.logButton} type="submit">Login</button>
        </form>

        <p className={styles.info}>
          Don't have an account? <Link to="/register" className={styles.anchor}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;