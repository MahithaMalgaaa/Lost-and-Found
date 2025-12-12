import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link
import { Search, LogOut, User, Shield } from 'lucide-react'; 

const Navbar = ({ onOpenForm, onSearch }) => {
  
  const userName = localStorage.getItem('userName') || 'User';
  const userRole = localStorage.getItem('userRole'); // Get the role

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    window.location.reload(); 
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Logo (Clicking logo goes to Home/Dashboard) */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          <h1 className="text-xl font-bold text-gray-800">Lost & Found</h1>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search items..." 
            className="bg-transparent outline-none w-full text-gray-700"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
            
            {/* 2. USER PROFILE LINK -> Goes to /my-items */}
            <Link 
                to="/my-items" 
                className="flex items-center gap-2 text-gray-700 font-medium hover:bg-gray-100 p-2 rounded-lg transition"
                title="View My Items"
            >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <User size={18} />
                </div>
                
                <div className="flex flex-col leading-tight">
                    <span className="text-sm font-bold">Hi, {userName}</span>
                    
                    {/* Admin Badge */}
                    {userRole === 'admin' && (
                        <span className="text-[10px] text-red-600 font-bold flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                           <Shield size={10} /> ADMIN
                        </span>
                    )}
                </div>
            </Link>

            {/* Report Button */}
            <button 
                onClick={onOpenForm}
                className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition text-sm"
            >
            + Report
            </button>

            {/* Logout Button */}
            <button 
                onClick={handleLogout}
                className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                title="Logout"
            >
                <LogOut size={20} />
            </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;