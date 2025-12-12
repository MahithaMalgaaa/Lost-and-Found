import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import ItemCard from './ItemCard';
import ReportForm from './ReportForm';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/items/${id}`, {
            headers: { 'x-auth-token': token }
        });
        setItems(items.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("You are not authorized to delete this!");
      }
    }
  };

  const handleResolve = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/items/${id}`, {}, {
        headers: { 'x-auth-token': token }
      });
      setItems(items.map((item) => 
        item._id === id ? { ...item, status: 'Solved' } : item
      ));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("You can't update items that aren't yours!");
    }
  };

  const filteredItems = items.filter((item) => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-50 to-cyan-100 relative">
      <Navbar onOpenForm={() => setShowForm(true)} onSearch={setSearchTerm} />

      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Posts</h2>
        
        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No items found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard 
                key={item._id} 
                item={item} 
                currentUserId={localStorage.getItem('userId')} 
                currentUserRole={localStorage.getItem('userRole')} // <--- PASS ROLE HERE
                onDelete={handleDelete}
                onResolve={handleResolve}
              />
            ))}
          </div>
        )}
      </div>

      {showForm && <ReportForm onClose={() => setShowForm(false)} onRefresh={fetchItems} />}
    </div>
  );
};

export default Dashboard;