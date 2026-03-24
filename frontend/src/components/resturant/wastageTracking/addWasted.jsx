import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AddWasted = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    foodName: '',
    quantity: '',
    unit: 'kg',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.foodName.trim() || !formData.quantity || !formData.reason) return;
    
    onSave({
      foodName: formData.foodName.trim(),
      quantity: Number(formData.quantity),
      unit: formData.unit,
      reason: formData.reason
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-[1.5rem] shadow-2xl p-8 w-full max-w-md mx-auto relative"
      >
        <h2 className="text-2xl font-bold text-[#1F5E2A] mb-6">Add Wastage</h2>

        <form onSubmit={handleSubmit} className="grid gap-5">
          {/* Food Name */}
          <div>
            <label className="block text-sm font-semibold text-[#1F5E2A] mb-1">Food Name</label>
            <input 
              type="text" 
              name="foodName"
              value={formData.foodName}
              onChange={handleChange}
              placeholder="e.g. Rice, Bread, Curry" 
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#D67A5C] outline-none transition bg-[#F8F8F6]/50"
              required
            />
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
               🍛 Rice | 🍞 Bread | 🥗 Salad
            </p>
          </div>

          {/* Quantity & Unit Row */}
          <div className="flex gap-4">
            <div className="flex-[2]">
              <label className="block text-sm font-semibold text-[#1F5E2A] mb-1">Quantity</label>
              <input 
                type="number" 
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity" 
                min="0.1"
                step="0.1"
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#D67A5C] outline-none transition bg-[#F8F8F6]/50"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-[#1F5E2A] mb-1">Unit</label>
              <select 
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#D67A5C] outline-none transition bg-[#F8F8F6]/50 appearance-none"
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="units">units</option>
              </select>
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-semibold text-[#1F5E2A] mb-1">Reason</label>
            <select 
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#D67A5C] outline-none transition bg-[#F8F8F6]/50 appearance-none"
              required
            >
              <option value="" disabled>Select a reason...</option>
              <option value="Expired">Expired</option>
              <option value="Overcooked">Overcooked</option>
              <option value="Customer leftovers">Customer leftovers</option>
              <option value="Storage issue">Storage issue</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex flex-col gap-2">
            <button 
              type="submit"
              className="bg-[#D67A5C] text-white w-full py-3.5 rounded-xl font-bold shadow-md hover:scale-[1.02] hover:bg-[#E9A38E] transition-all"
            >
              Save Wastage
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl font-semibold text-gray-500 hover:text-[#1F5E2A] hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddWasted;
