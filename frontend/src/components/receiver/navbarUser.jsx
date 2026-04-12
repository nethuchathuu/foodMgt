import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Leaf, Bell, User, Settings, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NavbarUser() {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/receivers/notifications', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const unread = res.data.filter(n => !n.isRead).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Use an interval to poll notifications periodically
    const intervalId = setInterval(fetchNotifications, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full bg-white shadow-sm flex items-center justify-between px-6 py-4" style={{ backgroundColor: '#F8F8F6', borderBottom: '1px solid #D8C3A5' }}>
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-gray-600 hover:text-gray-900">
          <Menu className="w-6 h-6" />
        </button>
        
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/receiver/notification')}
          className="relative p-2 rounded-full transition-colors hover:bg-[#C8E66A]" 
          style={{ color: '#1F5E2A' }}
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 text-[10px] font-bold text-white bg-[#D67A5C] rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
        {/*<button className="p-2 rounded-full hover:bg-gray-200 transition-colors" style={{ color: '#1F5E2A' }}>
          <Settings className="w-5 h-5" />
        </button>*/}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex flex-shrink-0 items-center justify-center overflow-hidden border-2 cursor-pointer hover:opacity-90 transition-opacity" style={{ borderColor: '#E9A38E' }}>
          <User className="w-6 h-6 text-gray-500" />
        </div>
      </div>
    </header>
  );
}
