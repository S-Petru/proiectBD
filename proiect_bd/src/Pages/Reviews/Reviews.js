import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import style from './Reviews.module.css';
import { PiUser } from 'react-icons/pi';
import { FaRegStar } from 'react-icons/fa6';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Functie pentru a prelua review-urile din backend
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/reviews`);

        if (response.ok) {
          const data = await response.json();
          console.log('Type of data:', Array.isArray(data) ? 'Array' : 'Not an Array');
          setReviews(data);
        } else {
          console.error('Failed to fetch reviews');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    // Apelăm funcția pentru a prelua review-urile
    fetchReviews();
  }, []); // Dependența goală asigură că acest efect rulează doar o dată când componenta este montată

  return (
    <div className={style.mainWrapper}>
      <Navbar />
      <div className={style.mainContent}>
        <h1 className={style.reviewsTitle}>User reviews:</h1>

        {/* Mapăm prin reviews și afișăm fiecare */}
        {reviews.map((review, index) => (
          <div key={index} className={style.reviewCard}>
            {/* Afișăm detaliile despre review folosind datele review-ului */}
            <div className={style.profileInfo}>
              <PiUser className={style.profileIcon} />
              <h4 className={style.profileName}>{review.username}</h4>
            </div>
            <div className={style.vertLine}></div>
            <div className={style.reviewContent}>
              <div className={style.starsContainer}>
                <div className={style.stars}>
                  {/* Afișăm stelele în funcție de rating */}
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaRegStar key={i} />
                  ))}
                </div>
              </div>
              <div className={style.comment}>
                <p>{review.comentariu}</p>
                <p>Producător: {review.nume_producator}</p>
                <p>Model: {review.nume_model}</p>
                <p>An de fabricație: {review.an_productie}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;