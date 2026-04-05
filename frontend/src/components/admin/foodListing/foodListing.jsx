import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Trash2, Clock, MapPin, Eye, Store, AlertCircle, LayoutGrid, List, ShoppingCart, Heart } from 'lucide-react';

const FoodListing = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [viewMode, setViewMode] = useState('grid');
  
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [targetListing, setTargetListing] = useState(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/food-listings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch food listings');
      const data = await response.json();
      setListings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { 
      label: "Today's Listings", 
      value: listings.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length, 
      color: '#9BC7D8', bg: '#F1F7FA' 
    },
    { 
      label: "Active Listings", 
      value: listings.filter(l => l.status === 'Available').length, 
      color: '#6FAFC4', bg: '#EAF6FB' 
    },
    { 
      label: "Alerts (Expired/Expiring)", 
      value: listings.filter(l => l.status === 'Expired' || l.status === 'ExpiringSoon').length, 
      color: '#D67A5C', bg: '#FDECEA' 
    }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'ExpiringSoon': return { bg: '#FFF4F0', text: '#E9A38E', label: 'Expiring Soon' };
      case 'Expired': return { bg: '#FDECEA', text: '#D67A5C', label: 'Expired' };
      case 'SoldOut': return { bg: '#F1F5F9', text: '#475569', label: 'Sold Out' };
      case 'Available': return { bg: '#EAF6FB', text: '#9BC7D8', label: 'Available' };
      default: return { bg: '#F1F5F9', text: '#475569', label: status };
    }
  };

  const handleRemoveClick = (listing, e) => {
    e.stopPropagation();
    setTargetListing(listing);
    setShowRemoveModal(true);
  };

  const confirmRemove = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/food-listings/${targetListing._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete');
      setListings(listings.filter(l => l._id !== targetListing._id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete listing');
    } finally {
      setShowRemoveModal(false);
      setTargetListing(null);
    }
  };

  const confirmDeleteAll = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/food-listings`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete all');
      setListings([]);
    } catch (err) {
      console.error(err);
      alert('Failed to delete all listings');
    } finally {
      setShowDeleteAllModal(false);
    }
  };

  const filteredListings = useMemo(() => {
    let result = listings.filter(item => {
      const foodName = item.foodName || '';
      const restaurantName = item.restaurantId?.restaurantName || '';
      const matchesSearch = foodName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            restaurantName.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesFilter = true;
      if (activeFilter === 'Today') {
          matchesFilter = matchesFilter && (new Date(item.createdAt).toDateString() === new Date().toDateString());
      }
      if (activeFilter === 'Available') matchesFilter = matchesFilter && item.status === 'Available';
      {/*if (activeFilter === 'Sold Out') matchesFilter = matchesFilter && item.status === 'SoldOut';*/}
      if (activeFilter === 'Expired') matchesFilter = matchesFilter && item.status === 'Expired';
      
      return matchesSearch && matchesFilter;
    });

    if (sortBy === 'Price') result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    if (sortBy === 'Quantity') result.sort((a, b) => a.quantity - b.quantity);
    if (sortBy === 'Expiry Time') result.sort((a, b) => new Date(a.expiryTime) - new Date(b.expiryTime));

    return result;
  }, [listings, searchTerm, activeFilter, sortBy]);

  const formatTime = (isoString) => {
    if (!isoString) return 'N/A';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatBaseUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `http://localhost:5000${url}`;
  };

  if (loading) return <div className="p-10 text-center">Loading food listings...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 font-['Poppins'] min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#0F172A' }}>
            Food Listings Monitoring
          </h1>
          <p className="text-lg" style={{ color: '#475569' }}>
            Review and manage all food posts from restaurants
          </p>
        </div>
        <button 
          onClick={() => setShowDeleteAllModal(true)}
          className="bg-[#D67A5C] text-white px-5 py-3 rounded-xl hover:opacity-90 flex items-center gap-2 transition-all shadow-md"
        >
          <Trash2 size={20} /> Delete All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-slate-100 transition-transform hover:-translate-y-1 cursor-default"
          >
            <span className="text-lg font-medium text-slate-600">{stat.label}</span>
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold border"
              style={{ backgroundColor: stat.bg, color: stat.color, borderColor: `${stat.color}30` }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col xl:flex-row justify-between items-center gap-4">
        
        <div className="relative w-full xl:w-[400px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by food name or restaurant..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 xl:pb-0">
            {['All', 'Today', 'Available', 'Expired'].map(filter => (  
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                  activeFilter === filter 
                    ? 'text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                style={activeFilter === filter ? { backgroundColor: '#9BC7D8' } : {}}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 ml-auto">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Sort:</span>
            <select 
              className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer appearance-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {['Newest', 'Expiry Time', 'Price', 'Quantity'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div className="hidden md:flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-500' : 'text-slate-400'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-500' : 'text-slate-400'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
        {filteredListings.map(item => {
          const statusStyle = getStatusStyle(item.status);
          
          return (
            <div 
              key={item._id}
              onClick={() => navigate(`/admin/food-listings/${item._id}`)}
              className={`bg-white rounded-2xl border border-slate-100 overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 ${viewMode === 'list' ? 'flex flex-row h-40' : 'flex flex-col'}`}
            >
               <div className={`relative overflow-hidden bg-slate-100 ${viewMode === 'list' ? 'w-48 h-full flex-shrink-0' : 'w-full h-48'}`}>
                <img 
                  src={formatBaseUrl(item.image)} 
                  alt={item.foodName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                />

                <div className="absolute top-3 left-3 flex gap-1.5">
                  <div className="p-1.5 bg-white/90 backdrop-blur-md rounded-lg text-blue-500 shadow-sm" title="Order">
                    <ShoppingCart size={15} />
                  </div>
                  {item.acceptableForDonation && (
                    <div className="p-1.5 bg-white/90 backdrop-blur-md rounded-lg text-rose-500 shadow-sm" title="Donation">
                      <Heart size={15} fill="currentColor" className="text-rose-500" />
                    </div>
                  )}
                </div>

                <div className="absolute top-3 right-3 flex gap-2">
                  <span 
                    className="px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm backdrop-blur-md"
                    style={{ backgroundColor: `${statusStyle.bg}e6`, color: statusStyle.text }}
                  >
                    {statusStyle.label}
                  </span>
                </div>
                
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button className="p-2 bg-white rounded-full text-slate-700 hover:text-blue-500 hover:scale-110 transition-all shadow-lg" title="View Details">
                    <Eye size={18} />
                  </button>
                  <button 
                    onClick={(e) => handleRemoveClick(item, e)}
                    className="p-2 bg-white rounded-full text-red-500 hover:bg-red-50 hover:scale-110 transition-all shadow-lg" title="Remove Listing">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className={`p-5 flex flex-col flex-grow ${viewMode === 'list' ? 'justify-center' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{item.foodName}</h3>
                  <div className="flex flex-col items-end">
                    {item.discountPrice ? (
                      <>
                        <span className="font-bold text-lg" style={{ color: '#9BC7D8' }}>${item.discountPrice.toFixed(2)}</span>
                        <span className="text-xs text-slate-400 line-through">${item.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="font-bold text-lg" style={{ color: '#9BC7D8' }}>${item.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4 flex-grow">
                  <div className="flex items-center text-sm text-slate-500">
                    <Store size={14} className="mr-2 text-slate-400" />
                    <span className="truncate">{item.restaurantId?.restaurantName || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-500">
                    <Clock size={14} className="mr-2 text-slate-400" />
                    <span>Expires: <span className="font-medium text-slate-600">{formatTime(item.expiryTime)}</span></span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <span className={`text-sm font-medium ${item.quantity <= 2 ? 'text-red-500' : 'text-slate-600'}`}>
                    Qty: {item.quantity} {item.unit || 'units'}
                  </span>
                  
                  <button 
                    onClick={(e) => handleRemoveClick(item, e)}
                    className="lg:hidden p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredListings.length === 0 && !loading && (
         <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm mt-6">
           <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
           <h3 className="text-xl font-bold text-slate-700 mb-1">No listings found</h3>
           <p className="text-slate-500">Try adjusting your filters or search terms.</p>
         </div>
      )}

      {showRemoveModal && targetListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 mx-auto flex items-center justify-center mb-4">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Remove Listing?</h3>
            <p className="text-sm text-slate-500 mb-6">
              Are you sure you want to remove <span className="font-semibold">{targetListing.foodName}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => { setShowRemoveModal(false); setTargetListing(null); }}
                className="flex-1 py-2.5 font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
               >
                Cancel
              </button>
              <button 
                onClick={confirmRemove}
                className="flex-1 py-2.5 font-semibold text-white rounded-xl shadow-md transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#D67A5C' }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showDeleteAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 mx-auto flex items-center justify-center mb-4">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Delete ALL Listings?</h3>
            <p className="text-sm text-slate-500 mb-6">
              Are you sure you want to completely clear all food listings? This will remove everything and cannot be undone.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteAllModal(false)}
                className="flex-1 py-2.5 font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
               >
                Cancel
              </button>
              <button 
                onClick={confirmDeleteAll}
                className="flex-1 py-2.5 font-semibold text-white rounded-xl shadow-md transition-opacity hover:opacity-90 bg-red-600"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodListing;