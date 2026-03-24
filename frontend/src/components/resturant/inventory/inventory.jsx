import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Search, Edit2, Trash2, Package } from 'lucide-react';
import InventoryFormModal from './inventoryFormModal';

const getEmoji = (name) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('rice')) return "🍛";
  if (lowerName.includes('bread') || lowerName.includes('bun')) return "🍞";
  if (lowerName.includes('salad') || lowerName.includes('veg')) return "🥗";
  if (lowerName.includes('chicken') || lowerName.includes('meat')) return "🍗";
  if (lowerName.includes('curry')) return "🍲";
  return "🍲";
};

const initialInventory = [
  { id: 1, foodName: "Rice", unit: "kg", pricePerUnit: 200, priceType: "Making Cost" },
  { id: 2, foodName: "Bread", unit: "units", pricePerUnit: 50, priceType: "Making Cost" },
  { id: 3, foodName: "Chicken Curry", unit: "kg", pricePerUnit: 800, priceType: "Actual Cost" },
];

const Inventory = () => {
  const [items, setItems] = useState(initialInventory);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const filteredItems = items.filter(item => 
    item.foodName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = (itemData) => {
    if (editingItem) {
      setItems(items.map(item => item.id === editingItem.id ? { ...itemData, id: item.id } : item));
    } else {
      setItems([{ ...itemData, id: Date.now() }, ...items]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
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
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openAddModal}
            className="bg-[#A7D63B] text-[#1F5E2A] px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-[#C8E66A] transition flex items-center gap-2 whitespace-nowrap"
          >
            <PlusCircle size={20} /> Add Item
          </motion.button>
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
                  key={item.id}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <span className="text-6xl">{getEmoji(item.foodName)}</span>
                  </div>

                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-2xl font-bold text-[#1F5E2A] flex items-center gap-2">
                      <span className="text-3xl">{getEmoji(item.foodName)}</span> {item.foodName}
                    </h3>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openEditModal(item)}
                        className="p-2 text-[#9BC7D8] hover:bg-blue-50 rounded-xl transition"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
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
                       <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.priceType}</span>
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
    </div>
  );
};

export default Inventory;
