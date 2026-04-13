import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, CheckCircle, XCircle, Star } from 'lucide-react';
import SidebarUser from '../slidebarUser';
import NavbarUser from '../navbarUser';
import ViewOrders from './viewOrders';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get('http://localhost:5000/api/orders/my-orders', config);
        setOrders(res.data || []);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const acceptedCount = orders.filter(o => o.status === 'Accepted' || o.status === 'Completed').length;
  const rejectedCount = orders.filter(o => o.status === 'Rejected' || o.status === 'Cancelled').length;

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>
      <SidebarUser />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <NavbarUser />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#1F5E2A' }}>My Orders</h1>
              <p className="text-gray-600 font-medium">Track and manage your food orders</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pending */}
              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border animate-pulse-soft flex items-start gap-4" style={{ borderColor: '#D8C3A5' }}>
                <div className="p-3 rounded-xl bg-orange-50">
                  <Clock className="w-8 h-8" style={{ color: '#E9A38E' }} />
                </div>
                <div>
                  <h3 className="text-gray-500 font-bold mb-1">Pending Orders</h3>
                  <p className="text-3xl font-black" style={{ color: '#1F5E2A' }}>{pendingCount}</p>
                </div>
              </div>

              {/* Accepted/Completed */}
              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border animate-bounce-soft flex items-start gap-4" style={{ borderColor: '#D8C3A5' }}>
                <div className="p-3 rounded-xl bg-blue-50">
                  <CheckCircle className="w-8 h-8" style={{ color: '#9BC7D8' }} />
                </div>
                <div>
                  <h3 className="text-gray-500 font-bold mb-1">Accepted Orders</h3>
                  <p className="text-3xl font-black" style={{ color: '#1F5E2A' }}>{acceptedCount}</p>
                </div>
              </div>

              {/* Rejected/Cancelled */}
              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border animate-shake-soft flex items-start gap-4" style={{ borderColor: '#D8C3A5' }}>
                <div className="p-3 rounded-xl bg-red-50">
                  <XCircle className="w-8 h-8" style={{ color: '#D67A5C' }} />
                </div>
                <div>
                  <h3 className="text-gray-500 font-bold mb-1">Cancelled Orders</h3>
                  <p className="text-3xl font-black" style={{ color: '#1F5E2A' }}>{rejectedCount}</p>
                </div>
              </div>
            </div>

            {/* List component */}
            <div className="pt-6">
              <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 relative overflow-hidden">
                {/* Accent Top Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E9A38E] to-[#1F5E2A]"></div>

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: '#1F5E2A' }}>
                    📋 Order History
                  </h2>

                  <div className="flex items-center gap-3">
                    {orders.length > 0 && (
                      <button 
                        onClick={() => setShowClearConfirm(true)}
                        className="px-4 py-1.5 text-sm font-bold text-white rounded-xl shadow-sm hover:opacity-90 transition-all"
                        style={{ backgroundColor: '#D67A5C' }}
                      >
                        Clear All
                      </button>
                    )}
                    <span className="text-sm bg-green-100 px-3 py-1 rounded-full font-bold" style={{ color: '#1F5E2A', backgroundColor: '#E9A38E33' }}>
                      {orders?.length || 0} Orders
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-gray-100 mb-4"></div>

                {/* Content */}
                <ViewOrders orders={orders} loading={loading} />
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-fade-scale text-center p-8">
            <XCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#D67A5C' }} />
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#1F5E2A' }}>Clear All Orders?</h2>
            <p className="text-gray-600 mb-8">Are you sure you want to clear all your orders? This action cannot be undone.</p>
            <div className="flex gap-3">
               <button onClick={() => setShowClearConfirm(false)} className="flex-1 py-3 rounded-xl font-bold" style={{ backgroundColor: '#D8C3A5', color: '#1F5E2A' }}>Cancel</button>
               <button onClick={() => { setOrders([]); setShowClearConfirm(false); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-md hover:opacity-90" style={{ backgroundColor: '#D67A5C' }}>Yes, Clear All</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
