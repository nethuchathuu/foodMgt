import React, { useState } from 'react';
import NavbarRest from './navbarRest';
import SidebarRest from './slidebarRest';
import MainContentRest from './dashboard/mainContentRest';
import FoodListing from './foodListing/foodListing';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex bg-[#F8F8F6] min-h-screen">
      {/* Fixed Sidebar */}
      <SidebarRest activeItem={activeTab} setActiveItem={setActiveTab} />

      {/* Main Content Wrapper */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Fixed Topbar */}
        <NavbarRest />

        {/* Scrollable Content Area */}
        <div className="mt-16 flex-1 overflow-x-hidden">
          {activeTab === 'dashboard' && <MainContentRest />}
          {activeTab === 'listings' && <FoodListing />}
          {/* Add other tabs as needed */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
