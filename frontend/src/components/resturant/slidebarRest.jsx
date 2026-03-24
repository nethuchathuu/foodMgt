import React, { useState } from 'react';
import { 
  LayoutDashboard,
  Utensils,
  ShoppingCart,
  Heart,
  Trash2,
  DollarSign,
  Package,
  Leaf
} from 'lucide-react';

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
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#1F5E2A] rounded-r-3xl shadow-xl flex flex-col z-20 transition-all duration-300">
      <div className="p-6 pb-8 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-[#A7D63B]/20 rounded-lg">
            <Leaf className="w-6 h-6 text-[#A7D63B]" />
          </div>
          <h1 className="text-2xl font-bold text-[#A7D63B]">FoodShare</h1>
        </div>
        <p className="text-white text-sm opacity-80 ml-11">Hotel Name</p>
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

      <div className="p-4 mt-auto">
        <button className="w-full bg-white/10 hover:bg-[#A7D63B] hover:text-[#1F5E2A] text-white py-3 rounded-xl transition-colors font-medium text-sm flex items-center justify-center gap-2">
          <Utensils className="w-4 h-4" />
          Quick Post Food
        </button>
      </div>
    </aside>
  );
};

export default SidebarRest;
