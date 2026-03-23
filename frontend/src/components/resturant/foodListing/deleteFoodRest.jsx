import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const DeleteFoodRest = ({ food, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 m-4 animate-in zoom-in-95 duration-300 relative text-center">
        <button onClick={onClose} className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
          <X size={20} />
        </button>

        <div className="mx-auto w-16 h-16 bg-[#D67A5C]/20 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-[#D67A5C]" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Delete Food Item?</h2>
        <p className="text-gray-500 mb-8">
          Are you sure you want to delete <strong className="text-gray-700">{food?.name}</strong>? This action cannot be undone.
        </p>

        <div className="flex gap-4">
          <button 
            onClick={onClose} 
            className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button 
            className="flex-1 bg-[#D67A5C] text-white font-bold py-3 rounded-xl shadow-md hover:bg-[#c06b4d] hover:scale-105 transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFoodRest;
