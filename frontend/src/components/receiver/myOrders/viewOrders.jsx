import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Info, CheckCircle, XCircle } from 'lucide-react';

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

  const executeCancel = () => {
    console.log("Canceled order", activeModal.orderId);
    setOrders(prev => prev.map(o => o.id === activeModal.orderId ? { ...o, status: 'Completed' } : o));
    setActiveModal(null);
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
              key={order.id} 
              className="bg-white border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in-up"
              style={{ borderColor: '#D8C3A5', animationDelay: `${(index + 3) * 100}ms` }}
            >
              {/* Order Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold" style={{ color: '#1F5E2A' }}>
                    {order.foodName}
                  </h3>
                  <span 
                    className="px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 shadow-sm"
                    style={{ 
                      backgroundColor: currentStyle.bg, 
                      color: currentStyle.text 
                    }}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {order.status}
                  </span>
                </div>
                
                <div className="text-sm font-medium" style={{ color: '#D67A5C' }}>
                  Qty: {order.quantity} packs
                </div>
                
                <div className="text-sm flex flex-col md:flex-row md:gap-4 font-medium" style={{ color: '#1F5E2A' }}>
                  <span className="opacity-80">Ordered on: {order.date}</span>
                  <span className="opacity-80 md:border-l md:pl-4 border-gray-300">From: {order.restaurant}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <Link 
                  to={`/receiver/orders/${order.id}`}
                  className="px-4 py-2.5 rounded-xl font-semibold shadow-sm hover:opacity-90 transform hover:scale-105 transition-all flex items-center gap-2"
                  style={{ backgroundColor: '#9BC7D8', color: '#FFFFFF' }}
                >
                  <Info className="w-4 h-4" />
                  View Details
                </Link>

                {order.status === 'Pending' && (
                  <button 
                    onClick={() => handleCancelClick(order.id)}
                    className="px-4 py-2.5 rounded-xl font-semibold shadow-sm hover:opacity-90 hover-shake-warning transition-all flex items-center gap-2"
                    style={{ backgroundColor: '#D8C3A5', color: '#1F5E2A' }}
                  >
                    <XCircle className="w-4 h-4" />
                    Cancel Order
                  </button>
                )}

                {order.status === 'Accepted' && (
                  <button 
                    onClick={() => handleConfirmClick(order.id)}
                    className="px-4 py-2.5 rounded-xl font-semibold shadow-sm hover:opacity-90 hover:animate-pulse transition-all flex items-center gap-2"
                    style={{ backgroundColor: '#E9A38E', color: '#FFFFFF' }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Confirm Received
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
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
