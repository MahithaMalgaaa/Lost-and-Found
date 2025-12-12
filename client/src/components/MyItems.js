import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import ItemCard from './ItemCard';

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch ONLY my items
  const fetchMyItems = async () => {
    try {
      const token = localStorage.getItem('token');
      // Call the new route we just made
      const response = await axios.get('https://lost-and-found-fziw.onrender.com/api/items/my-items', {
        headers: { 'x-auth-token': token }
      });
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching my items:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://lost-and-found-fziw.onrender.com/api/items/${id}`, {
                headers: { 'x-auth-token': token }
            });
            setItems(items.filter((item) => item._id !== id));
        } catch (error) {
            alert("Error deleting item");
        }
    }
  };

  const handleResolve = async (id) => {
    try {
        const token = localStorage.getItem('token');
        await axios.put(`https://lost-and-found-fziw.onrender.com/api/items/${id}`, {}, {
            headers: { 'x-auth-token': token }
        });
        // Update UI locally to show 'Solved'
        setItems(items.map((item) => 
            item._id === id ? { ...item, status: 'Solved' } : item
        ));
    } catch (error) {
        alert("Error updating status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Re-use Navbar, but pass empty search since we are just looking at our own list */}
      <Navbar onOpenForm={() => {}} onSearch={() => {}} />

      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">My Activity</h2>
        
        {loading ? (
            <p>Loading...</p>
        ) : items.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
                <p>You haven't posted anything yet.</p>
            </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard 
                key={item._id} 
                item={item} 
                currentUserId={localStorage.getItem('userId')} 
                currentUserRole={localStorage.getItem('userRole')}
                onDelete={handleDelete}
                onResolve={handleResolve}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyItems;