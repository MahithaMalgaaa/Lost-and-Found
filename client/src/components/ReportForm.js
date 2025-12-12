import React, { useState } from 'react';
import axios from 'axios';
import { X, Upload } from 'lucide-react';

const ReportForm = ({ onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    type: 'Lost',
    category: 'Electronics',
    title: '',
    description: '',
    location: '',
    contact: ''
  });
  
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('type', formData.type);
    data.append('category', formData.category);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('location', formData.location);
    data.append('contact', formData.contact);
    
    if (imageFile) {
        data.append('image', imageFile);
    }

    const token = localStorage.getItem('token');

    try {
      await axios.post('https://lost-and-found-fziw.onrender.com/api/items', data, {
        headers: { 
            'Content-Type': 'multipart/form-data',
            'x-auth-token': token
        } 
      });
      
      alert('Item Reported Successfully!');
      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error reporting item:', error);
      alert('Something went wrong or you are not logged in.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black"><X size={24} /></button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Report an Item</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="type" value="Lost" checked={formData.type === 'Lost'} onChange={handleChange} />
              <span className="text-red-600 font-bold">Lost</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="type" value="Found" checked={formData.type === 'Found'} onChange={handleChange} />
              <span className="text-green-600 font-bold">Found</span>
            </label>
          </div>

          <input name="title" placeholder="Item Name" required className="w-full border p-2 rounded" onChange={handleChange} />
          <select name="category" className="w-full border p-2 rounded" onChange={handleChange}>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="ID Card">ID Card</option>
            <option value="Books">Books</option>
            <option value="Other">Other</option>
          </select>

          <textarea name="description" placeholder="Description..." required className="w-full border p-2 rounded h-24" onChange={handleChange} />
          
          <div className="grid grid-cols-2 gap-2">
            <input name="location" placeholder="Where?" required className="w-full border p-2 rounded" onChange={handleChange} />
            {/* 👇 UPDATED INPUT FOR EMAIL */}
            <input 
                type="email" 
                name="contact" 
                placeholder="Email (e.g. student@college.edu)" 
                required 
                className="w-full border p-2 rounded" 
                onChange={handleChange} 
            />
          </div>

          <div className="border-2 border-dashed border-gray-300 p-4 text-center rounded-lg cursor-pointer hover:bg-gray-50">
            <label className="cursor-pointer flex flex-col items-center justify-center">
                <Upload className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                    {imageFile ? imageFile.name : "Click to upload image"}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">Submit Report</button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;