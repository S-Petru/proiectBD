// Reviews.js
import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import style from './Reviews.module.css';
import {PiUser} from 'react-icons/pi';
import { FaRegStar} from 'react-icons/fa6';



const Reviews = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <div className={style.mainWrapper}>
      <Navbar />
      <div className={style.mainContent}>
        <h1 className={style.reviewsTitle}>User reviews:</h1>
        <div className={style.reviewCard}>
          <div className={style.profileInfo}>
          <PiUser className={style.profileIcon}></PiUser><div>{user.username}</div>
          </div>
          <div className={style.reviewContent}></div>
        </div>
    </div>
  </div>
);
};


export default Reviews;
