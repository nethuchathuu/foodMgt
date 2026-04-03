import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Package, Calendar, MapPin, Store, Phone } from 'lucide-react';
import SidebarUser from '../slidebarUser';
import NavbarUser from '../navbarUser';
import axios from 'axios';

function getStatusStyle(status) {
  switch (status) {
    case 'Cancelled': return { bg: '#D67A5C', text: '#FFFFFF' };
    case 'Pending': return { bg: '#E9A38E', text: '#FFFFFF' };
    case 'Accepted': return { bg: '#9BC7D8', text: '#FFFFFF' };
    case 'Completed': return { bg: '#1F5E2A', text: '#FFFFFF' };
    default: return { bg: '#D8C3A5', text: '#1F5E2A' };
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
            <Link
              to="/receiver/my-orders"
              className="inline-flex items-center gap-2 mb-6 font-medium hover:underline transition-all"    
              style={{ color: '#1F5E2A' }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to My Orders
            </Link>

            {/* Main Content Card */}
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden p-6 md:p-8" style={{ borderColor: '#D8C3A5' }}>

              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8 pb-8 border-b border-gray-100">
                <div>
                  <h1 className="text-2xl font-bold mb-2" style={{ color: '#1F5E2A' }}>
                    {food.foodName || order.foodName || 'Item not specified'}
                  </h1>
                  <p className="text-gray-500 font-medium">Order ID #{order._id}</p>
                </div>

                <span
                  className="px-4 py-2 text-sm font-bold rounded-full flex items-center justify-center gap-2 shadow-sm w-fit"
                  style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                >
                  {order.status || 'Pending'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Order Information Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold" style={{ color: '#1F5E2A' }}>Order Details</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Package className="w-5 h-5 mt-0.5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Ordered Quantity</p>
                        <p className="font-bold text-lg" style={{ color: '#D67A5C' }}>{order.quantity} packs</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 mt-0.5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Order Date</p>
                        <p className="font-bold" style={{ color: '#1F5E2A' }}>{new Date(order.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Restaurant Information Section */}
                <div className="space-y-6 bg-[#F8F8F6] p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-bold" style={{ color: '#1F5E2A' }}>Provider Info</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Store className="w-5 h-5 mt-0.5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Name</p>
                        <p className="font-bold" style={{ color: '#1F5E2A' }}>{restaurant.name || 'Unknown'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 mt-0.5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="font-bold flex-1" style={{ color: '#D67A5C' }}>{restaurant.address || 'Not provided'}</p>
                      </div>
                    </div>

                    {(restaurant.phone || restaurant.email) && (
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 mt-0.5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Contact</p>
                          {restaurant.phone && <p className="font-bold" style={{ color: '#9BC7D8' }}>{restaurant.phone}</p>}
                          {restaurant.email && <p className="text-sm mt-1 text-gray-600 truncate">{restaurant.email}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
