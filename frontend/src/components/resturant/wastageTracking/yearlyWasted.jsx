import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const initialLogs = {
  "January": [
    { id: 1, food: "Overall Waste", qty: 350, unit: "kg", emoji: "🗑️" }
  ],
  "February": [
    { id: 2, food: "Overall Waste", qty: 280, unit: "kg", emoji: "🗑️" }
  ],
  "March": [
    { id: 3, food: "Event Spoilage", qty: 450, unit: "kg", reason: "Major event cancellation", emoji: "🗑️" }
  ],
  "April": [
    { id: 4, food: "Overall Waste", qty: 310, unit: "kg", emoji: "🗑️" }
  ]
};

const YearlyWasted = ({ selectedDate }) => {
  const [logs, setLogs] = useState(initialLogs);

  const handleDelete = (month, id) => {
    setLogs(prev => ({
      ...prev,
      [month]: prev[month].filter(log => log.id !== id)
    }));
  };

  const renderMonth = (month, items) => {
    if (items.length === 0) return null;

    return (
      <div key={month} className="mb-6">
        <h3 className="text-sm font-semibold text-[#A7D63B] mb-3 uppercase tracking-wider">{month}</h3>
        <div className="space-y-3">
          <AnimatePresence>
            {items.map((item) => {
              const isHigh = item.qty >= 400; // arbitrary threshold for yearly view
                
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
                    <span className="text-2xl">{item.emoji}</span>
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
                    onClick={() => handleDelete(month, item.id)}
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

  const hasLogs = Object.values(logs).some(monthLogs => monthLogs.length > 0);
  
  const yearStr = selectedDate ? selectedDate.getFullYear() : new Date().getFullYear();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl"
    >
      <h2 className="text-2xl font-bold text-[#1F5E2A] border-b pb-2 mb-6">
        This Year Wastage
        <span className="block text-sm font-normal text-gray-500 mt-1">
          {yearStr}
        </span>
      </h2>

      {!hasLogs ? (
        <div className="text-center text-gray-400 mt-10 p-8 bg-white/50 rounded-2xl border border-dashed border-[#D8C3A5]">
          <p className="text-lg">No wastage recorded this year 🌿</p>
        </div>
      ) : (
        <>
          {Object.keys(initialLogs).map(month => renderMonth(month, logs[month] || []))}
        </>
      )}
    </motion.div>
  );
};

export default YearlyWasted;
