import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Clock, Info, CheckCircle, XCircle, Eye } from 'lucide-react';

const mockOrders = [
  // kept as fallback only
];

const statusStyles = {
  Pending: { bg: '#E9A38E', text: '#FFFFFF', icon: Clock },
  Accepted: { bg: '#9BC7D8', text: '#FFFFFF', icon: CheckCircle },
  Completed: { bg: '#1F5E2A', text: '#FFFFFF', icon: CheckCircle },
  Rejected: { bg: '#D67A5C', text: '#FFFFFF', icon: XCircle },
  Cancelled: { bg: '#D67A5C', text: '#FFFFFF', icon: XCircle },
};

export default function ViewOrders({ orders: initialOrders = mockOrders, loading = false }) {
  const [orders, setOrders] = useState(initialOrders);
  const [activeModal, setActiveModal] = useState(null); // { type: 'cancel' | 'confirm', orderId: number } | null

  useEffect(() => {
    setOrders(initialOrders || []);
  }, [initialOrders]);

  const handleCancelClick = (id) => setActiveModal({ type: 'cancel', orderId: id });
  const handleConfirmClick = (id) => setActiveModal({ type: 'confirm', orderId: id });

  const executeCancel = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/orders/${activeModal.orderId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(prev => prev.map(o => (o.id === activeModal.orderId || o._id === activeModal.orderId) ? { ...o, status: 'Cancelled' } : o));
      setActiveModal(null);
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order');
    }
  };

  const executeConfirm = () => {
    console.log("Confirmed order", activeModal.orderId);
    setOrders(prev => prev.map(o => o.id === activeModal.orderId ? { ...o, status: 'Completed' } : o));
    setActiveModal(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {orders.map((order, index) => {
          const currentStyle = statusStyles[order.status] || { bg: '#D8C3A5', text: '#FFFFFF', icon: Info };
          const StatusIcon = currentStyle.icon;

          return (
            <div 
              key={order._id || order.id} 
              className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              style={{ borderColor: '#D8C3A5' }}
            >
              {/* Info Section */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold" style={{ color: '#1F5E2A' }}>{order.foodName}</h3>
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: currentStyle.bg }}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="font-medium mb-1" style={{ color: '#D67A5C' }}>{order.quantity} packs ordered</p>
                <p className="text-sm truncate max-w-md" style={{ color: '#9BC7D8' }}>From: {order.restaurant || order.restaurantId?.name || 'Unknown'}</p>
                <p className="text-xs font-medium mt-2 opacity-80" style={{ color: '#1F5E2A' }}>Ordered on: {order.date || new Date(order.createdAt).toLocaleDateString()}</p>
              </div>

              {/* Actions Section */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <Link 
                  to={`/receiver/orders/${order._id || order.id}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white transition-transform hover:scale-105 shadow-sm text-sm"
                  style={{ backgroundColor: '#9BC7D8' }}
                >
                  <Eye className="w-4 h-4" /> View Details
                </Link>

                {order.status === 'Pending' && (
                  <button 
                    onClick={() => handleCancelClick(order._id || order.id)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold border transition-colors hover:bg-gray-50 text-sm"
                    style={{ borderColor: '#D8C3A5', color: '#1F5E2A' }}
                  >
                    <XCircle className="w-4 h-4" /> Cancel
                  </button>
                )}

                {order.status === 'Accepted' && (
                  <button 
                    onClick={() => handleConfirmClick(order._id || order.id)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white transition-opacity hover:opacity-90 shadow-sm text-sm"
                    style={{ backgroundColor: '#E9A38E' }}
                  >
                    <CheckCircle className="w-4 h-4" /> Confirm
                  </button>
                )}
              </div>
            </div>
          );
        })}

        { !loading && orders.length === 0 && (
          <div className="py-12 text-center text-gray-500 bg-white rounded-2xl border" style={{ borderColor: '#D8C3A5' }}>
            <h3 className="text-lg font-bold mb-1" style={{ color: '#1F5E2A' }}>No orders found</h3>
            <p>You haven't placed any orders yet.</p>
          </div>
        )}
        { loading && (
          <div className="py-12 text-center text-gray-500 bg-white rounded-2xl border" style={{ borderColor: '#D8C3A5' }}>
            <p>Loading orders...</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {activeModal?.type === 'cancel' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-4">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-md w-full animate-fade-scale text-center border-2" style={{ borderColor: '#D8C3A5' }}>
            <XCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#D67A5C' }} />
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#1F5E2A' }}>Cancel Order?</h2>
            <p className="mb-8 font-medium" style={{ color: '#D67A5C' }}>Are you sure you want to cancel this order? This action cannot be undone.</p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveModal(null)}
                className="flex-1 py-3 rounded-xl font-bold transition-all hover:bg-gray-100"
                style={{ backgroundColor: '#D8C3A5', color: '#1F5E2A' }}
              >
                No, Keep Order
              </button>
              <button 
                onClick={executeCancel}
                className="flex-1 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90 hover-shake-warning"
                style={{ backgroundColor: '#D67A5C' }}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal?.type === 'confirm' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-4">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-md w-full animate-zoom-in text-center border-2" style={{ borderColor: '#D8C3A5' }}>
            <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#9BC7D8' }} />
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#1F5E2A' }}>Confirm Receipt?</h2>
            <p className="mb-8 font-medium" style={{ color: '#9BC7D8' }}>Confirm that you have received this order successfully.</p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveModal(null)}
                className="flex-1 py-3 rounded-xl font-bold transition-all hover:bg-gray-100"
                style={{ backgroundColor: '#D8C3A5', color: '#1F5E2A' }}
              >
                Not Yet
              </button>
              <button 
                onClick={executeConfirm}
                className="flex-1 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90 hover:animate-pulse"
                style={{ backgroundColor: '#E9A38E' }}
              >
                Yes, Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
