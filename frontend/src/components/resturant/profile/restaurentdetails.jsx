import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantDetails = () => {
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/restaurants/details', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setRestaurant(res.data);
      } catch (err) {
        console.error('Failed to fetch restaurant details:', err);
      }
    };
    fetchData();
  }, []);

  if (!restaurant) return <div className="text-[#1F5E2A] italic p-4">Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
      <div className="p-5 bg-white/40 rounded-2xl shadow-[0_8px_32px_0_rgba(31,94,42,0.1)] backdrop-blur-md border border-white/60 hover:bg-white/50 transition-all">
        <h3 className="text-xs uppercase tracking-wider text-[#1F5E2A] mb-1 font-semibold opacity-80">Restaurant Name</h3>
        <p className="text-lg text-gray-800 font-bold">{restaurant.restaurantName || 'N/A'}</p>
      </div>

      <div className="p-5 bg-white/40 rounded-2xl shadow-[0_8px_32px_0_rgba(31,94,42,0.1)] backdrop-blur-md border border-white/60 hover:bg-white/50 transition-all">
        <h3 className="text-xs uppercase tracking-wider text-[#1F5E2A] mb-1 font-semibold opacity-80">Registered ID</h3>
        <p className="text-lg text-gray-800 font-bold">{restaurant.registeredId || 'N/A'}</p>
      </div>

      <div className="p-5 bg-white/40 rounded-2xl shadow-[0_8px_32px_0_rgba(31,94,42,0.1)] backdrop-blur-md border border-white/60 hover:bg-white/50 transition-all md:col-span-2">
        <h3 className="text-xs uppercase tracking-wider text-[#1F5E2A] mb-1 font-semibold opacity-80">Address</h3>
        <p className="text-lg text-gray-800 font-bold leading-relaxed">{restaurant.address || 'N/A'}</p>
      </div>

      <div className="p-5 bg-white/40 rounded-2xl shadow-[0_8px_32px_0_rgba(31,94,42,0.1)] backdrop-blur-md border border-white/60 hover:bg-white/50 transition-all">
        <h3 className="text-xs uppercase tracking-wider text-[#1F5E2A] mb-1 font-semibold opacity-80">Email</h3>
        <p className="text-lg text-gray-800 font-bold">{restaurant.restaurantEmail || 'N/A'}</p>
      </div>

      <div className="p-5 bg-white/40 rounded-2xl shadow-[0_8px_32px_0_rgba(31,94,42,0.1)] backdrop-blur-md border border-white/60 hover:bg-white/50 transition-all">
        <h3 className="text-xs uppercase tracking-wider text-[#1F5E2A] mb-1 font-semibold opacity-80">Phone Number</h3>
        <p className="text-lg text-gray-800 font-bold">{restaurant.phoneNumber || 'N/A'}</p>
      </div>

      <div className="p-5 bg-white/40 rounded-2xl shadow-[0_8px_32px_0_rgba(31,94,42,0.1)] backdrop-blur-md border border-white/60 hover:bg-white/50 transition-all md:col-span-2">
        <h3 className="text-xs uppercase tracking-wider text-[#1F5E2A] mb-1 font-semibold opacity-80">Meal Types</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {restaurant.mealTypes && restaurant.mealTypes.length > 0 
            ? restaurant.mealTypes.map((meal, index) => (
                <span key={index} className="px-3 py-1.5 bg-[#A7D63B]/20 text-[#1F5E2A] font-semibold text-sm rounded-full border border-[#A7D63B]/50">
                  {meal}
                </span>
              ))
            : <p className="text-gray-800">N/A</p>}
        </div>
      </div>

      <div className="p-5 bg-white/40 rounded-2xl shadow-[0_8px_32px_0_rgba(31,94,42,0.1)] backdrop-blur-md border border-white/60 hover:bg-white/50 transition-all md:col-span-2">
        <h3 className="text-xs uppercase tracking-wider text-[#1F5E2A] mb-1 font-semibold opacity-80">Description</h3>
        <p className="text-base text-gray-800 font-medium leading-relaxed bg-[#F8F8F6]/50 p-4 rounded-xl">{restaurant.description || 'No description provided.'}</p>
      </div>

      {restaurant.documents && restaurant.documents.length > 0 && (
        <div className="p-5 bg-white/40 rounded-2xl shadow-[0_8px_32px_0_rgba(31,94,42,0.1)] backdrop-blur-md border border-white/60 hover:bg-white/50 transition-all md:col-span-2">
          <h3 className="text-xs uppercase tracking-wider text-[#1F5E2A] mb-3 font-semibold opacity-80">Documents</h3>
          <ul className="space-y-3">
            {restaurant.documents.map((doc, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="text-[#E9A38E] text-2xl">📄</span>
                <a href={doc.fileUrl ? `http://localhost:5000${doc.fileUrl}` : '#'} target="_blank" rel="noopener noreferrer" className="text-[#1F5E2A] hover:text-[#A7D63B] font-bold underline transition-colors">
                  {doc.fileName || 'View Document'}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;
