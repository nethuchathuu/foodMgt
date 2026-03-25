import React from 'react';
import SidebarUser from '../slidebarUser';
import NavbarUser from '../navbarUser';
import ViewOrders from './viewOrders';

export default function MyOrders() {
  // Mock statistics based on the UI request layout
  const stats = [
    { label: "Pending", count: 2, color: "#E9A38E" },
    { label: "Accepted", count: 1, color: "#9BC7D8" },
    { label: "Completed", count: 5, color: "#D67A5C" }
  ];

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>
      <SidebarUser />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <NavbarUser />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#1F5E2A' }}>My Orders</h1>
              <p className="opacity-80" style={{ color: '#1F5E2A' }}>Track and manage your food orders</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div 
                  key={stat.label} 
                  className="bg-white p-6 rounded-2xl shadow-sm border flex items-center justify-between"
                  style={{ borderColor: '#D8C3A5' }}
                >
                  <h3 className="text-lg font-semibold text-gray-600">{stat.label}</h3>
                  <div 
                    className="text-3xl font-bold rounded-full w-12 h-12 flex items-center justify-center text-white shadow-sm"
                    style={{ backgroundColor: stat.color }}
                  >
                    {stat.count}
                  </div>
                </div>
              ))}
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
