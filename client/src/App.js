import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import MyItems from './components/MyItems'; // 1. Import it

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route 
          path="/" 
          element={token ? <Dashboard /> : <Navigate to="/login" />} 
        />

        {/* 2. Add the New Route */}
        <Route 
          path="/my-items" 
          element={token ? <MyItems /> : <Navigate to="/login" />} 
        />

      </Routes>
    </Router>
  );
};

export default App;