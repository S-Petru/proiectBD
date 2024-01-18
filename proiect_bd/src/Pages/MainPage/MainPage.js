import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import CarCard from '../../Components/CarCard';
import FilterMenu from '../../Components/FilterMenu';

import style from './MainPage.module.css';

const MainPage = () => {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    producator: '',
    model: '',
    kmMin: '',
    kmMax: '',
    combustibil: '',
    anMin: '',
    anMax: '',
  });
  const [appliedFilters, setAppliedFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const fetchCars = async () => {
    try {
      const queryParams = Object.entries(appliedFilters)
        .filter(([key, value]) => value !== '')
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

      const apiUrl = `${process.env.REACT_APP_API_URL}/api/cars?${queryParams}`;
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        setCars(data);
      } else {
        console.error('Failed to fetch cars');
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
    fetchCars();
  };

  useEffect(() => {
    // Verificăm dacă există filtre aplicate
    const hasAppliedFilters = Object.values(appliedFilters).some((value) => value !== '');

    // Dacă nu există filtre aplicate, aducem toate mașinile
    if (!hasAppliedFilters) {
      fetchCars();
    }
  }, [appliedFilters]);

  return (
    <div className={style.mainWrapper}>
      <Navbar />

      {/* Adăugăm butonul pentru a afișa/ascunde filtrele */}
      <button onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? 'Ascunde Filtre' : 'Afișează Filtre'}
      </button>

      {/* Afișăm filtrul doar dacă showFilters este true */}
      {showFilters && (
        <div className={style.filterContainer}>
          <FilterMenu
          title="Producător"
          options={['Audi', 'BMW', 'Mercedes', 'Toyota']}
          selectedValue={filters.producator}
          onSelect={(value) => setFilters({ ...filters, producator: value })}
        />
        <FilterMenu
          title="Model"
          options={['A3', 'X5', 'C-Class', 'Camry']}
          selectedValue={filters.model}
          onSelect={(value) => setFilters({ ...filters, model: value })}
        />
        <FilterMenu
          title="Kilometraj (min)"
          selectedValue={filters.kmMin}
          onSelect={(value) => setFilters({ ...filters, kmMin: value })}
        />
        <FilterMenu
          title="Kilometraj (max)"
          selectedValue={filters.kmMax}
          onSelect={(value) => setFilters({ ...filters, kmMax: value })}
        />
        <FilterMenu
          title="Combustibil"
          options={['Benzina', 'Motorina']}
          selectedValue={filters.combustibil}
          onSelect={(value) => setFilters({ ...filters, combustibil: value })}
        />
        <FilterMenu
          title="An (min)"
          selectedValue={filters.anMin}
          onSelect={(value) => setFilters({ ...filters, anMin: value })}
        />
        <FilterMenu
          title="An (max)"
          selectedValue={filters.anMax}
          onSelect={(value) => setFilters({ ...filters, anMax: value })}
        />
          {/* Adaugă celelalte FilterMenu-uri pentru celelalte filtre */}
          <button onClick={handleApplyFilters}>Aplică filtrele</button>
        </div>
      )}

      <div className={style.mainContent}>
        <div className={style.carGrid}>
          {cars.map((car) => (
            <CarCard
              key={`${car.producator}-${car.model}-${car.an}`}
              car={{
                producator: car.producator,
                model: car.model,
                an: car.an,
                pret: car.pret,
                km: car.km,
                combustibil: car.combustibil,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;