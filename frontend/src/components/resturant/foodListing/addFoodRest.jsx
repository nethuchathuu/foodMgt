import React, { useState } from 'react';
import axios from 'axios';
import { X, UploadCloud } from 'lucide-react';
// Removing external UploadFoodRest if image url logic is direct, or we can handle file here.
// In this case, we use a simple text input for URL for now to bypass image uploading complexities,
// or we can implement real file upload based on how it's done elsewhere.

const AddFoodRest = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    foodName: '',
    description: '',
    price: '',
    discountPrice: '',
    quantity: '',
    expiryTime: '',
    foodImage: null,
    acceptableForDonation: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === 'foodImage') {
      setFormData(prev => ({ ...prev, foodImage: files[0] }));
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
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          submitData.append(key, formData[key]);
        }
      });
      
      // If no file was selected, use the default plate icon URL as a fallback
      if (!formData.foodImage) {
        submitData.append('image', 'https://cdn-icons-png.flaticon.com/512/1046/1046779.png');
      }

      await axios.post('http://localhost:5000/api/food-listings', submitData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error adding food:', error);
      alert('Failed to add food');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 animate-in slide-in-from-bottom-4 duration-300">
        <div className="sticky top-0 bg-white/80 backdrop-blur-md px-8 py-5 border-b border-gray-100 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-[#1F5E2A]">Add New Food</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Food Name</label>
                <input required name="foodName" value={formData.foodName} onChange={handleChange} type="text" placeholder="e.g. Grilled Chicken Salad" className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Food Image</label>
                <div className="relative group w-full h-32 border-2 border-dashed border-gray-300 hover:border-[#A7D63B] rounded-xl flex flex-col items-center justify-center bg-gray-50 hover:bg-[#A7D63B]/5 transition-colors cursor-pointer overflow-hidden">
                  {formData.foodImage ? (
                    <div className="absolute inset-0 w-full h-full">
                      <img src={URL.createObjectURL(formData.foodImage)} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white font-semibold flex items-center gap-2"><UploadCloud size={20} /> Change Image</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-[#A7D63B] transition-colors" />
                      <span className="text-sm text-gray-500 font-medium group-hover:text-[#1F5E2A] transition-colors">Click to upload image</span>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG (Max. 5MB)</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    name="foodImage" 
                    accept="image/*" 
                    onChange={handleChange} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Describe the food item..." className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition resize-none"></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Original Price (Rs.)</label>
                <input required name="price" value={formData.price} onChange={handleChange} type="number" placeholder="0.00" className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Discount Price (Rs.)</label>
                <input name="discountPrice" value={formData.discountPrice} onChange={handleChange} type="number" placeholder="0.00" className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Quantity</label>
                <input required name="quantity" value={formData.quantity} onChange={handleChange} type="number" placeholder="e.g. 5" className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Expiry Time</label>
                <input name="expiryTime" value={formData.expiryTime} onChange={handleChange} type="time" className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition text-gray-600" />
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
                {loading ? 'Adding...' : 'Add Food'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFoodRest;
