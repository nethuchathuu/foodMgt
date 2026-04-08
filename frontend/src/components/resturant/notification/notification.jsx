import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, CheckCircle, Bell, Clock } from 'lucide-react';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isClearAllOpen, setIsClearAllOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/restaurants/notifications', {
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
      await axios.put(`http://localhost:5000/api/restaurants/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchNotifications();
    } catch (err) {
      console.error('Failed to mark read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put('http://localhost:5000/api/restaurants/notifications/mark-all-read', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchNotifications();
    } catch (err) {
      console.error('Failed to mark all read:', err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/restaurants/notifications/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchNotifications();
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  };

  const handleClearAll = async () => {
    try {
      await axios.delete('http://localhost:5000/api/restaurants/notifications/delete-all', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchNotifications();
      setIsClearAllOpen(false);
    } catch (err) {
      console.error('Failed to clear all notifications:', err);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Order': return 'text-blue-500 bg-blue-50';
      case 'Donation': return 'text-green-500 bg-green-50';
      case 'Expiry': return 'text-red-500 bg-red-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  if (loading) return <div className="p-8">Loading notifications...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Bell className="w-6 h-6" /> Notifications
        </h1>
        <div className="flex gap-3">
          <button 
            onClick={markAllAsRead}
            disabled={notifications.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors disabled:opacity-50"
          >
            <CheckCircle className="w-4 h-4" /> Mark All Read
          </button>
          <button 
            onClick={() => setIsClearAllOpen(true)}
            disabled={notifications.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-xl shadow-sm">
          <p className="text-gray-500">No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map(notif => (
            <div 
              key={notif._id} 
              className={`bg-white p-5 rounded-xl shadow-sm border-l-4 flex justify-between items-start transition-all ${notif.isRead ? 'border-gray-200 opacity-70' : 'border-[#1F5E2A]'}`}
            >
              <div className="flex gap-4 items-start">
                <div className={`p-3 rounded-full ${getTypeColor(notif.type)}`}>
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-semibold ${!notif.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                    {notif.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                {!notif.isRead && (
                  <button 
                    onClick={() => markAsRead(notif._id)}
                    className="p-2 text-gray-400 hover:text-[#1F5E2A] hover:bg-green-50 rounded-full transition-colors"
                    title="Mark as read"
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                )}
                <button 
                  onClick={() => deleteNotification(notif._id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
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
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all scale-100 opacity-100 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Trash2 className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Clear All Items?</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Are you sure you want to permanently clear all your notifications? This action cannot be undone.
            </p>
            <div className="flex gap-4 w-full">
              <button 
                onClick={() => setIsClearAllOpen(false)}
                className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleClearAll}
                className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all active:scale-95"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
