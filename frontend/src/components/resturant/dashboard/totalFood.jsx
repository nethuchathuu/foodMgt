import React from 'react';
import { Utensils } from 'lucide-react';

const TotalFood = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-[#A7D63B]/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
          <Utensils className="w-6 h-6 text-[#1F5E2A]" />
        </div>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">Today</span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">Total Food Menus</p>
        <div className="flex items-baseline gap-2">
          <h4 className="text-3xl font-bold text-gray-800">{data || 0}</h4>
          <span className="text-sm text-gray-500">Total</span>
        </div>
      </div>
    </div>
  );
};

export default TotalFood;
