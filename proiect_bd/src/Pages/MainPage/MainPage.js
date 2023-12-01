import React from 'react';
import Navbar from '../../Components/Navbar';
import style from './MainPage.module.css';

const MainPage = () => {
  return (
      <div className={style.mainWrapper}>
        <Navbar />
        <div className={style.mainContent}>
          <div className={style.mainSearchBar}>
              <input type='text' name='producator'></input>
              <input type='text' name='producator'></input>
              <input type='text' name='producator'></input>
              <input type='text' name='producator'></input>
              <input type='text' name='producator'></input>
              <input type='text' name='producator'></input>
              <input type='text' name='producator'></input>
              <input type='text' name='producator'></input>
              <h6>asda</h6>
              <h6>asda</h6>
          </div>
          <h4>Content</h4>
          <h4>Content</h4>
          <h4>Content</h4>
          <h4>Content</h4>
          <h4>Content</h4>
          <h4>Content</h4>
          <h4>Content</h4>
          <h4>Content</h4>
          <h4>Content</h4>
          <h4>Content</h4>
          <h4>Content</h4>
          <h4>Content</h4>
          <h4>Content</h4>
          <h4>Content</h4>
          <h4>Content</h4>
          <h4>Content</h4>
      </div>
    </div>
  );
};

export default MainPage;
