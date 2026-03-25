import React, { useState } from 'react';
import { MapPin, Clock, Info, ShoppingCart, Search, Heart, Map, Sparkles, Plus, Minus, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AvailableFood({ foods }) {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [requestQty, setRequestQty] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const openDonationModal = (food) => {
    setSelectedDonation(food);
    setRequestQty(1);
    setShowSuccess(false);
  };

  const closeDonationModal = () => {
    setSelectedDonation(null);
  };

  const handleRequestConfirm = () => {
    // API logic to request donation goes here
    setShowSuccess(true);
    setTimeout(() => {
      closeDonationModal();
    }, 2000);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map(food => (
          <div 
            key={food.id} 
            className="bg-white border rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col"
            style={{ 
              borderColor: food.donationEnabled ? '#1F5E2A' : '#D8C3A5',
              borderWidth: food.donationEnabled ? '2px' : '1px'
            }}
          >
            {/* Image */}
            <div className="h-48 w-full relative">
              <img 
                src={food.image} 
                alt={food.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-md" style={{ color: '#E9A38E' }}>
                {food.category}
              </div>
              
              {/* Conditional Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-md text-white backdrop-blur-sm"
                style={{ backgroundColor: food.donationEnabled ? 'rgba(31, 94, 42, 0.9)' : 'rgba(214, 122, 92, 0.9)' }}>
                {food.donationEnabled ? (
                  <><Heart className="w-3.5 h-3.5 fill-current" /> Donation Available</>
                ) : (
                  <><ShoppingCart className="w-3.5 h-3.5" /> Order Only</>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold truncate pr-2" style={{ color: '#1F5E2A' }}>{food.name}</h3>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-bold bg-green-50 text-green-700 px-3 py-1 rounded-lg">
                  {food.quantity} Portions Left
                </p>
                {food.donationEnabled && (
                  <span className="text-xs font-semibold text-[#E9A38E] bg-[#E9A38E]/10 px-2 py-1 rounded">
                    Free / Verified
                  </span>
                )}
              </div>

              <div className="space-y-2.5 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 opacity-70" />
                  <span className="font-medium">{food.restaurant}</span>
                </div>
                <div className="flex items-center gap-2 font-medium" style={{ color: '#E9A38E' }}>
                  <Clock className="w-4 h-4" />
                  <span>Expires: {food.expiresIn}</span>
                </div>
                {food.donationEnabled && (
                  <div className="flex items-center gap-2 pt-2 mt-2 border-t border-gray-100">
                    <Sparkles className="w-4 h-4 text-[#1F5E2A]" />
                    <span className="text-xs italic text-gray-500">Perfect for individuals or small groups</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-auto flex gap-3">
                <Link 
                  to={`/receiver/food/${food.id}`}
                  className="flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#f3f4f6', color: '#1F5E2A' }}
                >
                  <Info className="w-4 h-4" />
                  Details
                </Link>
                
                {food.donationEnabled ? (
                  <button 
                    onClick={() => openDonationModal(food)}
                    className="flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl font-semibold transition-opacity hover:opacity-90 text-white shadow-sm"
                    style={{ backgroundColor: '#1F5E2A' }}
                  >
                    <Heart className="w-4 h-4" />
                    Request
                  </button>
                ) : (
                  <Link 
                    to={`/receiver/order/${food.id}`}
                    className="flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl font-semibold transition-opacity hover:opacity-90 text-white shadow-sm"
                    style={{ backgroundColor: '#E9A38E' }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Order
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {foods.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-500 bg-white border border-dashed rounded-2xl" style={{ borderColor: '#D8C3A5' }}>
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1F5E2A' }}>No food items found</h3>
            <p className="max-w-md mx-auto">Try adjusting your search criteria or toggling the donation filter to see more available options.</p>
          </div>
        )}
      </div>

      {/* Donation Request Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-scale">
            {/* Header */}
            <div className="bg-[#1F5E2A] p-6 text-white text-center relative">
              <Heart className="w-12 h-12 mx-auto mb-3 text-white fill-[#1F5E2A] drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              <h2 className="text-2xl font-bold">Request Donation</h2>
              <p className="text-white/80 text-sm mt-1">You are requesting free food from {selectedDonation.restaurant}</p>
            </div>

            {/* Body */}
            <div className="p-6">
              {showSuccess ? (
                <div className="py-12 flex flex-col items-center justify-center text-center animate-zoom-in">
                  <CheckCircle className="w-20 h-20 text-[#1F5E2A] mb-4" />
                  <h3 className="text-2xl font-bold text-[#1F5E2A] mb-2">Request Submitted!</h3>
                  <p className="text-gray-600">The restaurant will review your donation request shortly. Check your active orders.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Item Info */}
                  <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <img src={selectedDonation.image} alt="Food" className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-[#1F5E2A]">{selectedDonation.name}</h4>
                      <p className="text-sm text-gray-500">Available: {selectedDonation.quantity} portions</p>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">How many portions do you need?</label>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setRequestQty(Math.max(1, requestQty - 1))}
                        className="w-12 h-12 rounded-full border-2 border-[#1F5E2A] text-[#1F5E2A] flex items-center justify-center hover:bg-[#1F5E2A]/10 transition-colors disabled:opacity-50"
                        disabled={requestQty <= 1}
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <div className="flex-1 text-center bg-gray-50 border border-gray-200 py-3 rounded-xl font-bold text-xl text-[#1F5E2A]">
                        {requestQty}
                      </div>
                      <button 
                        onClick={() => setRequestQty(Math.min(selectedDonation.quantity, requestQty + 1))}
                        className="w-12 h-12 rounded-full border-2 border-[#1F5E2A] text-[#1F5E2A] flex items-center justify-center hover:bg-[#1F5E2A]/10 transition-colors disabled:opacity-50"
                        disabled={requestQty >= selectedDonation.quantity}
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Purpose */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Brief Purpose (Optional)</label>
                    <div className="relative">
                      <div className="absolute top-3 left-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                      </div>
                      <textarea 
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1F5E2A] focus:border-transparent outline-none resize-none hide-scrollbar"
                        placeholder="E.g., For a community shelter, personal need..."
                        rows="2"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {!showSuccess && (
              <div className="p-6 pt-0 flex gap-3">
                <button 
                  onClick={closeDonationModal}
                  className="flex-1 py-3.5 rounded-xl font-bold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleRequestConfirm}
                  className="flex-[2] py-3.5 rounded-xl font-bold text-white shadow-lg shadow-[#1F5E2A]/20 hover:shadow-xl hover:shadow-[#1F5E2A]/30 hover:-translate-y-0.5 transition-all"
                  style={{ backgroundColor: '#1F5E2A' }}
                >
                  Confirm Request
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
