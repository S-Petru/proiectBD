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
      const response = await axios.post('/api/register', {
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
      <div className={styles.container}>
        <h2>Register</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </label>

          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>

          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </label>

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
