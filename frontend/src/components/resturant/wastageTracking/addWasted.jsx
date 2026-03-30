import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const AddWasted = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    inventoryId: '',
    quantity: '',
    unit: '',
    reason: '',
    otherReason: ''
  });
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/inventory', { headers: { Authorization: `Bearer ${token}` } });
        setInventory(res.data || []);
      } catch (err) {
        console.error('Failed to fetch inventory', err);
      }
    };
    fetchInventory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.inventoryId || !formData.quantity || !formData.reason) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        inventoryId: formData.inventoryId,
        quantity: Number(formData.quantity),
        reason: formData.reason,
        otherReason: formData.otherReason
      };
      const res = await axios.post('http://localhost:5000/api/wastage', payload, { headers: { Authorization: `Bearer ${token}` } });
      const w = res.data.wastage;
      // Normalize returned object for parent
      onSave({ id: w._id, foodName: w.foodName, quantity: w.quantity, unit: w.unit, reason: w.reason });
      onClose();
    } catch (err) {
      console.error('Failed to save wastage', err);
    } finally {
      setLoading(false);
    }
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
          {/* Food Name (from inventory) */}
          <div>
            <label className="block text-sm font-semibold text-[#1F5E2A] mb-1">Food Item</label>
            <select
              name="inventoryId"
              value={formData.inventoryId}
              onChange={(e) => {
                const id = e.target.value;
                const item = inventory.find(i => i._id === id);
                setFormData(prev => ({ ...prev, inventoryId: id, unit: item?.unit || '', otherReason: '' }));
              }}
              className="w-full border rounded-xl p-3 focus:ring-[#D67A5C] outline-none transition"
              required
            >
              <option value="">Select food from inventory...</option>
              {inventory.map(it => (
                <option key={it._id} value={it._id}>{it.name} — {it.unit}</option>
              ))}
            </select>
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
              <input type="text" name="unit" value={formData.unit} disabled className="w-full border rounded-xl p-3 bg-gray-50" />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-semibold text-[#1F5E2A] mb-1">Reason</label>
            <select 
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 focus:ring-[#D67A5C] outline-none transition"
              required
            >
              <option value="" disabled>Select a reason...</option>
              <option value="Expired">Expired</option>
              <option value="Overcooked">Overcooked</option>
              <option value="Customer leftovers">Customer leftovers</option>
              <option value="Storage issue">Storage issue</option>
              <option value="Other">Other</option>
            </select>
            {formData.reason === 'Other' && (
              <input
                name="otherReason"
                value={formData.otherReason}
                onChange={handleChange}
                placeholder="Please specify"
                className="mt-3 w-full border rounded-xl p-3 focus:ring-[#D67A5C] outline-none transition"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="mt-4 flex flex-col gap-2">
            <button 
              type="submit"
              disabled={loading}
              className="bg-[#D67A5C] text-white w-full py-3.5 rounded-xl font-bold shadow-md hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Wastage'}
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
