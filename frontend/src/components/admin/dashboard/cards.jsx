import React, { useState, useEffect } from 'react';
import { Store, Building, Users, AlertCircle, Utensils, HeartHandshake } from 'lucide-react';
import axios from 'axios';

const Cards = () => {
  const [stats, setStats] = useState({
    totalRestaurants: 0,
    totalOrganizations: 0,
    totalUsers: 0,
    pendingApprovals: 0,
    todaysFoodListings: 0,
    todaysDonations: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/admin/dashboard-stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };
    fetchStats();
  }, []);

  const cardData = [
    {
      title: "Total Restaurants",
      value: stats.totalRestaurants,
      icon: Store,
      color: "#60A5FA", // Soft Blue from global theme
      bgLight: "#EFF6FF",
      trend: "Total registered"
    },
    {
      title: "Total Organizations",
      value: stats.totalOrganizations,
      icon: Building,
      color: "#3B82F6", // Slightly deeper blue
      bgLight: "#DBEAFE",
      trend: "Total registered"
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "#2563EB", // Stronger blue
      bgLight: "#BFDBFE",
      trend: "Total regular users"
    },
    {
      title: "Pending Approvals",
      value: stats.pendingApprovals,
      icon: AlertCircle,
      color: "#F43F5E", // Alert Red from global theme
      bgLight: "#FFE4E6",
      priority: "high",
      note: "Requires immediate action!"
    },
    {
      title: "Today's Food Listings",
      value: stats.todaysFoodListings,
      icon: Utensils,
      color: "#818CF8", // Indigo from global theme
      bgLight: "#EEF2FF",
      trend: "Listing active"
    },
    {
      title: "Today's Donations",
      value: stats.todaysDonations,
      icon: HeartHandshake,
      color: "#34D399", // Emerald from global theme
      bgLight: "#ECFDF5",
      trend: "Donations recorded"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 font-['Poppins']">
      {cardData.map((card, index) => {
        const IconComponent = card.icon;
        
        return (
          <div 
            key={index}
            className={`group bg-white p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${card.priority === 'high' ? 'border border-red-200' : ''}`}
            style={{
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div 
                className="w-[45px] h-[45px] rounded-xl flex items-center justify-center transition-colors"
                style={{ backgroundColor: card.bgLight, color: card.color }}
              >
                <IconComponent size={24} />
              </div>
              
              {card.priority === 'high' && (
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-1">
                {card.title}
              </h3>
              <p className="text-3xl font-bold text-slate-900 mb-3">
                {card.value}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
              <span 
                className="font-medium"
                style={{ color: card.priority === 'high' ? '#F43F5E' : '#64748B' }}
              >
                {card.note || card.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
