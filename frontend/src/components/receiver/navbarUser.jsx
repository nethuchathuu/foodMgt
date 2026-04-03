import React from 'react';
import { Leaf, Bell, User, Settings, Menu } from 'lucide-react';

export default function NavbarUser() {
  return (
    <header className="sticky top-0 z-30 w-full bg-white shadow-sm flex items-center justify-between px-6 py-4" style={{ backgroundColor: '#F8F8F6', borderBottom: '1px solid #D8C3A5' }}>
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-gray-600 hover:text-gray-900">
          <Menu className="w-6 h-6" />
        </button>
        
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors" style={{ color: '#1F5E2A' }}>
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors" style={{ color: '#1F5E2A' }}>
          <Settings className="w-5 h-5" />
        </button>
        <div className="w-10 h-10 rounded-full bg-gray-200 flex flex-shrink-0 items-center justify-center overflow-hidden border-2 cursor-pointer hover:opacity-90 transition-opacity" style={{ borderColor: '#E9A38E' }}>
          <User className="w-6 h-6 text-gray-500" />
        </div>
      </div>
    </header>
  );
}
