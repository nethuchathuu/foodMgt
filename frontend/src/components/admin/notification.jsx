import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Store, Building, AlertCircle, ShoppingCart, HeartHandshake, CheckCircle, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const getTypeConfig = (type, priority) => {
  const config = {
    "Restaurant Approval": { icon: Store, color: "#9BC7D8", bg: "#EAF6FB" },
    "Organization Approval": { icon: Building, color: "#6FAFC4", bg: "#EAF6FB" },
    "User Alert": { icon: AlertCircle, color: "#D67A5C", bg: "#FDECEA" },
    "Order Issue": { icon: ShoppingCart, color: "#E9A38E", bg: "#FFF4F0" },
    "Donation Request": { icon: HeartHandshake, color: "#7FB3C9", bg: "#EAF6FB" },
    "System Update": { icon: Bell, color: "#94A3B8", bg: "#F1F5F9" }
  };

  const priorityColor = {
    "High": "#F43F5E",
    "Medium": "#F59E0B",
    "Low": "#3B82F6"
  };

  return { ...config[type] || config["System Update"], priorityColor: priorityColor[priority] || '#94A3B8' };
};

const Notification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Approvals", "Users", "Orders", "Donations", "Alerts"];

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/admin/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  const markAsRead = async (e, id) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/admin/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, status: 'read' } : n));
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/admin/notifications/read-all`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => ({ ...n, status: 'read' })));
    } catch (error) {
      console.error("Error marking all notifications as read", error);
    }
  };

  const clearNotification = async (e, id) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch (error) {
      console.error("Error deleting notification", error);
    }
  };

  const getTimeAgo = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return interval + " years ago";
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + " months ago";
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + " days ago";
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + " hours ago";
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + " mins ago";
    return Math.floor(seconds) + " secs ago";
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "All") return true;
    if (activeTab === "Users" && n.type === "User Alert") return true;
    return n.category === activeTab || (activeTab === "Alerts" && n.type === "System Update");
  });

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <div className="p-6 font-['Poppins'] min-h-screen" style={{ backgroundColor: '#F0F9FF', maxWidth: '900px', margin: '0 auto' }}>
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3" style={{ color: '#0F172A' }}>
            Notifications
            {unreadCount > 0 && (
              <span className="text-sm px-3 py-1 rounded-full text-white font-medium" style={{ backgroundColor: '#E9A38E' }}>
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-lg" style={{ color: '#475569' }}>
            Stay updated with system activities and alerts
          </p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-colors bg-white shadow-sm border border-slate-200 hover:bg-slate-50 text-slate-700"
          >
            <CheckCircle size={16} /> Mark all read
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-white shadow-md text-slate-800' 
                : 'text-slate-500 hover:bg-white/60'
            }`}
            style={activeTab === tab ? { color: '#2F3E46' } : {}}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => {
              const { icon: Icon, color, bg, priorityColor } = getTypeConfig(notif.type, notif.priority);
              const isUnread = notif.status === 'unread';

              return (
                <motion.div
                  key={notif._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => navigate(notif.link)}
                  className={`group relative flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border transition-all duration-300 cursor-pointer overflow-hidden ${isUnread ? 'hover:-translate-y-1' : 'hover:bg-slate-50'}`}
                  style={{ 
                    borderColor: isUnread ? '#E2E8F0' : '#F1F5F9',
                    borderLeft: `4px solid ${priorityColor}` 
                  }}
                >
                  {isUnread && (
                    <span 
                      className="absolute top-1/2 -left-0 hidden md:block w-2 h-2 rounded-full transform -translate-y-1/2"
                      style={{ backgroundColor: '#E9A38E', boxShadow: '0 0 8px #E9A38E', marginLeft: '-1px' }}
                    ></span>
                  )}

                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: bg, color: color }}>
                    <Icon size={24} />
                  </div>

                  <div className="flex-grow min-w-0 pr-10">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-semibold truncate" style={{ color: isUnread ? '#2F3E46' : '#64748B' }}>
                        {notif.title}
                      </h3>
                      <span className="text-xs font-medium whitespace-nowrap" style={{ color: '#9BC7D8' }}>
                        {notif.time || getTimeAgo(notif.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm pr-4 md:pr-0" style={{ color: '#6C757D' }}>
                      {notif.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {isUnread && (
                      <button 
                        onClick={(e) => markAsRead(e, notif._id)}
                        className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    <button 
                        onClick={(e) => clearNotification(e, notif._id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Mobile navigation indicator */}
                  <div className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2">
                    <ChevronRight size={18} className="text-slate-300" />
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                <Bell size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#2F3E46' }}>All caught up!</h3>
              <p style={{ color: '#6C757D' }}>You don't have any {activeTab !== "All" ? activeTab.toLowerCase() : ''} notifications.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Notification;
