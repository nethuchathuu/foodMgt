import React from 'react';
import { Clock, CheckCircle, Star } from 'lucide-react';
import SidebarUser from '../slidebarUser';
import NavbarUser from '../navbarUser';
import ViewOrders from './viewOrders';

export default function MyOrders() {
  const stats = [
    { 
      id: "pending", 
      label: "Pending Orders", 
      count: 2, 
      icon: Clock, 
      bgAccent: "#E9A38E", 
      textColor: "#1F5E2A",
      animationClass: "animate-pulse" // Mocking pulseGlow
    },
    { 
      id: "accepted", 
      label: "Accepted Orders", 
      count: 1, 
      icon: CheckCircle, 
      bgAccent: "#9BC7D8", 
      textColor: "#1F5E2A",
      animationClass: "animate-bounce" // Mocking bounceSoft
    },
    { 
      id: "completed", 
      label: "Completed Orders", 
      count: 5, 
      icon: Star, 
      bgAccent: "#D67A5C", 
      textColor: "#1F5E2A",
      animationClass: "" // Shine effect handled via CSS hover instead
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>
      <SidebarUser />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <NavbarUser />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Header */}
            <div className="animate-fade-in-up">
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#1F5E2A' }}>My Orders</h1>
              <p className="opacity-80" style={{ color: '#1F5E2A' }}>Track and manage your food orders</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={stat.id} 
                    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border flex items-center justify-between animate-fade-in-up"
                    style={{ borderColor: '#D8C3A5', animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-opacity-20`} style={{ backgroundColor: `${stat.bgAccent}33` }}>
                        <Icon className={`w-6 h-6 ${stat.animationClass}`} style={{ color: stat.bgAccent }} />
                      </div>
                      <h3 className="text-lg font-semibold" style={{ color: stat.textColor }}>{stat.label}</h3>
                    </div>
                    <div 
                      className="text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: stat.bgAccent }}
                    >
                      {stat.count}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View Orders List */}
            <div className="mt-8">
              <ViewOrders />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
