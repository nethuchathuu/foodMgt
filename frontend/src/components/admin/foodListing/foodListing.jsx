import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Trash2, Clock, MapPin, Eye, Store, AlertCircle, LayoutGrid, List } from 'lucide-react';

const mockListings = [
  { id: 1, foodName: 'Grilled Chicken Salad', restaurant: 'Healthy Bites', price: 12.50, quantity: 4, expiryTime: '2 hours', status: 'ExpiringSoon', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', date: 'Today' },
  { id: 2, foodName: 'Large Pepperoni Pizza', restaurant: 'Pizza Plaza', price: 18.00, quantity: 2, expiryTime: '5 hours', status: 'Fresh', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80', date: 'Today' },
  { id: 3, foodName: 'Vegan Sushi Roll', restaurant: 'Zen Sushi', price: 15.00, quantity: 1, expiryTime: '1 hour', status: 'LowQuantity', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80', date: 'Today' },
  { id: 4, foodName: 'Spicy Beef Tacos', restaurant: 'Mexican Fiesta', price: 10.00, quantity: 8, expiryTime: '6 hours', status: 'Fresh', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80', date: 'Yesterday' },
  { id: 5, foodName: 'Classic Cheeseburger', restaurant: 'Burger Joint', price: 9.50, quantity: 12, expiryTime: '4 hours', status: 'Fresh', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', date: 'Today' },
];

const FoodListing = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [viewMode, setViewMode] = useState('grid');
  const [listings, setListings] = useState(mockListings);
  
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [targetListing, setTargetListing] = useState(null);

  const stats = [
    { label: "Today's Listings", value: listings.filter(l => l.date === 'Today').length, color: '#9BC7D8', bg: '#F1F7FA' },
    { label: "Active Listings", value: listings.length, color: '#6FAFC4', bg: '#EAF6FB' },
    { label: "Alerts (Expiring/Low)", value: listings.filter(l => l.status !== 'Fresh').length, color: '#D67A5C', bg: '#FDECEA' }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'ExpiringSoon': return { bg: '#FFF4F0', text: '#E9A38E', label: 'Expiring Soon' };
      case 'LowQuantity': return { bg: '#FDECEA', text: '#D67A5C', label: 'Low Quantity' };
      case 'Fresh': return { bg: '#EAF6FB', text: '#9BC7D8', label: 'Fresh' };
      default: return { bg: '#F1F5F9', text: '#475569', label: status };
    }
  };

  const handleRemoveClick = (listing, e) => {
    e.stopPropagation();
    setTargetListing(listing);
    setShowRemoveModal(true);
  };

  const confirmRemove = () => {
    setListings(listings.filter(l => l.id !== targetListing.id));
    setShowRemoveModal(false);
    setTargetListing(null);
  };

  const filteredListings = useMemo(() => {
    let result = listings.filter(item => {
      const matchesSearch = item.foodName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.restaurant.toLowerCase().includes(searchTerm.toLowerCase());
      
let matchesFilter = item.date === 'Today';
      if (activeFilter === 'Expiring Soon') matchesFilter = matchesFilter && item.status === 'ExpiringSoon';
      if (activeFilter === 'Low Quantity') matchesFilter = matchesFilter && (item.status === 'LowQuantity' || item.quantity <= 2);
      
      return matchesSearch && matchesFilter;
    });

    // Basic sorting logic
    if (sortBy === 'Price') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'Quantity') result.sort((a, b) => a.quantity - b.quantity);

    return result;
  }, [listings, searchTerm, activeFilter, sortBy]);

  return (
    <div className="p-6 font-['Poppins'] min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#0F172A' }}>
          Food Listings Monitoring
        </h1>
        <p className="text-lg" style={{ color: '#475569' }}>
          Review and manage all food posts from restaurants
        </p>
      </div>

      {/* Stats Bar */}
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

      {/* Filters & Search */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col xl:flex-row justify-between items-center gap-4">
        
        {/* Search */}
        <div className="relative w-full xl:w-[400px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by food name or restaurant..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm"
            style={{ focusRing: '#9BC7D8' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 xl:pb-0">
            {['All', 'Expiring Soon', 'Low Quantity'].map(filter => (  
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

          {/* Sort Dropdown */}
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

          {/* View Toggle */}
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

      {/* Grid View */}
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
        {filteredListings.map(item => {
          const statusStyle = getStatusStyle(item.status);
          
          return (
            <div 
              key={item.id}
              onClick={() => navigate(`/admin/food-listings/${item.id}`)}
              className={`bg-white rounded-2xl border border-slate-100 overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 ${viewMode === 'list' ? 'flex flex-row h-40' : 'flex flex-col'}`}
            >
              {/* Image Section */}
              <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-full flex-shrink-0' : 'w-full h-48'}`}>
                <img 
                  src={item.image} 
                  alt={item.foodName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <span 
                    className="px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm backdrop-blur-md"
                    style={{ backgroundColor: `${statusStyle.bg}e6`, color: statusStyle.text }}
                  >
                    {statusStyle.label}
                  </span>
                </div>
                
                {/* Overlay Actions */}
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

              {/* Content Section */}
              <div className={`p-5 flex flex-col flex-grow ${viewMode === 'list' ? 'justify-center' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{item.foodName}</h3>
                  <span className="font-bold text-lg" style={{ color: '#9BC7D8' }}>${item.price.toFixed(2)}</span>
                </div>

                <div className="space-y-2 mb-4 flex-grow">
                  <div className="flex items-center text-sm text-slate-500">
                    <Store size={14} className="mr-2 text-slate-400" />
                    <span className="truncate">{item.restaurant}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-500">
                    <Clock size={14} className="mr-2 text-slate-400" />
                    <span>Expires in: <span className={item.status === 'ExpiringSoon' ? 'text-red-500 font-medium' : ''}>{item.expiryTime}</span></span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <span className={`text-sm font-medium ${item.quantity <= 2 ? 'text-red-500' : 'text-slate-600'}`}>
                    Qty: {item.quantity} available
                  </span>
                  
                  {/* Quick Remove Button (Mobile visible) */}
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

      {filteredListings.length === 0 && (
         <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm mt-6">
           <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
           <h3 className="text-xl font-bold text-slate-700 mb-1">No listings found</h3>
           <p className="text-slate-500">Try adjusting your filters or search terms.</p>
         </div>
      )}

      {/* Remove Confirmation Modal */}
      {showRemoveModal && targetListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 text-center animate-in zoom-in duration-200">
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
    </div>
  );
};

export default FoodListing;