import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, UploadCloud, Image as ImageIcon } from 'lucide-react';

const EditFoodRest = ({ food, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    foodName: food?.foodName || '',
    description: food?.description || '',
    price: food?.price || '',
    discountPrice: food?.discountPrice || '',
    quantity: food?.quantity || '',
    expiryTime: food?.expiryTime ? new Date(food.expiryTime).toTimeString().slice(0,5) : '',
    acceptableForDonation: food?.acceptableForDonation || false,
    foodImage: null
  });
  const [preview, setPreview] = useState(food?.image || null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === 'foodImage') {
      const file = files[0];
      setFormData(prev => ({ ...prev, foodImage: file }));
      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const submitData = new FormData();
      submitData.append('foodName', formData.foodName);
      submitData.append('description', formData.description);
      submitData.append('price', formData.price);
      if (formData.discountPrice) submitData.append('discountPrice', formData.discountPrice);
      submitData.append('quantity', formData.quantity);
      if (formData.expiryTime) submitData.append('expiryTime', formData.expiryTime);
      submitData.append('acceptableForDonation', formData.acceptableForDonation);
      if (formData.foodImage) {
        submitData.append('foodImage', formData.foodImage);
      }

      await axios.put(`http://localhost:5000/api/food-listings/${food._id}`, submitData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error updating food:', error);
      alert('Failed to update food');
    } finally {
      setLoading(false);
    }
  };

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
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Image Upload Section */}
            <div className="flex flex-col items-center justify-center w-full">
              <label htmlFor="foodImage" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden relative transition-colors">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-10 h-10 text-gray-400 mb-3" />
                    <p className="mb-2 text-sm text-gray-500 font-semibold">Click to upload a new image</p>
                  </div>
                )}
                <input id="foodImage" name="foodImage" type="file" accept="image/*" className="hidden" onChange={handleChange} />
                {preview && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">Change Image</span>
                  </div>
                )}
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Food Name</label>
                <input required name="foodName" value={formData.foodName} onChange={handleChange} type="text" className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Original Price (Rs.)</label>
                <input required name="price" value={formData.price} onChange={handleChange} type="number" className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Discount Price (Rs.)</label>
                <input name="discountPrice" value={formData.discountPrice} onChange={handleChange} type="number" className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Quantity</label>
                <input required name="quantity" value={formData.quantity} onChange={handleChange} type="number" className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Expiry Time</label>
                <input name="expiryTime" value={formData.expiryTime} onChange={handleChange} type="time" className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition" />
              </div>

              <div className="md:col-span-2 flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div>
                  <p className="font-semibold text-gray-800">Acceptable for Donation</p>
                  <p className="text-sm text-gray-500">Allow charity organizations to request this food item.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="acceptableForDonation" checked={formData.acceptableForDonation} onChange={handleChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#A7D63B]"></div>
                </label>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100 flex gap-4">
              <button type="button" onClick={onClose} disabled={loading} className="px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors w-full">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="bg-[#A7D63B] text-[#1F5E2A] w-full py-3 rounded-xl font-bold shadow-md hover:bg-[#C8E66A] transition-colors focus:ring-4 focus:ring-[#A7D63B]/30">
                {loading ? 'Updating...' : 'Update Food'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFoodRest;