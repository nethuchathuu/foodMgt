import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Search, Eye, AlertCircle, CheckCircle2, XCircle, HeartHandshake, Zap, RefreshCw } from 'lucide-react';

const DonationMonitoring = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      setIsRefreshing(true);
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/donations', { headers: { Authorization: '\u0042earer ' + token } });
      setDonations(res.data);
      setLastRefreshed(new Date().toLocaleTimeString());
    } catch(err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date().toLocaleTimeString());

  // Simulate auto-refresh
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRefreshing(true);
      setTimeout(() => {
        setLastRefreshed(new Date().toLocaleTimeString());
        setIsRefreshing(false);
      }, 800);
    }, 60000); // refresh every minute

    return () => clearInterval(interval);
  }, []);

  const manualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastRefreshed(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 800);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return { bg: '#FFF4F0', text: '#E9A38E' };
      case 'Approved': return { bg: '#EAF6FB', text: '#9BC7D8' };
      case 'Rejected': return { bg: '#FDECEA', text: '#D67A5C' };
      default: return { bg: '#F1F5F9', text: '#475569' };
    }
  };

  // Filter out any requests that aren't from "Today" based on functional behavior spec
  const todayDonations = donations.filter(req => {
    const rawDate = req.dateRaw || req.createdAt;
    return new Date(rawDate).toDateString() === new Date().toDateString();
  });

  const stats = [
    { label: "Total Requests", value: donations.length, color: "#9BC7D8", bg: "#EAF6FB", icon: <HeartHandshake size={24}/> },
    { label: "Approved", value: donations.filter(d => d.status === 'Approved').length, color: "#6FAFC4", bg: "#EBF4F7", icon: <CheckCircle2 size={24}/> },
    { label: "Pending", value: donations.filter(d => d.status === 'Pending').length, color: "#E9A38E", bg: "#FFF4F0", icon: <AlertCircle size={24}/> },
    { label: "Rejected", value: donations.filter(d => d.status === 'Rejected').length, color: "#D67A5C", bg: "#FDECEA", icon: <XCircle size={24}/> }
  ];

  const filteredDonations = useMemo(() => {
    let result = donations.filter(item => {
      const matchSearch = 
        (item.organization || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.requestedFood || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.id || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchFilter = activeFilter === 'All' || item.status === activeFilter;
      return matchSearch && matchFilter;
    });

    if (sortBy === 'Newest') {
      // In a real app we'd sort by full timestamp, here we mock it by keeping default order / simple time reverse
      result.reverse();
    } else if (sortBy === 'Organization') {
      result.sort((a, b) => (a.organization || '').localeCompare(b.organization || ''));
    } else if (sortBy === 'Status') {
      result.sort((a, b) => (a.status || '').localeCompare(b.status || ''));
    }
    return result;
  }, [searchTerm, activeFilter, sortBy, donations]);

  return (
    <div className="p-6 font-['Poppins'] min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-slate-900">Donation Monitoring</h1>
          <p className="text-lg text-slate-500">Track and manage daily donation requests from organizations</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-slate-400">Last updated: {lastRefreshed}</p>
          <button 
            onClick={manualRefresh}
            className={`flex items-center gap-2 p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl shadow-sm hover:bg-slate-50 transition-all ${isRefreshing ? 'animate-pulse bg-slate-50' : ''}`}
            title="Refresh Data"
          >
            <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
          </button>
        </div>
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
            placeholder="Search by organization or food item..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm"
            style={{ focusRing: '#9BC7D8' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap flex-1 items-center gap-3 w-full xl:w-auto xl:justify-end">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 xl:pb-0 hide-scrollbar">
            {['All', 'Pending', 'Approved', 'Rejected'].map(filter => (
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
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Sort By:</span>
            <select 
              className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer outline-none pl-1 pr-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Newest">Newest</option>
              <option value="Status">Status</option>
              <option value="Organization">Organization</option>
            </select>
          </div>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-b-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead style={{ backgroundColor: '#F1F7FA' }}>
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 whitespace-nowrap">Organization</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 whitespace-nowrap">Requested Food</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 whitespace-nowrap">Quantity</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDonations.length > 0 ? (
                filteredDonations.map((item) => {
                  const statusSty = getStatusStyle(item.status);
                  const isHighQuantity = item.quantity >= 100;

                  return (
                    <tr 
                      key={item.id} 
                      className="group cursor-pointer transition-colors relative"
                      style={{ hover: { backgroundColor: '#F9FCFD' } }}
                      onClick={() => navigate(`/admin/donations/${item.id.replace('#','')}`)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800">{item.organization}</span>
                          {item.isUrgent && (
                            <span title="Urgent Request" className="text-yellow-500 bg-yellow-50 p-1 rounded-full">
                              <Zap size={14} className="fill-current" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          {item.id} &bull; {new Date(item.dateRaw || item.createdAt).toLocaleDateString()} {item.time}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-700 font-medium">{item.requestedFood}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold ${isHighQuantity ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'text-slate-700 bg-slate-50 border border-slate-100'}`}>
                          {item.quantity} units
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span 
                          className="px-3 py-1.5 rounded-full text-xs font-bold shadow-sm"
                          style={{ backgroundColor: statusSty.bg, color: statusSty.text }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          className="p-2 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                          title="View Details"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/donations/${item.id.replace('#','')}`);
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
                  <td colSpan="5" className="px-6 py-16 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <HeartHandshake size={48} className="text-slate-200 mb-4" />
                      <p className="text-lg font-medium text-slate-600">No donation requests found</p>
                      <p className="text-sm mt-1">Try adjusting your search or filters</p>
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

export default DonationMonitoring;
