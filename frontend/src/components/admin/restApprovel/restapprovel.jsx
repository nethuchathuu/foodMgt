import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, Check, X, Filter } from 'lucide-react';
import axios from 'axios';

const RestApprovel = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [restaurants, setRestaurants] = useState([]);
  
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/admin/restaurants', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants", error);
    }
  };

  const handleApprove = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/admin/approve-rest/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRestaurants();
    } catch (error) {
      console.error("Error approving restaurant", error);
    }
  };

  const handleReject = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/admin/reject-rest/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRestaurants();
    } catch (error) {
      console.error("Error rejecting restaurant", error);
    }
  };

  const stats = [
    { label: 'Pending', value: restaurants.filter(r => r.status === 'Pending').length, color: '#F43F5E', bg: '#FFE4E6' },
    { label: 'Approved', value: restaurants.filter(r => r.status === 'Approved').length, color: '#60A5FA', bg: '#EFF6FF' },
    { label: 'Rejected', value: restaurants.filter(r => r.status === 'Rejected').length, color: '#D67A5C', bg: '#FDECEA' }
  ];

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Pending': return { bg: '#FFE4E6', text: '#F43F5E' };
      case 'Approved': return { bg: '#EFF6FF', text: '#60A5FA' };
      case 'Rejected': return { bg: '#FDECEA', text: '#D67A5C' };
      default: return { bg: '#F1F5F9', text: '#475569' };
    }
  };

  const navigateToDetails = (id) => {
    navigate(`/admin/restaurants/${id}`);
  };

  const filteredRestaurants = restaurants.filter(rest => {
    const matchesSearch = rest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (rest.regId && rest.regId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'All' || rest.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 font-['Poppins'] min-h-screen" style={{ backgroundColor: '#F0F9FF' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#0F172A' }}>
          Restaurant Approvals
        </h1>
        <p className="text-lg" style={{ color: '#475569' }}>
          Review and manage newly registered restaurants
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-slate-100 transition-transform hover:-translate-y-1"
          >
            <span className="text-lg font-medium text-slate-600">{stat.label}</span>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
              style={{ backgroundColor: stat.bg, color: stat.color }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by restaurant name or ID..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Filter size={20} className="text-slate-400 mr-2" />
          {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${filterStatus === status ? 'bg-blue-500 text-white shadow-md shadow-blue-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 font-semibold text-slate-600">Restaurant Name</th>
                <th className="p-4 font-semibold text-slate-600">Registration ID</th>
                <th className="p-4 font-semibold text-slate-600 hidden md:table-cell">Location</th>
                <th className="p-4 font-semibold text-slate-600">Status</th>
                <th className="p-4 font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRestaurants.map((rest) => {
                const statusStyle = getStatusStyle(rest.status);
                
                return (
                  <tr 
                    key={rest.id} 
                    className={`border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${rest.status === 'Pending' ? 'bg-blue-50/30' : ''}`}
                    onClick={() => navigateToDetails(rest.id)}
                  >
                    <td className="p-4">
                      <div className="font-medium text-slate-900">{rest.name}</div>
                    </td>
                    <td className="p-4 text-slate-500 text-sm font-mono">{rest.regId}</td>
                    <td className="p-4 text-slate-500 text-sm hidden md:table-cell truncate max-w-xs">{rest.location}</td>
                    <td className="p-4">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium inline-block"
                        style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                      >
                        {rest.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => navigateToDetails(rest.id)}
                          className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        {rest.status === 'Pending' && (
                          <>
                            <button 
                              onClick={(e) => handleApprove(rest.id, e)}
                              className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <Check size={18} />
                            </button>
                            <button 
                              onClick={(e) => handleReject(rest.id, e)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <X size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              
              {filteredRestaurants.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">
                    No restaurants found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <span>Showing 1 to {filteredRestaurants.length} of {restaurants.length} entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestApprovel;
