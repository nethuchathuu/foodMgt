import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Package, Calendar, MapPin, Store, Phone, Hash, Clock, XCircle } from 'lucide-react';
import SidebarUser from '../slidebarUser';
import NavbarUser from '../navbarUser';
import axios from 'axios';

function getStatusStyle(status) {
  switch (status) {
    case 'Pending': return { bg: '#E9A38E', text: '#FFFFFF', icon: <Clock className="w-4 h-4" /> };
    case 'Accepted': case 'Completed': return { bg: '#9BC7D8', text: '#FFFFFF', icon: <CheckCircle className="w-4 h-4" /> };
    case 'Cancelled': case 'Rejected': return { bg: '#D67A5C', text: '#FFFFFF', icon: <XCircle className="w-4 h-4" /> };
    default: return { bg: '#D8C3A5', text: '#1F5E2A', icon: null };
  }
}

export default function DetailsOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrder(res.data);
      } catch (err) {
        console.error('Failed to fetch order details:', err);
        setError('Failed to load order details.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>
        <SidebarUser />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <NavbarUser />
          <main className="flex-1 overflow-y-auto p-6 lg:p-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F5E2A]"></div>
          </main>
        </div>
      </div>
    );
  }

if (error || !order) {
    return (
      <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>      
        <SidebarUser />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <NavbarUser />
          <main className="flex-1 overflow-y-auto p-6 lg:p-8 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">{error || 'Order not found'}</h2>
            <Link to="/receiver/my-orders" className="text-[#1F5E2A] underline">Return to My Orders</Link>
          </main>
        </div>
      </div>
    );
  }

  const statusStyle = getStatusStyle(order.status);
  const food = order.foodId || {};
  const restaurant = order.restaurantId || {};

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>        
      <SidebarUser />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <NavbarUser />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">

            {/* Back Navigation */}
            <div className="flex justify-between items-center mb-4">
              <Link
                to="/receiver/my-orders"
                className="inline-flex items-center gap-2 font-bold hover:underline transition-all"    
                style={{ color: '#1F5E2A' }}
              >
                <ArrowLeft className="w-5 h-5" />
                Back to My Orders
              </Link>
              
              {order.status === 'Pending' && (
                <button 
                  className="px-6 py-2.5 rounded-xl font-bold text-white shadow-md hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#E9A38E' }}
                >
                  Edit Order
                </button>
              )}
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-2xl shadow-sm border p-8" style={{ borderColor: '#D8C3A5' }}>

              {/* Header Section */}
              <div className="flex justify-between items-start mb-8 border-b pb-6 border-gray-100">
                <div>
                  <h1 className="text-3xl font-bold mb-2" style={{ color: '#1F5E2A' }}>
                    {food.foodName || order.foodName || 'Item not specified'}
                  </h1>
                  <p className="text-gray-500 font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div
                  className="px-4 py-2 rounded-full font-bold text-white shadow-sm flex items-center gap-2 text-sm"
                  style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                >
                  {statusStyle.icon}
                  {order.status || 'Pending'}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Order Information Section */}
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Ordered Quantity</label>
                  <p className="text-xl font-medium flex items-center gap-2" style={{ color: '#D67A5C' }}>
                    <Hash className="w-5 h-5 opacity-70" />
                    {order.quantity} packs
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Order ID</label>
                  <p className="text-lg font-mono text-gray-600">ORD-{order._id}</p>
                </div>
              </div>

              {/* Restaurant Info Fragment */}
              {restaurant.name && (
                <div className="mb-8 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <h3 className="font-bold text-lg mb-4" style={{ color: '#1F5E2A' }}>Provider Info</h3>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                    <div className="flex items-center gap-2">
                       <Store className="w-5 h-5 text-gray-400" />
                       <span className="font-bold text-gray-700">{restaurant.name || 'Unknown'}</span>
                    </div>
                    {restaurant.address && (
                      <div className="flex items-center gap-2">
                         <MapPin className="w-5 h-5 text-gray-400" />
                         <span className="text-gray-600 font-medium">{restaurant.address}</span>
                      </div>
                    )}
                    {restaurant.phone && (
                      <div className="flex items-center gap-2">
                         <Phone className="w-5 h-5 text-gray-400" />
                         <span className="text-gray-600 font-medium">{restaurant.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
