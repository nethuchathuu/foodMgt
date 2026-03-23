import React from 'react';
import { DollarSign } from 'lucide-react';

const MoneyLost = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-[#D67A5C]/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
          <DollarSign className="w-6 h-6 text-[#D67A5C]" />
        </div>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">Today</span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">Financial Loss</p>
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-gray-800">LKR</span>
          <h4 className="text-3xl font-bold text-gray-800">4,500</h4>
        </div>
        <p className="text-xs text-red-500 font-medium mt-2 flex items-center gap-1">
          <span>+8%</span>
          <span className="text-gray-400 font-normal">from yesterday</span>
        </p>
      </div>
    </div>
  );
};

export default MoneyLost;
