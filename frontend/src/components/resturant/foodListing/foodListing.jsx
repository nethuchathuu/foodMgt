import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Filter, LayoutGrid, List, Edit, Trash2, Settings, Tag, Heart } from 'lucide-react';
import AddFoodRest from './addFoodRest';
import EditFoodRest from './editFoodRest';
import DeleteFoodRest from './deleteFoodRest';
import MarkFoodRest from './markFoodRest';

const FoodListing = () => {
  const [foods, setFoods] = useState([]);
  const [viewMode, setViewMode] = useState('card');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [deletingFood, setDeletingFood] = useState(null);
  const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);
  const [markingFood, setMarkingFood] = useState(null);

  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchFoods = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/food-listings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFoods(res.data);
    } catch (err) {
      console.error('Error fetching foods:', err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 1 minute
    
    return () => clearInterval(timer);
  }, []);

  const handleSuccess = () => {
    fetchFoods();
    setIsAddOpen(false);
    setEditingFood(null);
    setDeletingFood(null);
    setIsDeleteAllOpen(false);
    setMarkingFood(null);
  };

  const handleDeleteAll = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:5000/api/food-listings/delete-all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchFoods();
      setIsDeleteAllOpen(false);
    } catch (err) {
      console.error('Error deleting all foods:', err);
      alert('Failed to delete all food items. Please try again.');
    }
  };

  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const isNearExpiry = (isoString) => {
    if (!isoString) return false;
    const expiry = new Date(isoString).getTime();
    const now = currentTime.getTime();
    const oneHour = 60 * 60 * 1000;
    return (expiry - now > 0) && (expiry - now <= oneHour);
  };

  const filteredFoods = foods.filter(food => 
    food.foodName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#F8F8F6] min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1F5E2A]">Food Listings 🍱</h1>
          <p className="text-gray-500 mt-1">Manage your surplus food items</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsDeleteAllOpen(true)}
            className="bg-red-100 text-red-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-red-200 hover:scale-105 transition-all flex items-center gap-2"
          >
            <Trash2 size={20} />
            Clear All
          </button>
          <button 
            onClick={() => setIsAddOpen(true)}
            className="bg-[#A7D63B] text-[#1F5E2A] px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-[#C8E66A] hover:scale-105 transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            Add New Food
          </button>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 bg-white p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search food name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#A7D63B] outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
        </div>

        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setViewMode('card')}
            className={`p-2 rounded-lg transition ${viewMode === 'card' ? 'bg-white shadow text-[#1F5E2A]' : 'text-gray-500'}`}
          >
            <LayoutGrid size={20} />
          </button>
          <button 
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-lg transition ${viewMode === 'table' ? 'bg-white shadow text-[#1F5E2A]' : 'text-gray-500'}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Food Grid / Table */}
      {viewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFoods.map(food => {
            const isExpiringSoon = food.status === 'Available' && isNearExpiry(food.expiryTime);
            return (
            <div key={food._id} className="bg-white rounded-3xl shadow-xl p-5 hover:scale-105 transition group">
              <div className="relative h-48 overflow-hidden rounded-2xl mb-4">
                <img 
                  src={food.image || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80"} 
                  alt={food.foodName} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full shadow ${food.status === 'Available' ? 'bg-[#A7D63B] text-[#1F5E2A]' : 'bg-[#D67A5C] text-white'}`}>
                  {food.status}
                </div>
                {isExpiringSoon && (
                  <div className="bg-yellow-300 text-[#1F5E2A] text-xs px-2 py-1 font-bold rounded-full absolute top-2 right-2 shadow-md">
                    Near Expiry
                  </div>
                )}
                {food.acceptableForDonation && (
                  <div className="bg-pink-100 text-pink-600 p-1.5 rounded-full absolute bottom-2 right-2 shadow-sm" title="Acceptable for Donation">
                    <Heart size={16} fill="currentColor" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{food.foodName}</h3>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    {food.discountPrice ? (
                      <>
                        <span className="text-xl font-semibold text-[#D67A5C]">Rs. {food.discountPrice}</span>
                        <span className="text-sm text-gray-400 line-through">Rs. {food.price}</span>
                      </>
                    ) : (
                      <span className="text-xl font-semibold text-[#D67A5C]">Rs. {food.price}</span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-medium">Qty: <span className="font-bold text-gray-700">{food.quantity} {food.unit}</span></p>
                    <p className="text-sm text-gray-500 mt-1">{formatTime(food.expiryTime)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-100">
                  <button onClick={() => setEditingFood(food)} className="flex justify-center p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition" title="Edit">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => setDeletingFood(food)} className="flex justify-center p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="Delete">
                    <Trash2 size={18} />
                  </button>
                  <button onClick={() => setMarkingFood(food)} className="flex justify-center p-2 text-green-600 hover:bg-green-50 rounded-lg transition" title="Mark Status">
                    <Tag size={18} />
                  </button>
                </div>
              </div>
            </div>
          )})}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Food Item</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFoods.map(food => (
                <tr key={food._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={food.image || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80"} alt={food.foodName} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-gray-800">{food.foodName}</p>
                      <p className="text-xs text-[#d67a5c]">{food.expiryTime}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-[#1F5E2A]">Rs. {food.discountPrice || food.price}</span>
                    {food.discountPrice && <span className="text-gray-400 line-through text-xs ml-2">Rs. {food.price}</span>}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600">{food.quantity}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${food.status === 'Available' ? 'bg-[#A7D63B]/20 text-[#1F5E2A]' : 'bg-[#D67A5C]/20 text-[#D67A5C]'}`}>
                      {food.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {food.acceptableForDonation ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-pink-600 bg-pink-50 px-2 py-1 rounded-lg w-max">
                        <Heart size={14} fill="currentColor" /> Donatable
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg w-max">
                        Sale Only
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => setEditingFood(food)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                      <button onClick={() => setDeletingFood(food)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                      <button onClick={() => setMarkingFood(food)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"><Tag size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {isDeleteAllOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all scale-100 opacity-100 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Trash2 className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Clear All Items?</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Are you sure you want to permanently clear all your food listings? This action cannot be undone.
            </p>
            <div className="flex gap-4 w-full">
              <button 
                onClick={() => setIsDeleteAllOpen(false)}
                className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteAll}
                className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all active:scale-95"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
      {isAddOpen && <AddFoodRest onClose={() => setIsAddOpen(false)} onSuccess={handleSuccess} />}
      {editingFood && <EditFoodRest food={editingFood} onClose={() => setEditingFood(null)} onSuccess={handleSuccess} />}
      {deletingFood && <DeleteFoodRest food={deletingFood} onClose={() => setDeletingFood(null)} onSuccess={handleSuccess} />}
      {markingFood && <MarkFoodRest food={markingFood} onClose={() => setMarkingFood(null)} onSuccess={handleSuccess} />}

    </div>
  );
};

export default FoodListing;
