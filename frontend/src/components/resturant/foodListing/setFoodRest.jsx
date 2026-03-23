import React from 'react';
import { X, Settings } from 'lucide-react';

const SetFoodRest = ({ food, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm m-4 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        <div className="bg-orange-50 px-6 py-5 border-b border-orange-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Settings className="w-5 h-5 text-orange-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Quick Set</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-orange-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-sm text-gray-500 font-medium mb-4">Adjusting settings for <span className="text-gray-800 font-bold">{food?.name}</span></p>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Discount Price ($)</label>
            <input type="number" defaultValue={food?.discountPrice} className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-orange-400 outline-none transition" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Quantity Remaining</label>
            <input type="number" defaultValue={food?.quantity} className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-orange-400 outline-none transition" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Expiry Time</label>
            <select className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-orange-400 outline-none transition bg-white">
              <option>1 hour</option>
              <option>2 hours</option>
              <option>4 hours</option>
              <option>End of day</option>
            </select>
          </div>

          <div className="pt-4">
            <button className="w-full bg-[#A7D63B] text-[#1F5E2A] py-3 rounded-xl font-bold hover:bg-[#C8E66A] shadow-md hover:shadow-lg transition-all">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetFoodRest;
