import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const initialLogs = [
  { id: 1, food: "Rice Bowls", qty: 5, unit: "kg", reason: "Expired", emoji: "🍛" },
  { id: 2, food: "Vegetable Curry", qty: 2, unit: "kg", reason: "Customer Leftovers", emoji: "🍲" },
  { id: 3, food: "Bread", qty: 10, unit: "units", reason: "Overcooked", emoji: "🍞" },
  { id: 4, food: "Salad", qty: 300, unit: "g", reason: "Wilted", emoji: "🥗" },
  { id: 5, food: "Chicken", qty: 1.5, unit: "kg", reason: "Spoiled", emoji: "🍗" },
];

const DailyWasted = ({ selectedDate }) => {
  const [logs, setLogs] = useState(initialLogs);

  const handleDelete = (id) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  const getEmoji = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('rice')) return "🍛";
    if (lowerName.includes('chicken') || lowerName.includes('meat')) return "🍗";
    if (lowerName.includes('salad') || lowerName.includes('veg')) return "🥗";
    if (lowerName.includes('bread') || lowerName.includes('bun')) return "🍞";
    return "🍽️";
  };

  const groupedLogs = {
    kg: logs.filter(log => log.unit === 'kg'),
    g: logs.filter(log => log.unit === 'g'),
    units: logs.filter(log => log.unit === 'units')
  };

  const renderSection = (title, items, unitLabel) => {
    if (items.length === 0) return null;

    const total = items.reduce((acc, curr) => acc + curr.qty, 0);

    return (
      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
          <h3 className="text-lg font-bold text-[#1F5E2A]">{title}</h3>
          <span className="text-sm font-semibold text-gray-500">Total: {total} {unitLabel}</span>
        </div>
        <div className="space-y-3">
          <AnimatePresence>
            {items.map((item) => {
              const isHigh = 
                (item.unit === 'kg' && item.qty >= 5) || 
                (item.unit === 'g' && item.qty >= 1000) || 
                (item.unit === 'units' && item.qty >= 20);
                
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  whileHover={{ y: -2 }}
                  className={`flex justify-between items-center bg-white px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition group overflow-hidden relative ${isHigh ? 'border-l-4 border-red-400' : 'border-l-4 border-[#A7D63B]'}`}
                >
                  <div className="flex items-center gap-3 relative z-10 w-full">
                    <span className="text-2xl">{item.emoji || getEmoji(item.food)}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.food}</p>
                      {item.reason && <p className="text-xs text-gray-400">{item.reason}</p>}
                    </div>
                    <div className="flex flex-col items-end pr-2 md:pr-10">
                      <span className={`font-bold ${isHigh ? 'text-red-500' : 'text-[#1F5E2A]'}`}>
                        {item.qty} {item.unit}
                      </span>
                    </div>
                  </div>
                  {/* Swipe-to-delete simulation / Desktop delete button */}
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="absolute right-0 top-0 bottom-0 w-12 bg-red-100 text-red-500 flex items-center justify-center translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl"
    >
      <h2 className="text-2xl font-bold text-[#1F5E2A] border-b pb-2 mb-6">
        Today's Wastage
        <span className="block text-sm font-normal text-gray-500 mt-1">
          {selectedDate ? selectedDate.toDateString() : new Date().toDateString()}
        </span>
      </h2>

      {logs.length === 0 ? (
        <div className="text-center text-gray-400 mt-10 p-8 bg-white/50 rounded-2xl border border-dashed border-[#D8C3A5]">
          <p className="text-lg">No wastage recorded today 🌿</p>
          <p className="text-sm mt-2">Great job keeping waste minimal!</p>
        </div>
      ) : (
        <>
          {renderSection("Kilograms (kg)", groupedLogs.kg, "kg")}
          {renderSection("Grams (g)", groupedLogs.g, "g")}
          {renderSection("Units", groupedLogs.units, "units")}
        </>
      )}
    </motion.div>
  );
};

export default DailyWasted;
