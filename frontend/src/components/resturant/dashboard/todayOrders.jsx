import React from 'react';
import { ShoppingCart } from 'lucide-react';

const TodayOrders = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-[#9BC7D8]/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
          <ShoppingCart className="w-6 h-6 text-[#9BC7D8]" />
        </div>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">Today</span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">Today's Orders</p>
        <div className="flex items-baseline gap-2">
          <h4 className="text-3xl font-bold text-gray-800">{data || 0}</h4>
          <span className="text-sm text-gray-500">orders</span>
        </div>
      </div>
    </div>
  );
};

export default TodayOrders;
