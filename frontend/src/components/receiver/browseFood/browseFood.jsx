import React, { useState } from 'react';
import { Search, Heart } from 'lucide-react';
import SidebarUser from '../slidebarUser';
import NavbarUser from '../navbarUser';
import AvailableFood from './availableFood';

const mockFoods = [
  {
    id: 1,
    name: 'Vegetable Rice Pack',
    restaurant: 'Green Cafe',
    category: 'Rice',
    location: 'Colombo',
    quantity: 5,
    expiresIn: '2 hours',
    donationEnabled: true,
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
    donationEnabled: false,
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
    donationEnabled: true,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
];

const categories = ["All", "Rice", "Bakery", "Drinks", "Snacks"];

export default function BrowseFood() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [donationOnly, setDonationOnly] = useState(false);

  // Filter functionality
  const filteredFoods = mockFoods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          food.restaurant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || food.category === activeCategory;
    const matchesDonation = donationOnly ? food.donationEnabled : true;
    
    return matchesSearch && matchesCategory && matchesDonation;
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
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
                
                {/* Category Filter */}
                <div className="flex-1">
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

                {/* Donation Filter */}
                <div className="mb-2">
                  <button
                    onClick={() => setDonationOnly(!donationOnly)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border shadow-sm"
                    style={{
                      backgroundColor: donationOnly ? '#1F5E2A' : '#FFFFFF',
                      color: donationOnly ? '#FFFFFF' : '#1F5E2A',
                      borderColor: '#1F5E2A'
                    }}
                  >
                    <Heart className="h-4 w-4" fill={donationOnly ? "#FFFFFF" : "none"} />
                    Donation Available Only
                  </button>
                </div>

              </div>
            </div>

            {/* Food Grid */}
            <AvailableFood foods={filteredFoods} />

          </div>
        </main>
      </div>
    </div>
  );
}
