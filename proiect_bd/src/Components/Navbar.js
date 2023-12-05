import React, { useEffect, useState } from 'react';
import style from './Navbar.module.css';
import { Link } from 'react-router-dom';
import {PiUser} from 'react-icons/pi';
import { FaArrowRightFromBracket } from 'react-icons/fa6'
import { FaRegStar} from 'react-icons/fa6';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
    window.location.reload(false);
    window.location.href = '/';
  };

  return (
    <>
      {user && user.rol ? (
        <div className={style.navContainer}>
          <nav className={style.navClass}>
          <Link to="/" className={style.navTitle}>Motor Deals</Link>
            <ul className={style.navUl}>
              <li className={style.navLi}>
                <Link to='/admin' className={style.navAnchor}><PiUser />{user.username}</Link>
              </li>
              <li className={style.navLi}>
                <a onClick={logout} className={style.navAnchor}><FaArrowRightFromBracket /></a>
              </li>
            </ul>
          </nav>         
        </div>
      ) : user ? (
        <div className={style.navContainer}>
          <nav className={style.navClass}>
            <Link to="/" className={style.navTitle}>Motor Deals</Link>
            <ul className={style.navUl}>
              <li className={style.navLi}>
                <Link to="/reviews" className={style.navAnchor}><FaRegStar />Reviews</Link>
              </li>
              <li className={style.navLi}>
                <Link to='/profile' className={style.navAnchor}><PiUser />{user.username}</Link>    
              </li>
              <li className={style.navLi}>
                <a onClick={logout} className={style.navAnchor}><FaArrowRightFromBracket /></a>
              </li>
            </ul>
          </nav>         
        </div>
      ) : (
        <div className={style.navContainer}>
          <nav className={style.navClass}>
            <Link to="/" className={style.navTitle}>Motor Deals</Link>
            <ul className={style.navUl}>
              <li className={style.navLi}>
                <Link to="/reviews" className={style.navAnchor}><FaRegStar />Reviews</Link>
              </li>
              <li className={style.navLi}>
                <Link to="/login" className={style.navAnchor}>Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};
    

export default Navbar;
