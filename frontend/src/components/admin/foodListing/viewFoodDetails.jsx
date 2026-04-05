import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Clock, Store, MapPin, Phone, Package, Tag, AlertTriangle } from 'lucide-react';

const ViewFoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showRemoveModal, setShowRemoveModal] = useState(false);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/admin/food-listings/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch food details');
        const data = await response.json();
        setFood(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFoodDetails();
  }, [id]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'ExpiringSoon': return { bg: '#FFF4F0', text: '#E9A38E', label: 'Expiring Soon' };
      case 'Expired': return { bg: '#FDECEA', text: '#D67A5C', label: 'Expired' };
      case 'SoldOut': return { bg: '#F1F5F9', text: '#475569', label: 'Sold Out' };
      case 'Available': return { bg: '#EAF6FB', text: '#9BC7D8', label: 'Available' };
      default: return { bg: '#F1F5F9', text: '#475569', label: status };
    }
  };

  const handleRemoveSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/food-listings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete');
      setShowRemoveModal(false);
      navigate('/admin/food-listings');
    } catch (err) {
      console.error(err);
      alert('Failed to remove listing');
    }
  };

  const formatTime = (isoString) => {
    if (!isoString) return 'N/A';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  
  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    return new Date(isoString).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatBaseUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `http://localhost:5000${url}`;
  };

  if (loading) return <div className="p-10 text-center">Loading details...</div>;
  if (error || !food) return <div className="p-10 text-center text-red-500">Error: {error || 'Food not found'}</div>;

  const statusStyle = getStatusStyle(food.status);
  const price = food.discountPrice !== undefined ? food.discountPrice : food.price;
  const originalPrice = food.discountPrice !== undefined ? food.price : undefined;

  return (
    <div className="p-6 font-['Poppins'] min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/food-listings')}
            className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-50 transition-colors text-slate-600"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Food Details</h1>
            <p className="text-slate-500 text-sm">Review listing information</p>
          </div>
        </div>
        
        <button 
          onClick={() => setShowRemoveModal(true)}
          className="bg-red-500 hover:bg-red-600 flex items-center gap-2 px-4 py-2 font-semibold text-white rounded-xl shadow-sm transition-transform hover:-translate-y-0.5"
        >
          <Trash2 size={18} />
          Remove Listing
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white group h-[400px] lg:h-[600px]">
          <img 
            src={formatBaseUrl(food.image)} 
            alt={food.foodName} 
            className="w-full h-full object-cover transition-transform duration-700 bg-slate-100 group-hover:scale-105"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=No+Image'; }}
          />
          <div className="absolute top-4 left-4">
            <span 
              className="px-4 py-1.5 rounded-xl text-sm font-bold shadow-md backdrop-blur-md"
              style={{ backgroundColor: `${statusStyle.bg}f2`, color: statusStyle.text }}
            >
              {statusStyle.label}
            </span>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent p-8">
            <h2 className="text-3xl font-bold text-white mb-2">{food.foodName}</h2>
          </div>
        </div>

        <div className="space-y-6">
          
          <div className="bg-white rounded-2xl shadow-[0_6px_16px_rgba(0,0,0,0.04)] border border-slate-100 p-6 xl:p-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Tag className="text-[#9BC7D8]" /> 
              Food Information
            </h3>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-sm text-slate-500 mb-1">Price</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold" style={{ color: '#1F5E2A' }}>${price.toFixed(2)}</span>
                  {originalPrice !== undefined && (
                    <span className="text-sm text-slate-400 line-through mb-1">${originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-sm text-slate-500 mb-1">Quantity Available</p>
                <div className="flex items-center gap-2">
                  <Package className={food.quantity <= 2 ? 'text-red-400' : 'text-slate-400'} size={20}/>
                  <span className={`text-xl font-bold ${food.quantity <= 2 ? 'text-red-500' : 'text-[#1F5E2A]'}`}>
                    {food.quantity} {food.unit || 'units'}
                  </span>
                </div>
              </div>
              
              <div className={`col-span-2 rounded-xl p-4 border ${food.status === 'ExpiringSoon' || food.status === 'Expired' ? 'bg-[#FFF4F0] border-[#fadad1]' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Expiry Time</p>
                    <div className="flex items-center gap-2">
                      <Clock className={food.status === 'ExpiringSoon' ? 'animate-pulse text-[#D67A5C]' : 'text-slate-400'} size={20} />
                      <span className={`text-lg font-bold ${food.status === 'ExpiringSoon' || food.status === 'Expired' ? 'text-[#D67A5C]' : 'text-[#1F5E2A]'}`}>
                        Expires: {formatTime(food.expiryTime)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Posted</p>
                    <p className="text-sm font-medium text-slate-600">{formatDate(food.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {food.acceptableForDonation && (
                <div className="mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Available for Donation</span>
                </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-[0_6px_16px_rgba(0,0,0,0.04)] border border-slate-100 p-6 xl:p-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Store className="text-[#9BC7D8]" /> 
              Restaurant Information
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
                  <Store size={22} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Restaurant Name</p>
                  <p className="text-lg font-bold text-[#1F5E2A]">{food.restaurantId?.restaurantName || 'Unknown'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pl-1">
                <MapPin className="text-slate-400 mt-1" size={20} />
                <div>
                  <p className="text-sm text-slate-500 mb-0.5">Location</p>
                  <p className="font-medium text-[#1F5E2A]">{food.restaurantId?.location || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pl-1">
                <Phone className="text-slate-400 mt-1" size={20} />
                <div>
                  <p className="text-sm text-slate-500 mb-0.5">Contact</p>
                  <p className="font-medium text-[#1F5E2A]">{food.restaurantId?.contactPhone || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {showRemoveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6 border-b border-rose-100 bg-rose-50/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Remove Listing</h3>
                <p className="text-sm text-rose-600 font-medium">{food.foodName}</p>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-slate-600 mb-4">
                Are you sure you want to permanently remove this food listing from the system?
              </p>
            </div>
            
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setShowRemoveModal(false)}
                className="px-5 py-2.5 font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
               >
                Cancel
              </button>
              <button 
                onClick={handleRemoveSubmit}
                className="px-5 py-2.5 font-semibold text-white rounded-xl shadow-md transition-all hover:shadow-lg bg-red-500 hover:bg-red-600 flex items-center gap-2"
              >
                <Trash2 size={18} />
                Confirm Removal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ViewFoodDetails;