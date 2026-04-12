import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowLeft, Info, Package, MapPin, MessageSquare, Truck, Store, CheckCircle } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SidebarUser from '../slidebarUser';
import NavbarUser from '../navbarUser';

// Order page fetches real food listing data by id

export default function OrderFood() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quantity, setQuantity] = useState('');
  const [deliveryType, setDeliveryType] = useState('pickup');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/orders', { 
            foodId: id, 
            quantity: Number(quantity),
            deliveryType,
            location,
            notes 
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/receiver/orders');
        }, 2500); // Navigate to orders after 2.5 seconds
      } catch (err) {
        console.error('Failed to create order:', err);
        alert('Failed to place order. Please try again.');
      }
    })();
  };

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/browse-food/${id}`);
        setFood(res.data);
      } catch (err) {
        console.error('Failed to fetch food details:', err);
        setError('Failed to load food details');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchFood();
  }, [id]);

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>
      <SidebarUser />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <NavbarUser />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-3xl mx-auto">
            
            {/* Back Button */}
            <Link 
              to="/receiver/foods" 
              className="inline-flex items-center gap-2 mb-6 font-medium hover:underline transition-all"
              style={{ color: '#1F5E2A' }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Browse
            </Link>

            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#1F5E2A' }}>Place Order</h1>
              <p className="opacity-80" style={{ color: '#D67A5C' }}>Complete the details below to secure your food.</p>
            </div>

            {/* Order Form Card */}
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden" style={{ borderColor: '#D8C3A5' }}>
              
              <div className="flex flex-col md:flex-row">
                {/* Left side - Order Summary context */}
                <div className="bg-gray-50 p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: '#1F5E2A' }}>
                    <ShoppingBag className="w-5 h-5" />
                    Selected Item
                  </h3>
                  
                  <div className="mb-4 rounded-xl overflow-hidden h-32 w-full bg-gray-200">
                    <img src={food?.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80'} alt={food?.name || 'Food'} className="w-full h-full object-cover" />
                  </div>
                  
                  <h4 className="font-bold mb-1" style={{ color: '#1F5E2A' }}>{food?.foodName || ''}</h4>
                  <p className="text-sm text-gray-600 mb-3">{food?.restaurantId?.name || ''}</p>
                  
                  <div className="space-y-2 text-sm pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Available:</span>
                      <span className="font-bold" style={{ color: '#D67A5C' }}>{food?.quantity || 0} {food?.unit || 'portions'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Expires:</span>
                      <span className="font-bold" style={{ color: '#E9A38E' }}>
                        {food?.expiryTime ? new Date(food.expiryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side - Form inputs */}
                <div className="p-6 md:w-2/3">
                  {loading && <div className="py-8 text-center">Loading food details...</div>}
                  {error && <div className="py-8 text-center text-red-500">{error}</div>}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Fixed Food Name Field */}
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: '#1F5E2A' }}>
                        Food Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Info className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          disabled
                          value={food?.foodName || ''}
                          className="block w-full pl-10 pr-3 py-3 border rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed border-gray-200"
                        />
                      </div>
                    </div>

                    {/* Quantity Field */}
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: '#1F5E2A' }}>
                        Quantity Needed <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Package className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          required
                          min="1"
                          max={food ? food.quantity : undefined}
                          placeholder={food ? `Enter quantity (max ${food.quantity})` : 'Enter quantity'}
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border rounded-xl bg-white focus:outline-none focus:ring-2 transition-all"
                          style={{ borderColor: '#D8C3A5', focusRing: '#E9A38E' }}
                        />
                      </div>
                    </div>

                    {/* Delivery / Pickup Option */}
                    <div>
                      <label className="block text-sm font-bold mb-3" style={{ color: '#1F5E2A' }}>
                        Delivery Option <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setDeliveryType('pickup')}
                          className={`flex items-center justify-center gap-2 py-3 px-4 border rounded-xl font-medium transition-all ${
                            deliveryType === 'pickup' 
                              ? 'bg-orange-50 text-orange-800' 
                              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                          style={deliveryType === 'pickup' ? { borderColor: '#E9A38E', borderWidth: 2, color: '#D67A5C', backgroundColor: '#fff5f2' } : {}}
                        >
                          <Store className="w-5 h-5" />
                          <span className="text-sm">Restaurant Pickup</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryType('delivery')}
                          className={`flex items-center justify-center gap-2 py-3 px-4 border rounded-xl font-medium transition-all ${
                            deliveryType === 'delivery' 
                              ? 'bg-blue-50 text-blue-800' 
                              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                          style={deliveryType === 'delivery' ? { borderColor: '#9BC7D8', borderWidth: 2, color: '#1F5E2A', backgroundColor: '#eef6f9' } : {}}
                        >
                          <Truck className="w-5 h-5" />
                          <span className="text-sm text-center">Location-Based Delivery</span>
                        </button>
                      </div>
                    </div>

                    {/* Location Field - Only show if delivery */}
                    {deliveryType === 'delivery' && (
                      <div>
                        <label className="block text-sm font-bold mb-2" style={{ color: '#1F5E2A' }}>
                          Delivery Location <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            required={deliveryType === 'delivery'}
                            placeholder="Enter your exact delivery address"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border rounded-xl bg-white focus:outline-none focus:ring-2 transition-all"
                            style={{ borderColor: '#D8C3A5', focusRing: '#E9A38E' }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Notes Field */}
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: '#1F5E2A' }}>
                        Additional Notes
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                          <MessageSquare className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                          placeholder="Optional instructions for the restaurant..."
                          rows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border rounded-xl bg-white focus:outline-none focus:ring-2 transition-all resize-none"
                          style={{ borderColor: '#D8C3A5', focusRing: '#E9A38E' }}
                        />
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="pt-4 flex gap-4">
                      <Link 
                        to="/receiver/foods"
                        className="flex-1 py-3 px-4 text-center rounded-xl font-bold transition-colors"
                        style={{ backgroundColor: '#D8C3A5', color: '#1F5E2A' }}
                      >
                        Cancel
                      </Link>
                      <button 
                        type="submit"
                        disabled={!food || loading}
                        className="flex-1 py-3 px-4 rounded-xl font-bold text-white shadow-md hover:opacity-90 transition-opacity disabled:opacity-60"
                        style={{ backgroundColor: '#E9A38E' }}
                      >
                        Confirm Order
                      </button>
                    </div>

                  </form>
                </div>
              </div>

            </div>

            {/* Success Popup Modal */}
            {showSuccess && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-scale">
                  <div className="bg-[#1F5E2A] p-6 text-white text-center relative">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                    <h2 className="text-2xl font-bold">Order Confirmed</h2>
                    <p className="text-white/80 text-sm mt-1">Your order from {food?.restaurantId?.name || 'Restaurant'} is secured.</p>
                  </div>
                  <div className="p-6">
                    <div className="py-12 flex flex-col items-center justify-center text-center animate-zoom-in">
                      <CheckCircle className="w-20 h-20 text-[#1F5E2A] mb-4" />
                      <h3 className="text-2xl font-bold text-[#1F5E2A] mb-2">Success!</h3>
                      <p className="text-gray-600">Your food has been successfully reserved. Redirecting to your orders...</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
