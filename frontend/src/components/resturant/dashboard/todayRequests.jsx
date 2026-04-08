import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const TodayRequests = ({ data }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between"
    >
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">Today's Requests</p>
        <h3 className="text-3xl font-bold text-gray-800">{data || 0}</h3>
      </div>
      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
        <Heart className="text-green-500" size={24} />
      </div>
    </motion.div>
  );
};

export default TodayRequests;
