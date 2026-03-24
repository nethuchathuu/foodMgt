import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const initialLogs = {
  "Monday": [
    { id: 1, food: "Rice Bowls", qty: 2, unit: "kg", emoji: "🍛" }
  ],
  "Tuesday": [
    { id: 2, food: "Bread", qty: 15, unit: "units", emoji: "🍞" }
  ],
  "Wednesday": [],
  "Thursday": [
    { id: 3, food: "Vegetable Curry", qty: 3, unit: "kg", emoji: "🍲" }
  ],
  "Friday": [
    { id: 4, food: "Salad", qty: 500, unit: "g", emoji: "🥗" }
  ],
  "Saturday": [
    { id: 5, food: "Chicken", qty: 8, unit: "kg", reason: "Spoiled batch", emoji: "🍗" }
  ],
  "Sunday": [
    { id: 6, food: "Rice Bowls", qty: 1.5, unit: "kg", emoji: "🍛" }
  ]
};

const WeeklyWasted = ({ selectedDate }) => {
  const [logs, setLogs] = useState(initialLogs);

  const handleDelete = (day, id) => {
    setLogs(prev => ({
      ...prev,
      [day]: prev[day].filter(log => log.id !== id)
    }));
  };

  const getEmoji = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('rice')) return "🍛";
    if (lowerName.includes('chicken') || lowerName.includes('meat')) return "🍗";
    if (lowerName.includes('salad') || lowerName.includes('veg')) return "🥗";
    if (lowerName.includes('bread') || lowerName.includes('bun')) return "🍞";
    return "🍽️";
  };

  const renderDay = (day, items) => {
    if (items.length === 0) return null;

    return (
      <div key={day} className="mb-6">
        <h3 className="text-sm font-semibold text-[#D67A5C] mb-3 uppercase tracking-wider">{day}</h3>
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
                  className={`flex justify-between items-center bg-white px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition group overflow-hidden relative ${isHigh ? 'border-l-4 border-red-400' : 'border-l-4 border-[#9BC7D8]'}`}
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
                  <button 
                    onClick={() => handleDelete(day, item.id)}
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

  const hasLogs = Object.values(logs).some(dayLogs => dayLogs.length > 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl"
    >
      <h2 className="text-2xl font-bold text-[#1F5E2A] border-b pb-2 mb-6">
        This Week Wastage
        <span className="block text-sm font-normal text-gray-500 mt-1">
          {selectedDate ? `Week of ${selectedDate.toDateString()}` : "Current Week"}
        </span>
      </h2>

      {!hasLogs ? (
        <div className="text-center text-gray-400 mt-10 p-8 bg-white/50 rounded-2xl border border-dashed border-[#D8C3A5]">
          <p className="text-lg">No wastage recorded this week 🌿</p>
          <p className="text-sm mt-2">Excellent resource management!</p>
        </div>
      ) : (
        <>
          {Object.keys(initialLogs).map(day => renderDay(day, logs[day]))}
        </>
      )}
    </motion.div>
  );
};

export default WeeklyWasted;
