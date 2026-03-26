import React from 'react';
import { Store, Building, Users, AlertCircle, Utensils, HeartHandshake } from 'lucide-react';

const Cards = () => {
  const cardData = [
    {
      title: "Total Restaurants",
      value: "120",
      icon: Store,
      color: "#60A5FA", // Soft Blue from global theme
      bgLight: "#EFF6FF",
      trend: "+5 this week"
    },
    {
      title: "Total Organizations",
      value: "75",
      icon: Building,
      color: "#3B82F6", // Slightly deeper blue
      bgLight: "#DBEAFE",
      trend: "+3 this week"
    },
    {
      title: "Total Users",
      value: "540",
      icon: Users,
      color: "#2563EB", // Stronger blue
      bgLight: "#BFDBFE",
      trend: "+12 today"
    },
    {
      title: "Pending Approvals",
      value: "9",
      icon: AlertCircle,
      color: "#F43F5E", // Alert Red from global theme
      bgLight: "#FFE4E6",
      priority: "high",
      note: "Requires immediate action!"
    },
    {
      title: "Today's Food Listings",
      value: "34",
      icon: Utensils,
      color: "#818CF8", // Indigo from global theme
      bgLight: "#EEF2FF",
      trend: "+10 today"
    },
    {
      title: "Today's Donations",
      value: "18",
      icon: HeartHandshake,
      color: "#34D399", // Emerald from global theme
      bgLight: "#ECFDF5",
      trend: "+6 today"
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
