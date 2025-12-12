import React from 'react';
import { MapPin, Calendar, Trash2, CheckCircle, User, Mail } from 'lucide-react';

// 1. Accept 'currentUserRole'
const ItemCard = ({ item, onDelete, onResolve, currentUserId, currentUserRole }) => {
  
  const isLost = item.type === 'Lost';
  const isSolved = item.status === 'Solved';
  const cardStyle = isSolved ? "bg-gray-50 border-gray-200 opacity-70" : "bg-white border-transparent hover:shadow-md";
  const badgeColor = isLost ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600';

  // 2. LOGIC: Check ownership and Admin status
  const isOwner = item.postedBy && item.postedBy._id === currentUserId;
  const isAdmin = currentUserRole === 'admin'; // Are you a boss?

  let imageUrl = item.image;
  if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = `https://lost-and-found-fziw.onrender.com/${imageUrl}`;
  }

  return (
    <div className={`rounded-xl shadow-sm border p-4 transition relative ${cardStyle}`}>
      
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${badgeColor}`}>
            {item.type}
            </span>
            {isSolved && <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gray-200 text-gray-600">Solved</span>}
        </div>
        <span className="text-gray-400 text-xs flex items-center gap-1">
          <Calendar size={12} />
          {new Date(item.date).toLocaleDateString()}
        </span>
      </div>

      <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
         <User size={12} />
         Posted by: {item.postedBy ? item.postedBy.name : "Unknown"}
      </div>

      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={item.title} 
          className="w-full h-48 object-cover rounded-lg mb-3 border border-gray-100"
        />
      )}

      <h3 className="font-bold text-lg text-gray-800 mb-1">{item.title}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

      <div className="space-y-2 pt-3 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-500">
          <MapPin size={16} className="mr-2 text-gray-400" />
          {item.location}
        </div>
        
        <a href={`mailto:${item.contact}`} className="flex items-center text-sm text-blue-500 hover:underline hover:text-blue-700 transition">
          <Mail size={16} className="mr-2" />
          {item.contact}
        </a>
      </div>

      {/* 3. BUTTON LOGIC: Show if Owner OR Admin */}
      {(isOwner || isAdmin) && (
          <div className="flex gap-2 mt-4">
            
            {/* Mark Found (Only Owner can do this) */}
            {isOwner && !isSolved && (
                <button onClick={() => onResolve(item._id)} className="flex-1 flex items-center justify-center gap-2 bg-green-50 text-green-600 py-2 rounded-lg hover:bg-green-100 text-sm font-semibold transition">
                    <CheckCircle size={16} /> Mark Found
                </button>
            )}

            {/* Delete (Owner OR Admin can do this) */}
            <button 
                onClick={() => onDelete(item._id)} 
                className={`p-2 rounded-lg transition ${!isSolved ? "bg-red-50 text-red-500 hover:bg-red-100" : "w-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center gap-2"}`}
            >
                <Trash2 size={18} /> 
                {isSolved && "Delete Post"}
            </button>
          </div>
      )}
    </div>
  );
};

export default ItemCard;