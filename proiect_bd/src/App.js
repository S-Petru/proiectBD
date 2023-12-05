import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import MainPage from './Pages/MainPage/MainPage';
import Admin from './Pages/Admin/Admin';
import Reviews from './Pages/Reviews/Reviews';
import Profile from './Pages/Profile/Profile';

const App = () => {
  return (
      <div>
        {/* <AuthProvider> */}
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<MainPage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path='/reviews' element={<Reviews />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </Router>        
      </div>
  );
}

export default App;
