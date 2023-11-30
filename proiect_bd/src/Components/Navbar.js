import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

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
        <div>
          <nav>
            <ul>
              <li>
                <h1>Auto Deals</h1>
              </li>
              <li>
                <Link to='/admin'>{user.username}</Link>
              </li>
              <li>
              <button onClick={logout}>Logout</button>
              </li>
            </ul>
            
          </nav>         
        </div>
      ) : user ? (
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Auto Deals</Link>
              </li>
              <li>
                <Link to="/reviews">Reviews</Link>
              </li>
              <li>
                <Link to='/profile'>{user.username}</Link>    
              </li>
              <li>
              <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </nav>
          <span>
            
          </span>
         
        </div>
      ) : (
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Auto Deals</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};
    

export default Navbar;
