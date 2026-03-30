import React, { useState } from 'react';
import { 
  LayoutDashboard,
  Utensils,
  ShoppingCart,
  Heart,
  Trash2,
  DollarSign,
  Package
} from 'lucide-react';
import logo from '../../assets/foodMgtLogo.png';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'listings', label: 'Food Listings', icon: Utensils },
  { id: 'orders', label: 'Food Orders', icon: ShoppingCart },
  { id: 'donations', label: 'Donation Requests', icon: Heart },
  { id: 'wastage', label: 'Wastage Tracking', icon: Trash2 },
  { id: 'loss', label: 'Financial Loss', icon: DollarSign },
];

const SidebarRest = ({ activeItem, setActiveItem }) => {
  const userStr = localStorage.getItem('restaurantUser') || localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#1F5E2A] rounded-r-3xl shadow-xl flex flex-col z-20 transition-all duration-300">
      <div className="pt-1 pb-6 px-6 border-b border-white/10">
        <div className="flex flex-col items-center text-center gap-0 mb-1">
          <img src={logo} alt="FoodMgt Logo" className="w-30 h-30 object-contain" />
          {/* <h1 className="text-2xl font-bold text-[#FFDD59] mt-0">SecondServer</h1> */}
          <h1 className="text-2xl font-bold text-[#FFDD59] mt-0">{user?.name || "Hotel Name"}</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl w-full transition-all duration-300 group ${
                isActive
                  ? 'bg-[#A7D63B] text-[#1F5E2A] shadow-md'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>

    </aside>
  );
};

export default SidebarRest;
