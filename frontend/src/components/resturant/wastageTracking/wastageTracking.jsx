import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Leaf, Trash2 } from 'lucide-react';
import AddWasted from './addWasted';

const getEmoji = (name) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('rice')) return "🍛";
  if (lowerName.includes('chicken') || lowerName.includes('meat')) return "🍗";
  if (lowerName.includes('salad') || lowerName.includes('veg')) return "🥗";
  if (lowerName.includes('bread') || lowerName.includes('bun')) return "🍞";
  if (lowerName.includes('curry')) return "🍲";
  return "🍽️";
};

const WastageTracking = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [logs, setLogs] = useState([
    { id: 1, foodName: "Rice", quantity: 3, unit: "kg", reason: "Overcooked" },
    { id: 2, foodName: "Rice", quantity: 2, unit: "kg", reason: "Expired" },
    { id: 3, foodName: "Bread", quantity: 6, unit: "units", reason: "Expired" },
    { id: 4, foodName: "Bread", quantity: 4, unit: "units", reason: "Customer leftovers" },
  ]);

  const handleAddLog = (newLog) => {
    setLogs([{ ...newLog, id: Date.now() }, ...logs]);
  };

  const handleDelete = (id) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  const groupedLogs = logs.reduce((acc, log) => {
    if (!acc[log.foodName]) {
      acc[log.foodName] = { 
        items: [], 
        total: 0, 
        unit: log.unit 
      };
    }
    acc[log.foodName].items.push(log);
    acc[log.foodName].total += Number(log.quantity);
    return acc;
  }, {});

  return (
    <div className="bg-[#F8F8F6] min-h-screen p-6 font-sans pb-24 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8 pt-4"
        >
          <div>
            <h1 className="text-3xl font-extrabold text-[#1F5E2A] flex items-center gap-2">
              Today's Wastage ♻️
            </h1>
            <p className="text-gray-500 mt-1">Track and reduce daily food waste</p>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#D67A5C] text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-[#E9A38E] transition flex items-center gap-2"
          >
            <PlusCircle size={20} /> <span className="hidden sm:inline">Add Wastage</span>
          </motion.button>
        </motion.div>

        {/* List Content */}
        {logs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-gray-400 mt-16 p-10 bg-white/50 rounded-3xl border border-dashed border-[#D8C3A5]"
          >
            <Leaf size={48} className="mx-auto mb-4 text-[#A7D63B] opacity-50" />
            <p className="text-xl font-semibold text-[#1F5E2A]">No wastage recorded today 🌿</p>
            <p className="text-md mt-2">Great job! Keep reducing food waste.</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {Object.entries(groupedLogs).map(([foodName, group]) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={foodName}
                  className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition group"
                >
                  <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-3">
                    <h2 className="text-xl font-bold text-[#1F5E2A] flex items-center gap-2">
                      <span className="text-2xl">{getEmoji(foodName)}</span> {foodName}
                    </h2>
                    <div className="text-sm font-semibold text-[#D67A5C] bg-[#D67A5C]/10 px-3 py-1 rounded-lg">
                      Total: {group.total} {group.unit}
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    {group.items.map((item) => (
                      <motion.div 
                        key={item.id}
                        whileHover={{ x: 4 }}
                        className="flex justify-between items-center bg-[#F8F8F6] px-4 py-3 rounded-xl group/item"
                      >
                        <span className="text-sm text-gray-600 font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#A7D63B]"></span>
                          {item.reason}
                        </span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold text-[#1F5E2A]">
                            {item.quantity} {item.unit}
                          </span>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="text-gray-400 hover:text-red-500 transition opacity-0 group-hover/item:opacity-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isAddModalOpen && (
          <AddWasted 
            isOpen={isAddModalOpen} 
            onClose={() => setIsAddModalOpen(false)} 
            onSave={handleAddLog}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WastageTracking;
