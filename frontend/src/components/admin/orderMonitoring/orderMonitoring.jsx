import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Download, Eye, AlertCircle, Clock, CheckCircle2, XCircle } from 'lucide-react';

const mockOrders = [
  { id: 'ORD-1023', customer: 'Alex Johnson', restaurant: 'Healthy Bites', foodItem: 'Grilled Chicken Salad', status: 'Pending', date: '2026-03-28T09:30:00', price: 12.50, isDelayed: true },
  { id: 'ORD-1024', customer: 'Maria Garcia', restaurant: 'Pizza Plaza', foodItem: 'Large Pepperoni Pizza', status: 'Completed', date: '2026-03-27T19:45:00', price: 18.00, isDelayed: false },
  { id: 'ORD-1025', customer: 'James Smith', restaurant: 'Zen Sushi', foodItem: 'Vegan Sushi Roll', status: 'Cancelled', date: '2026-03-27T18:20:00', price: 15.00, isDelayed: false },
  { id: 'ORD-1026', customer: 'Linda Chen', restaurant: 'Mexican Fiesta', foodItem: 'Spicy Beef Tacos', status: 'Pending', date: '2026-03-28T10:15:00', price: 10.00, isDelayed: false },
  { id: 'ORD-1027', customer: 'Robert Taylor', restaurant: 'Burger Joint', foodItem: 'Classic Cheeseburger', status: 'Completed', date: '2026-03-27T14:30:00', price: 9.50, isDelayed: false },
  { id: 'ORD-1028', customer: 'Emma Davis', restaurant: 'Healthy Bites', foodItem: 'Quinoa Bowl', status: 'Pending', date: '2026-03-28T10:45:00', price: 14.00, isDelayed: false },
  { id: 'ORD-1029', customer: 'William Brown', restaurant: 'Sweet Treats', foodItem: 'Chocolate Cake', status: 'Cancelled', date: '2026-03-26T16:00:00', price: 8.50, isDelayed: false }
];

const OrderMonitoring = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  // Hardcoded Stats as per spec (or calculated. Let's use spec numbers for display, but dynamic arrays for table)
  const stats = [
    { label: "Total Orders", value: "320", color: "#9BC7D8", bg: "#EAF6FB", icon: <Clock size={24}/> },
    { label: "Pending", value: "40", color: "#E9A38E", bg: "#FFF4F0", icon: <AlertCircle size={24}/> },
    { label: "Completed", value: "240", color: "#6FAFC4", bg: "#EBF4F7", icon: <CheckCircle2 size={24}/> },
    { label: "Cancelled", value: "40", color: "#D67A5C", bg: "#FDECEA", icon: <XCircle size={24}/> }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return { bg: '#FFF4F0', text: '#E9A38E' };
      case 'Completed': return { bg: '#EAF6FB', text: '#9BC7D8' };
      case 'Cancelled': return { bg: '#FDECEA', text: '#D67A5C' };
      default: return { bg: '#F1F5F9', text: '#475569' };
    }
  };

  const filteredOrders = useMemo(() => {
    let result = mockOrders.filter(order => {
      const matchSearch = 
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.foodItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchFilter = activeFilter === 'All' || order.status === activeFilter;
      return matchSearch && matchFilter;
    });

    if (sortBy === 'Newest') {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'Customer Name') {
      result.sort((a, b) => a.customer.localeCompare(b.customer));
    } else if (sortBy === 'Status') {
      result.sort((a, b) => a.status.localeCompare(b.status));
    }
    return result;
  }, [searchTerm, activeFilter, sortBy]);

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="p-6 font-['Poppins'] min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-slate-900">Orders Monitoring</h1>
          <p className="text-lg text-slate-500">Track and manage all orders across the system</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 transition-colors font-medium">
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center justify-between transition-transform hover:-translate-y-1">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: stat.bg, color: stat.color }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Filters Section */}
      <div className="bg-white p-5 rounded-t-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] border border-slate-100 border-b-0 flex flex-col xl:flex-row justify-between items-center gap-4">
        
        {/* Search */}
        <div className="relative w-full xl:w-[350px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by customer, restaurant, or food..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm"
            style={{ focusRing: '#9BC7D8' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap flex-1 items-center gap-3 w-full xl:w-auto xl:justify-end">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 xl:pb-0 hide-scrollbar">
            {['All', 'Pending', 'Completed', 'Cancelled'].map(filter => (
              <button 
                key={filter} 
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                  activeFilter === filter 
                    ? 'text-white shadow-md' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
                }`}
                style={activeFilter === filter ? { backgroundColor: '#9BC7D8' } : {}}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="ml-auto xl:ml-2 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Sort:</span>
            <select 
              className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer outline-none pl-1 pr-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Newest">Newest</option>
              <option value="Status">Status</option>
              <option value="Customer Name">Customer Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-b-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead style={{ backgroundColor: '#F1F7FA' }}>
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 whitespace-nowrap">Order ID & Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 whitespace-nowrap">Customer</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 whitespace-nowrap">Restaurant</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 whitespace-nowrap">Food Item</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const statusSty = getStatusStyle(order.status);
                  return (
                    <tr 
                      key={order.id} 
                      className="group cursor-pointer transition-colors"
                      style={{ hover: { backgroundColor: '#F9FCFD' } }}
                      onClick={() => navigate(`/admin/orders/${order.id.replace('#','')}`)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800">{order.id}</span>
                          {order.isDelayed && (
                            <span title="Order Delayed" className="text-red-500 animate-pulse">
                              <AlertCircle size={16} />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{formatDate(order.date)}</p>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">{order.customer}</td>
                      <td className="px-6 py-4 text-slate-600">{order.restaurant}</td>
                      <td className="px-6 py-4">
                        <span className="text-slate-800">{order.foodItem}</span>
                        <p className="text-xs font-semibold mt-1" style={{ color: '#9BC7D8' }}>${order.price.toFixed(2)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span 
                          className="px-3 py-1.5 rounded-full text-xs font-bold shadow-sm"
                          style={{ backgroundColor: statusSty.bg, color: statusSty.text }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          className="p-2 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                          title="View Details"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/orders/${order.id.replace('#','')}`);
                          }}
                        >
                          <Eye size={20} />
                        </button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search size={32} className="text-slate-300 mb-3" />
                      <p className="text-lg font-medium text-slate-600">No orders found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default OrderMonitoring;