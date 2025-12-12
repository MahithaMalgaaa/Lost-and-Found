import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://lost-and-found-fziw.onrender.com/api/auth/login', formData);
      
      // SAVE TOKEN, NAME, ID, AND ROLE
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.user.name);
      localStorage.setItem('userId', res.data.user.id);
      localStorage.setItem('userRole', res.data.user.role); // <--- NEW LINE: Save Role
      
      setToken(res.data.token);
      navigate('/');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
          alert(err.response.data.message);
      } else {
          alert("Server is offline or unreachable.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">Login</button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-500 font-bold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;