import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import MainPage from './Pages/MainPage/MainPage';
import Admin from './Pages/Admin/Admin';

const App = () => {
  return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
