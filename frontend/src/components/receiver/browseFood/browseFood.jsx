import React, { useState } from 'react';
import { Search, MapPin, Clock, Info, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import SidebarUser from '../slidebarUser';
import NavbarUser from '../navbarUser';

const mockFoods = [
  {
    id: 1,
    name: 'Vegetable Rice Pack',
    restaurant: 'Green Cafe',
    category: 'Rice',
    location: 'Colombo',
    quantity: 5,
    expiresIn: '2 hours',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Assorted Bakery Items',
    restaurant: 'Fresh Bakes',
    category: 'Bakery',
    location: 'Nearby',
    quantity: 12,
    expiresIn: '4 hours',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Fruit Juices',
    restaurant: 'Juice Bar',
    category: 'Drinks',
    location: 'Colombo',
    quantity: 8,
    expiresIn: '1 day',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
];

const categories = ["All", "Rice", "Bakery", "Drinks", "Snacks"];
const locations = ["Nearby", "Colombo", "Other"];

export default function BrowseFood() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLocation, setActiveLocation] = useState('Nearby');

  // Filter functionality
  const filteredFoods = mockFoods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          food.restaurant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || food.category === activeCategory;
    const matchesLocation = activeLocation === 'All' || food.location === activeLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>
      <SidebarUser />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <NavbarUser />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#1F5E2A' }}>Browse Food</h1>
              <p className="text-gray-600" style={{ color: '#1F5E2A', opacity: 0.8 }}>Find and order available food near you</p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 flex flex-col gap-6">
              {/* Search Bar */}
              <div className="relative max-w-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ borderColor: '#D8C3A5', focusRing: '#9BC7D8' }}
                  placeholder="Search food or restaurant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-6">
                
                {/* Category Filter */}
                <div>
                  <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-gray-500">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className="px-4 py-2 rounded-full text-sm font-medium transition-colors border"
                        style={{
                          backgroundColor: activeCategory === cat ? '#E9A38E' : '#FFFFFF',
                          color: activeCategory === cat ? '#FFFFFF' : '#1F5E2A',
                          borderColor: activeCategory === cat ? '#E9A38E' : '#D8C3A5'
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-gray-500">Location</h3>
                  <div className="flex flex-wrap gap-2">
                    {locations.map(loc => (
                      <button
                        key={loc}
                        onClick={() => setActiveLocation(loc)}
                        className="px-4 py-2 rounded-full text-sm font-medium transition-colors border"
                        style={{
                          backgroundColor: activeLocation === loc ? '#9BC7D8' : '#FFFFFF',
                          color: activeLocation === loc ? '#FFFFFF' : '#1F5E2A',
                          borderColor: activeLocation === loc ? '#9BC7D8' : '#D8C3A5'
                        }}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Food Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFoods.map(food => (
                <div 
                  key={food.id} 
                  className="bg-white border rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col"
                  style={{ borderColor: '#D8C3A5' }}
                >
                  {/* Image */}
                  <div className="h-48 w-full relative">
                    <img 
                      src={food.image} 
                      alt={food.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm" style={{ color: '#E9A38E' }}>
                      {food.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold truncate pr-2" style={{ color: '#1F5E2A' }}>{food.name}</h3>
                    </div>
                    
                    <p className="text-sm font-medium mb-4" style={{ color: '#D67A5C' }}>
                      <span className="opacity-80">Qty:</span> {food.quantity} available
                    </p>

                    <div className="space-y-2 mb-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 opacity-70" />
                        <span>{food.restaurant} • {food.location}</span>
                      </div>
                      <div className="flex items-center gap-2 font-medium" style={{ color: '#E9A38E' }}>
                        <Clock className="w-4 h-4" />
                        <span>Expires in: {food.expiresIn}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex gap-3">
                      <Link 
                        to={`/receiver/food/${food.id}`}
                        className="flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl font-semibold transition-opacity hover:opacity-90"
                        style={{ backgroundColor: '#9BC7D8', color: '#FFFFFF' }}
                      >
                        <Info className="w-4 h-4" />
                        Details
                      </Link>
                      <Link 
                        to={`/receiver/order/${food.id}`}
                        className="flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl font-semibold transition-opacity hover:opacity-90"
                        style={{ backgroundColor: '#E9A38E', color: '#FFFFFF' }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Order
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredFoods.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: '#1F5E2A' }}>No food items found</h3>
                  <p>Try adjusting your search or filters.</p>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
