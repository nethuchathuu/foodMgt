import React, { useState, useEffect } from 'react';
import NavbarRest from './navbarRest';
import SidebarRest from './slidebarRest';
import MainContentRest from './dashboard/mainContentRest';
import FoodListing from './foodListing/foodListing';
import FoodOrders from './foodOrders/foodOrders';
import DonationRequests from './donationRequests/donationRequests';
import WastageTracking from './wastageTracking/wastageTracking.jsx';
import FinancialLoss from './financialLoss/financialLoss';
import Inventory from './inventory/inventory.jsx';
import Notification from './notification/notification.jsx';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('restActiveTab') || 'inventory';
  });

  useEffect(() => {
    localStorage.setItem('restActiveTab', activeTab);
  }, [activeTab]);

  return (
    <div className="flex bg-[#F8F8F6] min-h-screen">
      {/* Fixed Sidebar */}
      <SidebarRest activeItem={activeTab} setActiveItem={setActiveTab} />

      {/* Main Content Wrapper */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Fixed Topbar */}
        <NavbarRest setActiveItem={setActiveTab} />

        {/* Scrollable Content Area */}
        <div className="mt-16 flex-1 overflow-x-hidden">
          {activeTab === 'dashboard' && <MainContentRest />}
          {activeTab === 'inventory' && <Inventory />}
          {activeTab === 'listings' && <FoodListing />}
          {activeTab === 'orders' && <FoodOrders />}
          {activeTab === 'donations' && <DonationRequests />}
          {activeTab === 'wastage' && <WastageTracking />}
          {activeTab === 'loss' && <FinancialLoss />}
          {activeTab === 'notifications' && <Notification />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
