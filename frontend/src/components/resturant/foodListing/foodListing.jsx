import React, { useState } from 'react';
import { Search, Plus, Filter, LayoutGrid, List, Edit, Trash2, Settings, Tag } from 'lucide-react';
import AddFoodRest from './addFoodRest';
import EditFoodRest from './editFoodRest';
import DeleteFoodRest from './deleteFoodRest';
import SetFoodRest from './setFoodRest';
import MarkFoodRest from './markFoodRest';

const mockFoods = [
  {
    id: 1,
    name: "Grilled Chicken Salad",
    originalPrice: 15.00,
    discountPrice: 5.00,
    quantity: 10,
    expiryTime: "2 hours",
    status: "Available",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80"
  },
  {
    id: 2,
    name: "Margherita Pizza",
    originalPrice: 20.00,
    discountPrice: 8.00,
    quantity: 0,
    expiryTime: "Expired",
    status: "Sold Out",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80"
  },
  {
    id: 3,
    name: "Vegetable Biryani",
    originalPrice: 12.00,
    discountPrice: 4.00,
    quantity: 5,
    expiryTime: "1 hour",
    status: "Available",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80"
  }
];

const FoodListing = () => {
  const [viewMode, setViewMode] = useState('card');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [deletingFood, setDeletingFood] = useState(null);
  const [settingFood, setSettingFood] = useState(null);
  const [markingFood, setMarkingFood] = useState(null);

  return (
    <div className="p-6 bg-[#F8F8F6] min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1F5E2A]">Food Listings 🍱</h1>
          <p className="text-gray-500 mt-1">Manage your surplus food items</p>
        </div>
        <button 
          onClick={() => setIsAddOpen(true)}
          className="bg-[#A7D63B] text-[#1F5E2A] px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-[#C8E66A] hover:scale-105 transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Food
        </button>
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
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition">
            <Filter size={18} />
            Filters
          </button>
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
          {mockFoods.map(food => (
            <div key={food.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={food.image} 
                  alt={food.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full ${food.status === 'Available' ? 'bg-[#A7D63B] text-[#1F5E2A]' : 'bg-[#D67A5C] text-white'}`}>
                  {food.status}
                </div>
                {food.status === 'Available' && (
                  <div className="absolute top-3 left-3 bg-[#E9A38E] text-white px-2 py-1 text-xs font-bold rounded-lg shadow">
                    Near Expiry
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-1">{food.name}</h3>
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <span className="text-xl font-black text-[#1F5E2A]">${food.discountPrice}</span>
                    <span className="text-sm text-gray-400 line-through ml-2">${food.originalPrice}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Qty: <span className="font-bold text-gray-700">{food.quantity}</span></p>
                    <p className="text-xs text-[#d67a5c] font-medium">{food.expiryTime}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-100">
                  <button onClick={() => setEditingFood(food)} className="flex justify-center p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition" title="Edit">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => setDeletingFood(food)} className="flex justify-center p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="Delete">
                    <Trash2 size={18} />
                  </button>
                  <button onClick={() => setSettingFood(food)} className="flex justify-center p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition" title="Set Details">
                    <Settings size={18} />
                  </button>
                  <button onClick={() => setMarkingFood(food)} className="flex justify-center p-2 text-green-600 hover:bg-green-50 rounded-lg transition" title="Mark Status">
                    <Tag size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
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
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockFoods.map(food => (
                <tr key={food.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={food.image} alt={food.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-gray-800">{food.name}</p>
                      <p className="text-xs text-[#d67a5c]">{food.expiryTime}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-[#1F5E2A]">${food.discountPrice}</span>
                    <span className="text-gray-400 line-through text-xs ml-2">${food.originalPrice}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600">{food.quantity}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${food.status === 'Available' ? 'bg-[#A7D63B]/20 text-[#1F5E2A]' : 'bg-[#D67A5C]/20 text-[#D67A5C]'}`}>
                      {food.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => setEditingFood(food)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                      <button onClick={() => setDeletingFood(food)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                      <button onClick={() => setSettingFood(food)} className="p-1.5 text-orange-500 hover:bg-orange-50 rounded-lg"><Settings size={16} /></button>
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
      {isAddOpen && <AddFoodRest onClose={() => setIsAddOpen(false)} />}
      {editingFood && <EditFoodRest food={editingFood} onClose={() => setEditingFood(null)} />}
      {deletingFood && <DeleteFoodRest food={deletingFood} onClose={() => setDeletingFood(null)} />}
      {settingFood && <SetFoodRest food={settingFood} onClose={() => setSettingFood(null)} />}
      {markingFood && <MarkFoodRest food={markingFood} onClose={() => setMarkingFood(null)} />}

    </div>
  );
};

export default FoodListing;
