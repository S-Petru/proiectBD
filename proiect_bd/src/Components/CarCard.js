// CarCard.js
import React from 'react';
import { FaCar } from 'react-icons/fa';
import styles from './CarCard.module.css';

const CarCard = ({ car }) => {
  return (
    <div className={styles.carCard}>
      <div className={styles.carIcon}>
        <FaCar size={100} />
      </div>
      <div className={styles.carInfo}>
        <p>{car.producator}</p>
        <p>{car.model}</p>
        <p>{car.an}</p>
        <p>Pret: {car.pret}</p>
        <p>Kilometri: {car.km}</p>
        <p>Combustibil: {car.combustibil}</p>
      </div>
    </div>
  );
};

export default CarCard;