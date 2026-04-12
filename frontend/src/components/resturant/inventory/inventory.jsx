import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Search, Edit2, Trash2, Package } from 'lucide-react';
import InventoryFormModal from './inventoryFormModal';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isClearAllOpen, setIsClearAllOpen] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/inventory', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const filteredItems = items.filter(item => 
    (item.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = async (itemData) => {
    try {
      const token = localStorage.getItem('token');
      if (editingItem) {
        const response = await axios.put(`http://localhost:5000/api/inventory/${editingItem._id}`, itemData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setItems(items.map(item => item._id === editingItem._id ? response.data : item));
      } else {
        const response = await axios.post('http://localhost:5000/api/inventory', itemData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setItems([response.data, ...items]);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving inventory item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/inventory/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleClearAll = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:5000/api/inventory/delete-all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems([]);
      setIsClearAllOpen(false);
    } catch (error) {
      console.error('Failed to clear all inventory items:', error);
      alert('Failed to clear all inventory items');
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="bg-[#F8F8F6] min-h-screen p-6 font-sans pb-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 pt-4"
        >
          <div>
            <h1 className="text-3xl font-extrabold text-[#1F5E2A] flex items-center gap-3">
              Inventory Management 📦
            </h1>
            <p className="text-gray-500 mt-1">Manage food cost per unit for accurate loss tracking.</p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setIsClearAllOpen(true)}
              className="bg-red-100 text-red-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-red-200 hover:scale-105 transition-all flex items-center gap-2"
              disabled={items.length === 0}
            >
              <Trash2 size={20} />
              Clear All
            </button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openAddModal}
              className="bg-[#A7D63B] text-[#1F5E2A] px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-[#C8E66A] transition flex items-center gap-2 whitespace-nowrap"
            >
              <PlusCircle size={20} /> Add Item
            </motion.button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-100 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A7D63B] shadow-sm transition-all text-[#1F5E2A] font-medium"
            placeholder="Search inventory items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>

        {/* List Content */}
        {filteredItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-gray-400 mt-16 p-12 bg-white/50 rounded-3xl border border-dashed border-[#D8C3A5]"
          >
            <Package size={48} className="mx-auto mb-4 text-[#A7D63B] opacity-50" />
            <p className="text-xl font-semibold text-[#1F5E2A]">No inventory items yet 📦</p>
            <p className="text-md mt-2">Add food items to start tracking costs effectively.</p>
          </motion.div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -4 }}
                  key={item._id}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-2xl font-bold text-[#1F5E2A] flex items-center gap-2">
                      {item.name || item.foodName}
                    </h3>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openEditModal(item)}
                        className="p-2 text-[#9BC7D8] hover:bg-blue-50 rounded-xl transition"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="p-2 text-[#D67A5C] hover:bg-red-50 rounded-xl transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 relative z-10">
                    <div className="flex justify-between items-center bg-gray-50 px-4 py-2.5 rounded-xl">
                      <span className="text-sm font-semibold text-gray-500">Unit Type</span>
                      <span className="text-sm font-bold text-[#1F5E2A] bg-white px-3 py-1 rounded-lg border border-gray-100 shadow-sm">{item.unit}</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#D67A5C]/5 px-4 py-2.5 rounded-xl">
                      <span className="text-sm font-semibold text-gray-500">Price / {item.unit}</span>
                      <span className="text-md font-black text-[#D67A5C]">Rs. {item.pricePerUnit}</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2">
                       <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loss Price: Rs. {item.lossPrice}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <InventoryFormModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            onSave={handleSave}
            initialData={editingItem}
          />
        )}
      </AnimatePresence>

      {isClearAllOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all scale-100 opacity-100 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Trash2 className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Clear All Items?</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Are you sure you want to permanently clear all your inventory items? This action cannot be undone.
            </p>
            <div className="flex gap-4 w-full">
              <button 
                onClick={() => setIsClearAllOpen(false)}
                className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleClearAll}
                className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all active:scale-95"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
