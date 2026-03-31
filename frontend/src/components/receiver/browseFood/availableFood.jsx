import React, { useState } from 'react';
import { MapPin, Clock, Info, ShoppingCart, Search, Heart, Sparkles, Plus, Minus, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AvailableFood({ foods, currentTime }) {
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

  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const isNearExpiry = (isoString) => {
    if (!isoString) return false;
    const expiry = new Date(isoString).getTime();
    const now = (currentTime || new Date()).getTime();
    const oneHour = 60 * 60 * 1000;
    return (expiry - now > 0) && (expiry - now <= oneHour);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map(food => {
          const nearExpiry = isNearExpiry(food.expiryTime);
          const isDonatable = food.acceptableForDonation;
          return (
          <div 
            key={food._id} 
            className="bg-white border rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col relative"
            style={{ 
              borderColor: isDonatable ? '#1F5E2A' : '#D8C3A5',
              borderWidth: isDonatable ? '2px' : '1px'
            }}
          >
            {/* Image */}
            <div className="h-48 w-full relative">
              <img 
                src={food.image || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80'} 
                alt={food.foodName} 
                className="w-full h-full object-cover"
              />
              
              {/* Conditional Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-md text-white backdrop-blur-sm"
                  style={{ backgroundColor: isDonatable ? 'rgba(31, 94, 42, 0.9)' : 'rgba(214, 122, 92, 0.9)' }}>
                  {isDonatable ? (
                    <><Heart className="w-3.5 h-3.5 fill-current" /> Donation Available</>
                  ) : (
                    <><ShoppingCart className="w-3.5 h-3.5" /> Order Only</>
                  )}
                </div>
              </div>

              {nearExpiry && (
                <div className="bg-yellow-300 text-[#1F5E2A] text-xs px-2 py-1 font-bold rounded-full absolute top-3 right-3 shadow-md">
                  Near Expiry
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold truncate pr-2" style={{ color: '#1F5E2A' }}>{food.foodName}</h3>
              </div>

              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  {food.discountPrice ? (
                    <>
                      <span className="text-xl font-semibold text-[#D67A5C]">Rs. {food.discountPrice}</span>
                      <span className="text-sm text-gray-400 line-through">Rs. {food.price}</span>
                    </>
                  ) : (
                    <span className="text-xl font-semibold text-[#D67A5C]">Rs. {food.price}</span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm bg-green-50 text-green-700 px-2 py-1 rounded-lg font-bold">
                    {food.quantity} {food.unit || 'portions'} Left
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 opacity-70" />
                  <span className="font-medium">{food.restaurantId?.name || 'Restaurant'}</span>
                </div>
                <div className="flex items-center gap-2 font-medium" style={{ color: nearExpiry ? '#D67A5C' : '#E9A38E' }}>
                  <Clock className="w-4 h-4" />
                  <span>Expires at {formatTime(food.expiryTime)}</span>
                </div>
                {isDonatable && (
                  <div className="flex items-center gap-2 pt-2 mt-2 border-t border-gray-100">
                    <Sparkles className="w-4 h-4 text-[#1F5E2A]" />
                    <span className="text-xs italic text-gray-500">Available for free to charities</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-auto flex flex-wrap gap-2">
                <Link 
                  to={`/receiver/food/${food._id}`}
                  className="flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl font-semibold transition-opacity hover:opacity-90 min-w-[100px]"
                  style={{ backgroundColor: '#f3f4f6', color: '#1F5E2A' }}
                >
                  <Info className="w-4 h-4" />
                  Details
                </Link>
                
                {isDonatable && (
                  <button 
                    onClick={() => openDonationModal(food)}
                    className="flex-1 flex justify-center items-center gap-1 py-2.5 px-1 rounded-xl font-semibold transition-opacity hover:opacity-90 text-white shadow-sm min-w-[100px]"
                    style={{ backgroundColor: '#1F5E2A' }}
                  >
                    <Heart className="w-4 h-4" />
                    Request
                  </button>
                )}
                
                <Link 
                  to={`/receiver/order/${food._id}`}
                  className="flex-1 flex justify-center items-center gap-1 py-2.5 px-1 rounded-xl font-semibold transition-opacity hover:opacity-90 text-white shadow-sm min-w-[100px]"
                  style={{ backgroundColor: '#E9A38E' }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Order
                </Link>
              </div>
            </div>
          </div>
        )})}
        
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
              <p className="text-white/80 text-sm mt-1">You are requesting free food from {selectedDonation.restaurantId?.name || 'Restaurant'}</p>
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
                    <img src={selectedDonation.image || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80'} alt="Food" className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-[#1F5E2A]">{selectedDonation.foodName}</h4>
                      <p className="text-sm text-gray-500">Available: {selectedDonation.quantity} {selectedDonation.unit || 'portions'}</p>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">How many do you need?</label>
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
                    <textarea 
                      rows="3"
                      className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition resize-none"
                      placeholder="e.g. For our local community shelter tonight..."
                    ></textarea>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex gap-3">
                    <button 
                      onClick={closeDonationModal}
                      className="flex-1 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleRequestConfirm}
                      className="flex-1 py-3 rounded-xl font-bold text-white shadow-md hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: '#1F5E2A' }}
                    >
                      Confirm Request
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}