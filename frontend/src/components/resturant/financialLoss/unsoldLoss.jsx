import React from 'react';
import { motion } from 'framer-motion';

const getEmoji = (name) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('rice')) return "🍛";
  if (lowerName.includes('bread')) return "🍞";
  if (lowerName.includes('salad')) return "🥗";
  if (lowerName.includes('curry')) return "🍲";
  return "🍽️";
};

const UnsoldLoss = ({ data }) => {
  const total = data.reduce((acc, item) => acc + item.lostRevenue, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-3"
    >
      <p className="text-gray-500 mb-4 ml-1">Revenue lost from food that was safe but not sold.</p>
      {data.map((item) => (
        <motion.div 
          key={item.id}
          whileHover={{ y: -2 }}
          className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100"
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">{getEmoji(item.foodName)}</span>
            <div>
              <h3 className="text-lg font-bold text-[#1F5E2A]">{item.foodName}</h3>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-sm font-medium text-gray-500">Qty: {item.quantity} {item.unit}</p>
                <span className="text-xs text-gray-400 line-through">Retail: Rs. {item.originalPrice}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-[#9BC7D8]">Rs. {item.lostRevenue.toLocaleString()}</p>
          </div>
        </motion.div>
      ))}

      <div className="text-right mt-6 pt-4 border-t border-gray-200">
        <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Total Unsold Loss</p>
        <p className="text-3xl font-extrabold text-[#9BC7D8] mt-1">Rs. {total.toLocaleString()}</p>
      </div>
    </motion.div>
  );
};

export default UnsoldLoss;
