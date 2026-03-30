import React from 'react';
import { Bell, Settings, User, Search } from 'lucide-react';

const NavbarRest = () => {
  return (
    <nav className="fixed top-0 left-64 right-0 h-16 bg-white shadow-sm z-10 px-6 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-4 flex-1">
        
      </div>

      <div className="flex items-center gap-5">
        <button className="relative p-2 text-gray-500 hover:text-[#1F5E2A] hover:bg-gray-100 rounded-full transition-colors group">
          <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        <button className="p-2 text-gray-500 hover:text-[#1F5E2A] hover:bg-gray-100 rounded-full transition-colors group">
          <Settings className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        <div className="h-8 w-px bg-gray-200 mx-1"></div>

        <button className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-full pr-3 transition-colors">
          <div className="w-8 h-8 rounded-full bg-[#1F5E2A] flex items-center justify-center text-white">
            <User className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">Hotel Admin</span>
        </button>
      </div>
    </nav>
  );
};

export default NavbarRest;
