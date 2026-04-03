import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, HandHeart, CheckCircle } from 'lucide-react';

export default function ReceiverDashboardContent() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [approvedRequests, setApprovedRequests] = useState(0);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        // Fetch Orders
        const ordersRes = await axios.get('http://localhost:5000/api/food-orders/my-orders', config);
        setTotalOrders(ordersRes.data.length);

        // Fetch Requests
        const requestsRes = await axios.get('http://localhost:5000/api/food-requests/my-requests', config);
        setTotalRequests(requestsRes.data.length);
        
        // Filter Approved Requests
        const approvedCount = requestsRes.data.filter(req => req.status === 'Approved').length;
        setApprovedRequests(approvedCount);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchDashboardStats();
  }, []);

  const summaryCards = [
    {
      id: 'totalOrders',
      label: 'Total Orders',
      value: totalOrders,
      icon: ShoppingBag,
      accentColor: '#9BC7D8'
    },
    {
      id: 'totalRequests',
      label: 'Requests Made',
      value: totalRequests,
      icon: HandHeart,
      accentColor: '#E9A38E'
    },
    {
      id: 'approvedRequests',
      label: 'Approved Requests',
      value: approvedRequests,
      icon: CheckCircle,
      accentColor: '#D67A5C'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'order',
      title: 'Ordered Rice Pack',
      status: 'Pending',
      date: '2026-03-24',
      icon: ShoppingBag,
      statusColor: '#E9A38E'
    },
    {
      id: 2,
      type: 'request',
      title: 'Requested Bakery Items',
      status: 'Approved',
      date: '2026-03-23',
      icon: HandHeart,
      statusColor: '#9BC7D8'
    },
    {
      id: 3,
      type: 'order',
      title: 'Ordered Juice Pack',
      status: 'Completed',
      date: '2026-03-22',
      icon: ShoppingBag,
      statusColor: '#D67A5C'
    }
  ];

  return (
    <div className="flex flex-col gap-6 font-sans">
      
      {/* Overview Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#1F5E2A' }}>Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.id} 
                className="bg-white p-6 rounded-2xl shadow-sm border transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer flex items-center justify-between"
                style={{ borderColor: '#D8C3A5' }}
              >
                <div>
                  <p className="text-gray-500 font-medium mb-1">{card.label}</p>
                  <h3 className="text-4xl font-bold" style={{ color: '#1F5E2A' }}>{card.value}</h3>
                </div>
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center opacity-90"
                  style={{ backgroundColor: card.accentColor }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid Layout for Limit and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Donation Limits */}
        <div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1F5E2A' }}>Donation Limits</h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border h-48 flex flex-col justify-center" style={{ borderColor: '#D8C3A5' }}>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1F5E2A' }}>Individual Requests</h3>
            <p className="font-medium mb-6" style={{ color: '#D67A5C' }}>You have used 2 out of 3 requests this month.</p>
            
            <div className="flex gap-2">
              <div className="w-12 h-4 rounded-full" style={{ backgroundColor: '#E9A38E' }}></div>
              <div className="w-12 h-4 rounded-full" style={{ backgroundColor: '#E9A38E' }}></div>
              <div className="w-12 h-4 rounded-full" style={{ backgroundColor: '#D8C3A5', opacity: 0.4 }}></div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1F5E2A' }}>Recent Activities</h2>
          <div className="bg-white rounded-2xl p-4 shadow-sm border" style={{ borderColor: '#D8C3A5' }}>
            <div className="flex flex-col">
              {recentActivities.map((activity, index) => {
                const ActivityIcon = activity.icon;
                return (
                  <div 
                    key={activity.id}
                    className={"flex justify-between items-center p-3 transition-colors hover:bg-[#F8F8F6] rounded-xl " + (index !== recentActivities.length - 1 ? "border-b border-gray-100" : "")}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center opacity-80"
                        style={{ backgroundColor: activity.statusColor }}
                      >
                        <ActivityIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold" style={{ color: '#1F5E2A' }}>{activity.title}</p>
                        <p className="text-sm font-medium" style={{ color: '#D8C3A5' }}>{activity.date}</p>
                      </div>
                    </div>
                    <span 
                      className="px-3 py-1 text-sm font-bold rounded-full bg-opacity-10"
                      style={{ color: activity.statusColor, backgroundColor: activity.statusColor + '20' }}
                    >
                      {activity.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
