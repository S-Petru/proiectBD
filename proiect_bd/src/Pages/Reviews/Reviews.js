// Reviews.js
import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import style from './Reviews.module.css';
import { PiUser } from 'react-icons/pi';
import { FaRegStar } from 'react-icons/fa6';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Function to fetch reviews from the backend
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');

        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          console.error('Failed to fetch reviews');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    // Call the fetchReviews function
    fetchReviews();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div className={style.mainWrapper}>
      <Navbar />
      <div className={style.mainContent}>
        <h1 className={style.reviewsTitle}>User reviews:</h1>

        {/* Map through the reviews and render each one */}
        {reviews.map((review, index) => (
          <div key={index} className={style.reviewCard}>
            {/* Render review details here using the review data */}
            <div className={style.profileInfo}>
              <PiUser className={style.profileIcon} />
              <h4 className={style.profileName}>{review.username}</h4>
            </div>
            <div className={style.vertLine}></div>
            <div className={style.reviewContent}>
              <div className={style.starsContainer}>
                <div className={style.stars}>
                  {/* Render stars based on the rating */}
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaRegStar key={i} />
                  ))}
                </div>
              </div>
              <div className={style.comment}>
                <p>{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;