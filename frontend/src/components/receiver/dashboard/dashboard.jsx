import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, HandHeart, CheckCircle, PackageCheck } from 'lucide-react';

export default function ReceiverDashboardContent() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [acceptedOrders, setAcceptedOrders] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [approvedRequests, setApprovedRequests] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [requestsMadeThisMonth, setRequestsMadeThisMonth] = useState(0);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isIndividual = user.role === 'requester_person';

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // Fetch Orders (all statuses)
        const ordersRes = await axios.get('http://localhost:5000/api/orders/my-orders', config);
        const orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];
        setTotalOrders(orders.length);
        
        const acceptedOrdersCount = orders.filter(o => o.status === 'Accepted').length;
        setAcceptedOrders(acceptedOrdersCount);

        // Fetch Requests
        const requestsRes = await axios.get('http://localhost:5000/api/food-requests/receiver', config);
        const requests = Array.isArray(requestsRes.data) ? requestsRes.data : [];
        setTotalRequests(requests.length);

        // Filter Approved Requests
        const approvedCount = requests.filter(req => req.status === 'Approved').length;
        setApprovedRequests(approvedCount);

        // Compute requests made this month for limits
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const thisMonthReqs = requests.filter(req => {
            const date = new Date(req.createdAt || req.date);
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        }).length;
        setRequestsMadeThisMonth(thisMonthReqs);

        // Combine logic for recent activities (top 5)
        const combinedActivities = [
          ...orders.map(o => ({
            id: `order-${o._id || o.id}`,
            _rawId: o._id || o.id,
            type: 'order',
            title: `Ordered ${o.foodName || 'Food'}`,
            status: o.status || 'Pending',
            date: o.createdAt || new Date().toISOString(),
            icon: ShoppingBag,
            statusColor: o.status === 'Completed' ? '#D67A5C' : o.status === 'Accepted' ? '#A7D63B' : '#E9A38E'
          })),
          ...requests.map(r => ({
            id: `request-${r._id || r.id}`,
            _rawId: r._id || r.id,
            type: 'request',
            title: `Requested ${r.foodType || r.foodName || 'Food'}`,
            status: r.status || 'Pending',
            date: r.date || r.createdAt || new Date().toISOString(),
            icon: HandHeart,
            statusColor: r.status === 'Approved' ? '#A7D63B' : r.status === 'Rejected' ? '#D67A5C' : '#E9A38E'
          }))
        ];

        // Sort by date descending and take top 5
        combinedActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        const top5 = combinedActivities.slice(0, 5).map(act => ({
          ...act,
          date: new Date(act.date).toLocaleDateString()
        }));

        setRecentActivities(top5);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchDashboardStats();
  }, []);

  const summaryCards = [
    {
      id: 'acceptedOrders',
      label: 'Accepted Orders',
      value: acceptedOrders,
      icon: PackageCheck,
      accentColor: '#A7D63B'
    },
    {
      id: 'approvedRequests',
      label: 'Approved Requests',
      value: approvedRequests,
      icon: CheckCircle,
      accentColor: '#9BC7D8'
    },
    {
      id: 'totalOrders',
      label: 'Total Orders',
      value: totalOrders,
      icon: ShoppingBag,
      accentColor: '#D8C3A5'
    },
    {
      id: 'totalRequests',
      label: 'Total Requests',
      value: totalRequests,
      icon: HandHeart,
      accentColor: '#E9A38E'
    }
  ];

  return (
    <div className="flex flex-col gap-6 font-sans">
      
      {/* Overview Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#1F5E2A' }}>Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Recent Activities */}
      <div>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#1F5E2A' }}>Recent Activities</h2>
        <div className="bg-white rounded-2xl p-4 shadow-sm border" style={{ borderColor: '#D8C3A5' }}>
          <div className="flex flex-col">
            {recentActivities.length > 0 ? recentActivities.map((activity, index) => {
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
            }) : (
              <div className="p-4 text-center text-gray-500 font-medium">
                No recent activities found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Donation Limits - Only shown for Individuals */}
      {isIndividual && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1F5E2A' }}>Donation Limits</h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border flex flex-col justify-center" style={{ borderColor: '#D8C3A5' }}>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1F5E2A' }}>Individual Requests</h3>
            <p className="font-medium mb-6" style={{ color: '#D67A5C' }}>You have used {Math.min(requestsMadeThisMonth, 3)} out of 3 requests this month.</p>
            
            <div className="flex gap-2">
              <div className="w-12 h-4 rounded-full" style={{ backgroundColor: requestsMadeThisMonth >= 1 ? '#E9A38E' : '#D8C3A5', opacity: requestsMadeThisMonth >= 1 ? 1 : 0.4 }}></div>
              <div className="w-12 h-4 rounded-full" style={{ backgroundColor: requestsMadeThisMonth >= 2 ? '#E9A38E' : '#D8C3A5', opacity: requestsMadeThisMonth >= 2 ? 1 : 0.4 }}></div>
              <div className="w-12 h-4 rounded-full" style={{ backgroundColor: requestsMadeThisMonth >= 3 ? '#E9A38E' : '#D8C3A5', opacity: requestsMadeThisMonth >= 3 ? 1 : 0.4 }}></div>
            </div>
            {requestsMadeThisMonth >= 3 && (
              <p className="mt-4 text-red-500 font-bold">You have reached the limit for this month.</p>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

