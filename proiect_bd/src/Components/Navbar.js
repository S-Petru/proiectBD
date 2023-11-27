import React, { useEffect, useState } from 'react';
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
                <Link to="/">Auto Deals</Link>
              </li>
            </ul>
          </nav>
          <span>
            <Link to='/admin'>{user.username}</Link>
          </span>
          <button onClick={logout}>Logout</button>
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
            </ul>
          </nav>
          <span>
            <Link to='/profile'>{user.username}</Link>
          </span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Auto Deals</Link>
              </li>
            </ul>
          </nav>
          <span>
            <Link to="/login">Login</Link>
          </span>
        </div>
      )}
    </>
  );
};
    

export default Navbar;
