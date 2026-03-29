import React from 'react';
import { Bell, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NavbarAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin/login');
  };

  return (
    <header 
      className="sticky top-0 z-10 w-full flex items-center justify-between px-6 font-['Poppins'] shadow-sm"
      style={{ 
        height: '70px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #eee'
      }}
    >
      {/* Mobile Menu Spacer or Future Toggle */}
      <div className="md:hidden">
        <h2 className="font-bold text-lg" style={{ color: '#1E3A8A' }}>Admin</h2>
      </div>
      <div className="hidden md:block">
        {/* Placeholder for Breadcrumbs or Search */}
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={() => navigate('/admin/notifications')}
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          style={{ color: '#475569' }}
        >
          <Bell size={20} />
          <span 
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: '#E9A38E' }}
          ></span>
        </button>

        <button 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          style={{ color: '#475569' }}
          onClick={() => navigate('/admin/settings')}
        >
          <Settings size={20} />
        </button>

        <div className="relative group cursor-pointer">
          <div 
            className="flex items-center justify-center w-10 h-10 rounded-full text-white"
            style={{ backgroundColor: '#60A5FA' }}
          >
            <User size={20} />
          </div>
          
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block border" style={{ borderColor: '#eee' }}>
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              View Profile
            </button>
            <button 
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarAdmin;
