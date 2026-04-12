import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, CheckCircle, Bell, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SidebarUser from '../slidebarUser';
import NavbarUser from '../navbarUser';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isClearAllOpen, setIsClearAllOpen] = useState(false);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/receivers/notifications', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNotifications(res.data);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/receivers/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchNotifications();
    } catch (err) {
      console.error('Failed to mark read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put('http://localhost:5000/api/receivers/notifications/mark-all-read', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchNotifications();
    } catch (err) {
      console.error('Failed to mark all read:', err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/receivers/notifications/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchNotifications();
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  };

  const handleClearAll = async () => {
    try {
      await axios.delete('http://localhost:5000/api/receivers/notifications/delete-all', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchNotifications();
      setIsClearAllOpen(false);
    } catch (err) {
      console.error('Failed to clear all notifications:', err);
    }
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'order': return 'text-[#9BC7D8] bg-[#9BC7D8]/20';
      case 'donation': return 'text-[#1F5E2A] bg-[#A7D63B]/20';
      case 'expiry': return 'text-[#D67A5C] bg-[#D67A5C]/20';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  if (loading) return <div className="p-8 font-medium text-[#1F5E2A]">Loading notifications...</div>;

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>
      <SidebarUser />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <NavbarUser />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-[#F8F8F6]">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-500 hover:text-[#1F5E2A] transition-colors mb-6 font-bold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-extrabold text-[#1F5E2A] flex items-center gap-3">
                <Bell className="w-8 h-8" /> Notifications
              </h1>
              <div className="flex gap-3">
                <button 
                  onClick={markAllAsRead}
                  disabled={notifications.length === 0}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#C8E66A] hover:bg-[#A7D63B] text-[#1F5E2A] rounded-xl font-bold transition-all shadow-sm disabled:opacity-50"
                >
                  <CheckCircle className="w-5 h-5" /> Mark All Read
                </button>
                <button 
                  onClick={() => setIsClearAllOpen(true)}
                  disabled={notifications.length === 0}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#E9A38E] hover:opacity-90 text-white rounded-xl font-bold transition-all shadow-sm disabled:opacity-50"
                >
                  <Trash2 className="w-5 h-5" /> Clear All
                </button>
              </div>
            </div>

        {notifications.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-dashed border-[#D8C3A5]">
             <Bell className="w-12 h-12 mx-auto mb-3 opacity-20 text-[#1F5E2A]" />
             <p className="text-lg font-medium text-[#1F5E2A]">No notifications yet! 🌿</p>
             <p className="text-sm mt-1 text-gray-500">You're all caught up for now.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map(notif => (
              <div 
                key={notif._id} 
                className={`bg-white p-5 rounded-2xl shadow-sm border-l-[6px] flex justify-between items-start transition-all hover:-translate-y-1 hover:shadow-md ${notif.isRead ? 'border-[#D8C3A5] opacity-75' : 'border-[#1F5E2A]'}`}
              >
                <div className="flex gap-4 items-start">
                  <div className={`p-3 rounded-full ${getTypeColor(notif.type)}`}>
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${!notif.isRead ? 'text-[#1F5E2A]' : 'text-gray-600'}`}>
                      {notif.title}
                    </h3>
                    <p className="text-gray-600 mt-1 font-medium">{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1 font-bold">
                      <Clock className="w-4 h-4" /> 
                      {new Date(notif.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {!notif.isRead && (
                    <button 
                      onClick={() => markAsRead(notif._id)}
                      className="p-2 text-gray-400 hover:text-[#1F5E2A] hover:bg-[#C8E66A]/30 rounded-xl transition-colors"
                      title="Mark as read"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(notif._id)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-[#E9A38E] rounded-xl transition-colors"
                    title="Delete notification"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isClearAllOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#E9A38E]/20 rounded-full flex items-center justify-center mb-6">
                <Trash2 className="w-10 h-10 text-[#E9A38E]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1F5E2A] mb-2">Clear All Items?</h2>
              <p className="text-gray-500 mb-8 font-medium">
                Are you sure you want to permanently clear all your notifications? This action cannot be undone.
              </p>
              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => setIsClearAllOpen(false)}
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-[#1F5E2A] bg-[#F8F8F6] hover:bg-[#D8C3A5] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleClearAll}
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-[#E9A38E] hover:opacity-90 shadow-lg transition-all active:scale-95"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notification;