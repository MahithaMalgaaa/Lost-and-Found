import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Registration Successful! Please Login.');
      navigate('/login'); // Go to login page
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">Register</button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-500 font-bold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;