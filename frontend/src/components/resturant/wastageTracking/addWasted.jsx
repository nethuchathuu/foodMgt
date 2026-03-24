import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Leaf } from 'lucide-react';

const reasons = [
  "Expired",
  "Overcooked / Burnt",
  "Customer Leftovers",
  "Storage / Spoilage Issue",
  "Spilled / Dropped",
  "Other"
];

const AddWasted = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    foodName: '',
    quantity: '',
    unit: 'kg',
    reason: '',
    otherReason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving Wastage:", formData);
    // Add logic to save here
    onClose();
    // Reset form
    setFormData({ foodName: '', quantity: '', unit: 'kg', reason: '', otherReason: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1F5E2A]/30 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden z-10"
          >
            {/* Header */}
            <div className="bg-[#D67A5C] p-6 text-white relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Leaf size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Log Food Wastage</h2>
                  <p className="text-white/80 text-sm mt-1">Track to help reduce future waste</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-5 bg-[#F8F8F6]">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Food Name / Item</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rice, Bread, Mixed Vegetables"
                  className="w-full bg-white border border-[#D8C3A5] rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#D67A5C] focus:border-transparent transition-all shadow-sm"
                  value={formData.foodName}
                  onChange={(e) => setFormData({...formData, foodName: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Amount</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    step="0.1"
                    placeholder="0.0"
                    className="w-full bg-white border border-[#D8C3A5] rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#D67A5C] focus:border-transparent transition-all shadow-sm"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Unit</label>
                  <select 
                    className="w-full bg-white border border-[#D8C3A5] rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#D67A5C] outline-none shadow-sm cursor-pointer"
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  >
                    <option value="kg">kg</option>
                    <option value="g">grams</option>
                    <option value="liters">liters</option>
                    <option value="units">units</option>
                    <option value="portions">portions</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Reason</label>
                <div className="grid grid-cols-2 gap-2">
                  {reasons.map((r) => (
                    <div 
                      key={r}
                      onClick={() => setFormData({...formData, reason: r})}
                      className={`p-3 rounded-xl border cursor-pointer text-sm font-medium transition-all text-center ${
                        formData.reason === r 
                          ? 'bg-[#D67A5C]/10 border-[#D67A5C] text-[#D67A5C]' 
                          : 'bg-white border-[#D8C3A5]/50 text-gray-600 hover:border-[#D67A5C]/50'
                      }`}
                    >
                      {r}
                    </div>
                  ))}
                </div>
              </div>

              {formData.reason === 'Other' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <input 
                    type="text" 
                    required
                    placeholder="Please specify..."
                    className="w-full bg-white border border-[#D8C3A5] rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#D67A5C] shadow-sm mt-2"
                    value={formData.otherReason}
                    onChange={(e) => setFormData({...formData, otherReason: e.target.value})}
                  />
                </motion.div>
              )}

              <div className="pt-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#D67A5C] text-white py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all flex justify-center items-center gap-2"
                >
                  <Save size={20} />
                  Save Wastage Record
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddWasted;
