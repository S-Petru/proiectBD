import React from 'react';

const FilterMenu = ({ title, options, selectedValue, onSelect }) => {
  // Verificăm dacă trebuie să afișăm un text field în loc de meniu select
  const isTextFieldFilter = title.includes('Kilometraj') || title.includes('An');

  return (
    <div>
      <label>{title}</label>
      {isTextFieldFilter ? (
        // Dacă este un text field, afișăm un input de tip text
        <input
          type="text"
          value={selectedValue}
          onChange={(e) => onSelect(e.target.value)}
        />
      ) : (
        // Altfel, afișăm meniul select obișnuit
        <select value={selectedValue} onChange={(e) => onSelect(e.target.value)}>
          <option value="">Alegeți o opțiune</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default FilterMenu;
