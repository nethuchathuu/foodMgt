import React from 'react';
import { ShoppingCart } from 'lucide-react';

const TodayOrders = () => {
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
          <h4 className="text-3xl font-bold text-gray-800">45</h4>
          <span className="text-sm text-gray-500">orders</span>
        </div>
        <div className="mt-2 flex gap-3 text-xs font-medium">
          <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded">32 Accepted</span>
          <span className="text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded">13 Pending</span>
        </div>
      </div>
    </div>
  );
};

export default TodayOrders;
