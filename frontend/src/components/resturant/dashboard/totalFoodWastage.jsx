import React from 'react';
import { Trash2 } from 'lucide-react';

const TotalFoodWastage = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-[#E9A38E]/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
          <Trash2 className="w-6 h-6 text-[#E9A38E]" />
        </div>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">Today</span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">Total Food Wastage</p>
        <div className="flex items-baseline gap-2">
          <h4 className="text-3xl font-bold text-gray-800">{data || 0}</h4>
          <span className="text-sm text-gray-500">kg/units</span>
        </div>
        <p className="text-xs text-red-500 font-medium mt-2 flex items-center gap-1">
          <span>+2.1kg</span>
          <span className="text-gray-400 font-normal">from yesterday</span>
        </p>
      </div>
    </div>
  );
};

export default TotalFoodWastage;
