// Reviews.js
import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import style from './Reviews.module.css';
import {PiUser} from 'react-icons/pi';
import { FaRegStar} from 'react-icons/fa6';



const Reviews = () => {
  return (
      <div className={style.mainWrapper}>
        <Navbar />
        <div className={style.mainContent}>
          <h1 className={style.reviewsTitle}>User reviews:</h1>
          <div className={style.reviewCard}>
            <div className={style.profileInfo}>
              <PiUser className={style.profileIcon}></PiUser>
              <h4>Vericu</h4>
            </div>
            <div className={style.reviewContent}>
              <div className={style.starsContainer}>
                <p>Nota:</p>
                <div className={style.stars}>
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                </div>
              </div>
              <div className={style.comment}>
                <p>Text si iarasi text cu alt text pe langa
                   Text si iarasi text cu alt text pe langa
                   Text si iarasi text cu alt text pe langa
                   Text si iarasi text cu alt text pe langa
                   Text si iarasi text cu alt text pe langa
                   Text si iarasi text cu alt text pe langa
                   Text si iarasi text cu alt text pe langa
                   Text si iarasi text cu alt text pe langa
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};


export default Reviews;
