import React, { useState } from 'react';
import { X } from 'lucide-react';
import UploadFoodRest from './uploadFoodRest';

const EditFoodRest = ({ food, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 animate-in slide-in-from-bottom-4 duration-300">
        <div className="sticky top-0 bg-white/80 backdrop-blur-md px-8 py-5 border-b border-gray-100 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-[#1F5E2A]">Edit Food Item</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          <form className="space-y-6">
            <UploadFoodRest />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Food Name</label>
                <input type="text" defaultValue={food?.name} className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <textarea rows="3" defaultValue="Delicious surplus food ready to be shared!" className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition resize-none"></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Original Price ($)</label>
                <input type="number" defaultValue={food?.originalPrice} className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Discount Price ($)</label>
                <input type="number" defaultValue={food?.discountPrice} className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Quantity</label>
                <input type="number" defaultValue={food?.quantity} className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Expiry Time</label>
                <input type="text" defaultValue={food?.expiryTime} className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition text-gray-600" />
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100 flex gap-4">
              <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors w-full">
                Cancel
              </button>
              <button type="submit" className="bg-[#A7D63B] text-[#1F5E2A] w-full py-3 rounded-xl font-bold shadow-md hover:bg-[#C8E66A] transition-colors focus:ring-4 focus:ring-[#A7D63B]/30">
                Update Food
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFoodRest;
