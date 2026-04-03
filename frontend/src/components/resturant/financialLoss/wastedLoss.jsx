import React from 'react';
import { motion } from 'framer-motion';

const WastedLoss = ({ data }) => {
  const total = data.reduce((acc, item) => acc + item.loss, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-3"
    >
      <p className="text-gray-500 mb-4 ml-1">Money lost due to food being wasted directly.</p>
      {data.map((item) => (
        <motion.div 
          key={item.id || item._id}
          whileHover={{ y: -2 }}
          className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100"
        >
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#1F5E2A]">{item.foodName}</h3>
              <p className="text-sm font-medium text-gray-500 mt-1">Qty: {item.quantity} {item.unit}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-[#D67A5C]">Rs. {item.loss.toLocaleString()}</p>
          </div>
        </motion.div>
      ))}

      <div className="text-right mt-6 pt-4 border-t border-gray-200">
        <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Total Wasted Loss</p>
        <p className="text-3xl font-extrabold text-[#D67A5C] mt-1">Rs. {total.toLocaleString()}</p>
      </div>
    </motion.div>
  );
};

export default WastedLoss;
