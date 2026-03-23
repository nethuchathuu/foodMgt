import React, { useState } from 'react';
import { X, Tag, CheckCircle2 } from 'lucide-react';

const MarkFoodRest = ({ food, onClose }) => {
  const [status, setStatus] = useState(food?.status || 'Available');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm m-4 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        <div className="bg-green-50 px-6 py-5 border-b border-green-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Tag className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Mark Status</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-green-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-500 font-medium mb-6">Change availability for <span className="text-gray-800 font-bold">{food?.name}</span></p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => setStatus('Available')}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                status === 'Available' 
                ? 'border-[#A7D63B] bg-[#A7D63B]/10 shadow-sm' 
                : 'border-gray-200 hover:border-[#A7D63B]/50 hover:bg-gray-50'
              }`}
            >
              <div className={`w-4 h-4 rounded-full mb-3 flex items-center justify-center ${status === 'Available' ? 'bg-[#A7D63B]' : 'bg-gray-200'}`}>
                {status === 'Available' && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <span className={`font-bold ${status === 'Available' ? 'text-[#1F5E2A]' : 'text-gray-500'}`}>Available</span>
            </button>

            <button 
              onClick={() => setStatus('Sold Out')}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                status === 'Sold Out' 
                ? 'border-[#D67A5C] bg-[#D67A5C]/10 shadow-sm' 
                : 'border-gray-200 hover:border-[#D67A5C]/50 hover:bg-gray-50'
              }`}
            >
              <div className={`w-4 h-4 rounded-full mb-3 flex items-center justify-center ${status === 'Sold Out' ? 'bg-[#D67A5C]' : 'bg-gray-200'}`}>
                {status === 'Sold Out' && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <span className={`font-bold ${status === 'Sold Out' ? 'text-[#D67A5C]' : 'text-gray-500'}`}>Sold Out</span>
            </button>
          </div>

          <button className="w-full bg-[#A7D63B] text-[#1F5E2A] py-3 rounded-xl font-bold hover:bg-[#C8E66A] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
            <CheckCircle2 size={20} />
            Confirm Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkFoodRest;
