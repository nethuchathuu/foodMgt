import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowLeft, Clock, MapPin, Phone, Info, Heart, Minus, Plus, CheckCircle, Mail } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SidebarUser from '../slidebarUser';
import NavbarUser from '../navbarUser';

export default function DisplayFoodPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Donation Modal State
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [requestQty, setRequestQty] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/browse-food/${id}`);
        setFood(response.data);
      } catch (err) {
        console.error('Failed to fetch food details:', err);
        setError('Could not load food details or it might be unavailable.');
      } finally {
        setLoading(false);
      }
    };
    fetchFoodDetails();
  }, [id]);

  const handleRequestConfirm = () => {
    // Donation Request Logic
    setShowSuccess(true);
    setTimeout(() => {
      setShowDonationModal(false);
      setShowSuccess(false);
      navigate('/receiver/foods');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>
        <SidebarUser />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <NavbarUser />
          <main className="flex-1 overflow-y-auto p-6 lg:p-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F5E2A]"></div>
          </main>
        </div>
      </div>
    );
  }

  if (error || !food) {
    return (
      <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>
        <SidebarUser />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <NavbarUser />
          <main className="flex-1 overflow-y-auto p-6 lg:p-8 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">{error || 'Food not found'}</h2>
            <Link to="/receiver/foods" className="text-[#1F5E2A] underline">Return to Browse</Link>
          </main>
        </div>
      </div>
    );
  }

  const formatTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const isDonatable = food.acceptableForDonation;

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>
      <SidebarUser />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <NavbarUser />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            
            {/* Back Navigation */}
            <Link 
              to="/receiver/foods" 
              className="inline-flex items-center gap-2 mb-6 font-medium hover:underline transition-all"
              style={{ color: '#1F5E2A' }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Browse Food
            </Link>

            {/* Main Content Card */}
            <div className="bg-white rounded-3xl shadow-sm border overflow-hidden" style={{ borderColor: '#D8C3A5' }}>
              
              {/* Top Image Banner */}
              <div className="h-64 md:h-80 w-full relative bg-gray-100">
                <img 
                  src={food.image || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80'} 
                  alt={food.foodName} 
                  className="w-full h-full object-cover" 
                />
                
                {isDonatable && (
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full font-bold shadow-md text-white backdrop-blur-sm"
                    style={{ backgroundColor: 'rgba(31, 94, 42, 0.9)' }}>
                    <Heart className="w-4 h-4 fill-current" /> Donation Available
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full text-sm font-bold shadow-md" style={{ color: '#E9A38E' }}>
                  {food.status || 'Available'}
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  
                  {/* Left Column: Food Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h1 className="text-3xl font-bold mb-2" style={{ color: '#1F5E2A' }}>{food.foodName}</h1>
                        <div className="flex items-center gap-4 mt-3">
                          <p className="text-xl font-medium" style={{ color: '#D67A5C' }}>
                            {food.discountPrice ? (
                                <span>Rs. {food.discountPrice} <span className="line-through text-gray-400 text-sm">Rs. {food.price}</span> / {food.unit || 'item'}</span>
                            ) : (
                                <span>Rs. {food.price} / {food.unit || 'item'}</span>
                            )}
                          </p>
                          <span className="bg-green-50 text-green-700 px-3 py-1 rounded-lg font-bold text-sm">
                            {food.quantity} {food.unit || 'items'} available
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 font-bold p-3 rounded-xl w-fit mb-6" style={{ backgroundColor: '#fff4f1', color: '#D67A5C' }}>
                      <Clock className="w-5 h-5" />
                      Expires at: {formatTime(food.expiryTime)}
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: '#1F5E2A' }}>
                        <Info className="w-5 h-5 text-gray-400" />
                        Details
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        This item is offered by <strong className="text-[#1F5E2A]">{food.providerInfo?.name || 'the restaurant'}</strong>. 
                        Ensure pick-up or delivery is arranged before the expiry time to maintain food safety and quality standards.
                        {isDonatable && (
                          <span className="block mt-2 italic text-[#D67A5C]">
                            * This item is also officially marked as acceptable for charity donation, making it completely free for authorized requests.
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Restaurant Info & Action */}
                  <div className="w-full md:w-80 flex flex-col gap-6">
                    
                    {/* Restaurant Card */}
                    <div className="bg-[#F8F8F6] rounded-2xl p-6 border" style={{ borderColor: '#D8C3A5' }}>
                      <h3 className="font-bold text-lg mb-4" style={{ color: '#1F5E2A' }}>Provider Info</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 font-medium mb-1">Restaurant</p>
                          <p className="font-bold text-lg" style={{ color: '#1F5E2A' }}>{food.providerInfo?.name || 'Unknown'}</p>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 mt-0.5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500 font-medium">Location</p>
                            <p className="font-medium" style={{ color: '#1F5E2A' }}>{food.providerInfo?.location || 'Not provided'}</p>
                          </div>
                        </div>
                        
                        {(food.providerInfo?.contact !== 'Not provided' || food.providerInfo?.email !== 'Not provided') && (
                          <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 mt-0.5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500 font-medium">Contact</p>
                              {food.providerInfo?.contact !== 'Not provided' && <p className="font-medium" style={{ color: '#1F5E2A' }}>{food.providerInfo.contact}</p>}
                              {food.providerInfo?.email !== 'Not provided' && <p className="text-sm mt-1 text-gray-600 truncate">{food.providerInfo.email}</p>}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 mt-auto">
                      {isDonatable && (
                        <button 
                          onClick={() => { setRequestQty(1); setShowDonationModal(true); }}
                          className="w-full py-4 rounded-xl font-bold text-xl text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 group transform hover:-translate-y-1"
                          style={{ backgroundColor: '#1F5E2A' }}
                        >
                          <Heart className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
                          Request Donation
                        </button>
                      )}
                      
                      <Link 
                        to={`/receiver/order/${food._id}`}
                        className="w-full py-4 rounded-xl font-bold text-xl text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 group transform hover:-translate-y-1"
                        style={{ backgroundColor: '#E9A38E' }}
                      >
                        <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        Order Now
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Donation Modal directly within Details page */}
      {showDonationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="bg-[#1F5E2A] p-6 text-white text-center">
              <Heart className="w-12 h-12 mx-auto mb-3 text-white fill-[#1F5E2A] drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              <h2 className="text-2xl font-bold">Request Donation</h2>
              <p className="text-white/80 text-sm mt-1">From {food.providerInfo?.name}</p>
            </div>

            <div className="p-6">
              {showSuccess ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <CheckCircle className="w-20 h-20 text-[#1F5E2A] mb-4" />
                  <h3 className="text-2xl font-bold text-[#1F5E2A] mb-2">Request Submitted!</h3>
                  <p className="text-gray-600">The restaurant will review your donation request. Redirecting...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <img src={food.image || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500'} alt="Food" className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-[#1F5E2A]">{food.foodName}</h4>
                      <p className="text-sm text-gray-500">Available: {food.quantity} {food.unit || 'portions'}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Quantity needed:</label>
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
                        onClick={() => setRequestQty(Math.min(food.quantity, requestQty + 1))}
                        className="w-12 h-12 rounded-full border-2 border-[#1F5E2A] text-[#1F5E2A] flex items-center justify-center hover:bg-[#1F5E2A]/10 transition-colors disabled:opacity-50"
                        disabled={requestQty >= food.quantity}
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Purpose for request</label>
                    <textarea 
                      rows="3"
                      className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#A7D63B] outline-none transition"
                      placeholder="Why do you need this donation today?"
                    ></textarea>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button 
                      onClick={() => setShowDonationModal(false)}
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
    </div>
  );
}
