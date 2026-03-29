import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const InventoryFormModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    unit: 'kg',
    pricePerUnit: '',
    lossPrice: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || initialData.foodName || '',
        unit: initialData.unit || 'kg',
        pricePerUnit: initialData.pricePerUnit || '',
        lossPrice: initialData.lossPrice || ''
      });
    } else {
      setFormData({
        name: '',
        unit: 'kg',
        pricePerUnit: '',
        lossPrice: ''
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.pricePerUnit || !formData.lossPrice) return;
    
    onSave({
      ...formData,
      name: formData.name.trim(),
      pricePerUnit: Number(formData.pricePerUnit),
      lossPrice: Number(formData.lossPrice),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-[2rem] shadow-2xl p-8 w-full max-w-md mx-auto relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#C8E66A] to-[#A7D63B]"></div>
        
        <h2 className="text-2xl font-bold text-[#1F5E2A] mb-6">
          {initialData ? 'Edit Inventory Item' : 'Add Inventory Item'}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-5">
          {/* Food Name */}
          <div>
            <label className="block text-sm font-semibold text-[#1F5E2A] mb-1">Food Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rice, Chicken, Bread" 
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition bg-[#F8F8F6]/50"
              required
            />
          </div>

          <div className="flex gap-4">
            {/* Unit */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-[#1F5E2A] mb-1">Unit Type</label>
              <select 
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition bg-[#F8F8F6]/50 appearance-none font-bold text-[#1F5E2A]"
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="L">L</option>
                <option value="ml">ml</option>
                <option value="units">units</option>
                <option value="portion">portion</option>
              </select>
            </div>
            
            {/* Price */}
            <div className="flex-[2]">
              <label className="block text-sm font-semibold text-[#1F5E2A] mb-1">Price Per Unit (Rs.)</label>
              <input 
                type="number" 
                name="pricePerUnit"
                value={formData.pricePerUnit}
                onChange={handleChange}
                placeholder={`0.00`} 
                min="0"
                step="0.1"
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition bg-[#F8F8F6]/50 font-bold"
                required
              />
            </div>
          </div>
          
          <p className="text-xs text-gray-400 -mt-2">Example: 1kg = Rs. 200 or 1 unit = Rs. 50</p>

          {/* Price Type */}
          <div>
            <label className="block text-sm font-semibold text-[#1F5E2A] mb-1">Loss Price</label>
            <input 
              type="number" 
              name="lossPrice"
              value={formData.lossPrice}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.1"
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition bg-[#F8F8F6]/50 font-bold"
              required
            />
          </div>

          {/* Buttons */}
          <div className="mt-4 flex flex-col gap-2 relative z-10">
            <button 
              type="submit"
              className="bg-[#A7D63B] text-[#1F5E2A] w-full py-3.5 rounded-xl font-bold shadow-md hover:scale-[1.02] hover:bg-[#C8E66A] transition-all"
            >
              Save Item
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl font-semibold text-gray-500 hover:text-[#1F5E2A] hover:bg-gray-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default InventoryFormModal;
