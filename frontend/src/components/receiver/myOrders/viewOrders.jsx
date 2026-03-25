import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Info, CheckCircle, XCircle } from 'lucide-react';

const mockOrders = [
  {
    id: 1,
    foodName: 'Vegetable Rice Pack',
    restaurant: 'Green Cafe',
    quantity: 2,
    status: 'Pending',
    date: '2023-11-20',
  },
  {
    id: 2,
    foodName: 'Assorted Bakery Items',
    restaurant: 'Fresh Bakes',
    quantity: 1,
    status: 'Accepted',
    date: '2023-11-21',
  },
  {
    id: 3,
    foodName: 'Fruit Juices',
    restaurant: 'Juice Bar',
    quantity: 3,
    status: 'Completed',
    date: '2023-11-19',
  },
];

const statusStyles = {
  Pending: { bg: '#E9A38E', text: '#FFFFFF', icon: Clock },
  Accepted: { bg: '#9BC7D8', text: '#FFFFFF', icon: CheckCircle },
  Completed: { bg: '#D67A5C', text: '#FFFFFF', icon: CheckCircle },
};

export default function ViewOrders() {
  const [orders, setOrders] = useState(mockOrders);

  const handleCancel = (id) => {
    // Implement cancel logic
    console.log("Canceled order", id);
  };

  const handleConfirm = (id) => {
    // Implement confirm logic
    console.log("Confirmed order", id);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {orders.map((order) => {
        const StatusIcon = statusStyles[order.status].icon;

        return (
          <div 
            key={order.id} 
            className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
            style={{ borderColor: '#D8C3A5' }}
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
                    backgroundColor: statusStyles[order.status].bg, 
                    color: statusStyles[order.status].text 
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
                className="px-4 py-2.5 rounded-xl font-semibold shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2"
                style={{ backgroundColor: '#9BC7D8', color: '#FFFFFF' }}
              >
                <Info className="w-4 h-4" />
                View Details
              </Link>

              {order.status === 'Pending' && (
                <button 
                  onClick={() => handleCancel(order.id)}
                  className="px-4 py-2.5 rounded-xl font-semibold shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2"
                  style={{ backgroundColor: '#D8C3A5', color: '#1F5E2A' }}
                >
                  <XCircle className="w-4 h-4" />
                  Cancel Order
                </button>
              )}

              {order.status === 'Accepted' && (
                <button 
                  onClick={() => handleConfirm(order.id)}
                  className="px-4 py-2.5 rounded-xl font-semibold shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2"
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

      {orders.length === 0 && (
        <div className="py-12 text-center text-gray-500 bg-white rounded-2xl border" style={{ borderColor: '#D8C3A5' }}>
          <h3 className="text-lg font-bold mb-1" style={{ color: '#1F5E2A' }}>No orders found</h3>
          <p>You haven't placed any orders yet.</p>
        </div>
      )}
    </div>
  );
}
