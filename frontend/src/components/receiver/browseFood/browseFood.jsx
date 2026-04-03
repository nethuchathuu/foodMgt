import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Heart } from 'lucide-react';
import Fuse from 'fuse.js';
import SidebarUser from '../slidebarUser';
import NavbarUser from '../navbarUser';
import AvailableFood from './availableFood';

const categories = ["All", "Rice", "Bakery", "Drinks", "Snacks"]; // We can keep categories, but FoodListing doesn't currently strictly enforce them unless added later

export default function BrowseFood() {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [donationOnly, setDonationOnly] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchAvailableFoods = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/food-listings/available', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFoods(res.data);
    } catch (error) {
      console.error('Failed to fetch available foods:', error);
    }
  };

  useEffect(() => {
    fetchAvailableFoods();
    
    // Poll for updates and expiry evaluation every 30 seconds
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      fetchAvailableFoods();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Filter functionality
  let filteredFoods = foods.filter(food => {
    // Check if truly not expired right now
    if (food.expiryTime) {
      const expiry = new Date(food.expiryTime).getTime();
      if (expiry <= currentTime.getTime()) {
        return false;
      }
    }
    
    const matchesDonation = donationOnly ? food.acceptableForDonation : true;
    return matchesDonation;
  });

  // Apply Fuzzy Search for Search Term
  if (searchTerm.trim() !== '') {
    const fuseSearch = new Fuse(filteredFoods, {
      keys: ['foodName', 'restaurantId.name'],
      threshold: 0.4,
    });
    filteredFoods = fuseSearch.search(searchTerm).map(result => result.item);
  }

  // Apply Fuzzy Search for Categories
  if (activeCategory !== 'All') {
    const fuseCategory = new Fuse(filteredFoods, {
      keys: ['foodName', 'description'],
      threshold: 0.4,
    });
    filteredFoods = fuseCategory.search(activeCategory).map(result => result.item);
  }

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
            <AvailableFood foods={filteredFoods} currentTime={currentTime} />

          </div>
        </main>
      </div>
    </div>
  );
}