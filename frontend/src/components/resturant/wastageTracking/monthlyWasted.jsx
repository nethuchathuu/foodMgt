import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const initialLogs = {
  "Week 1": [
    { id: 1, food: "Vegetables", qty: 12, unit: "kg", emoji: "🥦" },
    { id: 2, food: "Bread", qty: 30, unit: "units", emoji: "🍞" }
  ],
  "Week 2": [
    { id: 3, food: "Chicken", qty: 5, unit: "kg", emoji: "🍗" },
    { id: 4, food: "Salad", qty: 2000, unit: "g", emoji: "🥗" }
  ],
  "Week 3": [
    { id: 5, food: "Cooked Rice", qty: 15, unit: "kg", reason: "Event cancellation", emoji: "🍛" }
  ],
  "Week 4": [
    { id: 6, food: "Dairy", qty: 4, unit: "kg", emoji: "🥛" },
    { id: 7, food: "Fruit", qty: 2500, unit: "g", emoji: "🍎" }
  ]
};

const MonthlyWasted = ({ selectedDate }) => {
  const [logs, setLogs] = useState(initialLogs);

  const handleDelete = (week, id) => {
    setLogs(prev => ({
      ...prev,
      [week]: prev[week].filter(log => log.id !== id)
    }));
  };

  const getEmoji = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('rice')) return "🍛";
    if (lowerName.includes('chicken') || lowerName.includes('meat')) return "🍗";
    if (lowerName.includes('salad') || lowerName.includes('veg')) return "🥗";
    if (lowerName.includes('bread') || lowerName.includes('bun')) return "🍞";
    if (lowerName.includes('fruit')) return "🍎";
    if (lowerName.includes('dairy')) return "🥛";
    return "🍽️";
  };

  const renderWeek = (week, items) => {
    if (items.length === 0) return null;

    return (
      <div key={week} className="mb-6">
        <h3 className="text-sm font-semibold text-[#9BC7D8] mb-3 uppercase tracking-wider">{week}</h3>
        <div className="space-y-3">
          <AnimatePresence>
            {items.map((item) => {
              const isHigh = 
                (item.unit === 'kg' && item.qty >= 10) || 
                (item.unit === 'g' && item.qty >= 2000) || 
                (item.unit === 'units' && item.qty >= 50);
                
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  whileHover={{ y: -2 }}
                  className={`flex justify-between items-center bg-white px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition group overflow-hidden relative ${isHigh ? 'border-l-4 border-red-400' : 'border-l-4 border-[#C8E66A]'}`}
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
                    onClick={() => handleDelete(week, item.id)}
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

  const hasLogs = Object.values(logs).some(weekLogs => weekLogs.length > 0);
  
  const monthName = selectedDate ? selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' }) : new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl"
    >
      <h2 className="text-2xl font-bold text-[#1F5E2A] border-b pb-2 mb-6">
        This Month Wastage
        <span className="block text-sm font-normal text-gray-500 mt-1">
          {monthName}
        </span>
      </h2>

      {!hasLogs ? (
        <div className="text-center text-gray-400 mt-10 p-8 bg-white/50 rounded-2xl border border-dashed border-[#D8C3A5]">
          <p className="text-lg">No wastage recorded this month 🌿</p>
          <p className="text-sm mt-2">Zero waste champion!</p>
        </div>
      ) : (
        <>
          {Object.keys(initialLogs).map(week => renderWeek(week, logs[week]))}
        </>
      )}
    </motion.div>
  );
};

export default MonthlyWasted;
