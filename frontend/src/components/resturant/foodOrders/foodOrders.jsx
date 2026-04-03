import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import ListOrders from './listOrders';
import DetailsOrders from './detailsOrders';
import ProfileOrders from './profileOrders';

const FoodOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/orders/restaurant', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/orders/${orderId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Failed to update status');
    }
  };

  const openProfile = (customer) => {
    setSelectedProfile(customer);
    setIsProfileModalOpen(true);
  };

  return (
    <div className="bg-[#F8F8F6] min-h-screen p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#1F5E2A] flex items-center gap-3">
            Food Orders <ShoppingBag className="text-[#A7D63B]" size={32} />    
          </h1>
          <p className="text-gray-600 mt-1">Manage customer and organization orders</p>
        </div>
      </motion.div>

      {loading ? (
        <div className="text-center py-10">Loading orders...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
          <div className="lg:col-span-1 h-full">
            <ListOrders
              orders={orders}
              selectedOrderId={selectedOrderId}
              onSelectOrder={setSelectedOrderId}
            />
          </div>

          <div className="lg:col-span-2 h-full">
            <DetailsOrders
              order={selectedOrder}
              onStatusChange={handleStatusChange}
              onViewProfile={() => selectedOrder && openProfile(selectedOrder.customer)}
            />
          </div>
        </div>
      )}

      <ProfileOrders
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        customer={selectedProfile}
      />
    </div>
  );
};

export default FoodOrders;
