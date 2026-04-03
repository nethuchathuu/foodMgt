import React from 'react';
import SidebarUser from './slidebarUser';
import NavbarUser from './navbarUser';
import ReceiverDashboardContent from './dashboard/dashboard';
import { Utensils } from 'lucide-react';

export default function ReceiverDashboard() {
  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>
      <SidebarUser />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <NavbarUser />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header section with theme colors */}
            <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border relative overflow-hidden" style={{ borderColor: '#D8C3A5' }}>
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Utensils className="w-32 h-32" style={{ color: '#1F5E2A' }} />
              </div>
              <div className="relative z-10 max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1F5E2A' }}>
                  Welcome back, 
                </h1>
                <p className="text-lg opacity-90" style={{ color: '#D67A5C' }}>
                  Together, we can make a difference. Let's find food and reduce waste today.
                </p>
              </div>
            </div>

            <ReceiverDashboardContent />
            
          </div>
        </main>
      </div>
    </div>
  );
}
