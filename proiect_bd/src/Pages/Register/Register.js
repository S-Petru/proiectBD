// Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
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
      // Hash the password before sending it to the server
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password, // You should hash the password on the server
      });

      console.log('Registration successful', response.data);
      window.location.href = '/login';
    } catch (error) {
      console.error('Registration failed', error.response.data);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div  className={styles.banner}>
        <h2><Link to="/" className={styles.bannerTitle}>MOTOR DEALS</Link></h2>
      </div>
      <div className={styles.container}>
        <h2 className={styles.title}>Register</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </label>

          <label className={styles.label}>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>

          <label className={styles.label}>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </label>

          <button className={styles.regButton} type="submit">Register</button>
        </form>

        <p className={styles.info}>
          Already have an account? <Link to="/login" className={styles.anchor}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
