import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, Check, X, Filter, Building2, Heart, Users } from 'lucide-react';

const mockOrganizations = [
  { id: 1, name: 'Hope Foundation', type: 'NGO', location: '123 Charity Lane, New York', status: 'Pending' },
  { id: 2, name: 'Food For All', type: 'Charity', location: '45 Care St, Los Angeles', status: 'Approved' },
  { id: 3, name: 'Local Helpers', type: 'Group', location: '78 Community Dr, Chicago', status: 'Rejected' },
  { id: 4, name: 'City Relief', type: 'NGO', location: '90 Hope Ave, Houston', status: 'Pending' },
];

const OrgApprovel = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [organizations, setOrganizations] = useState(mockOrganizations);

  const stats = [
    { label: 'Pending', value: organizations.filter(o => o.status === 'Pending').length, color: '#E9A38E', bg: '#FFF4F0' },
    { label: 'Approved', value: organizations.filter(o => o.status === 'Approved').length, color: '#9BC7D8', bg: '#EAF6FB' },
    { label: 'Rejected', value: organizations.filter(o => o.status === 'Rejected').length, color: '#D67A5C', bg: '#FDECEA' }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return { bg: '#FFF4F0', text: '#E9A38E' };
      case 'Approved': return { bg: '#EAF6FB', text: '#9BC7D8' };
      case 'Rejected': return { bg: '#FDECEA', text: '#D67A5C' };
      default: return { bg: '#F1F5F9', text: '#475569' };
    }
  };

  const getOrgTypeIcon = (type) => {
    switch(type) {
      case 'NGO': return <Building2 size={14} className="mr-1" />;
      case 'Charity': return <Heart size={14} className="mr-1" />;
      case 'Group': return <Users size={14} className="mr-1" />;
      default: return null;
    }
  };

  const navigateToDetails = (id) => {
    navigate(`/admin/organizations/${id}`);
  };

  const handleApprove = (id, e) => {
    e.stopPropagation();
    setOrganizations(orgs => orgs.map(o => o.id === id ? { ...o, status: 'Approved' } : o));
  };
  
  const handleReject = (id, e) => {
    e.stopPropagation();
    setOrganizations(orgs => orgs.map(o => o.id === id ? { ...o, status: 'Rejected' } : o));
  };

  const filteredOrgs = useMemo(() => {
    return organizations.filter(org => {
      const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'All' || org.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [organizations, searchTerm, activeFilter]);

  return (
    <div className="p-6 font-['Poppins'] min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#0F172A' }}>
          Organization Approvals
        </h1>
        <p className="text-lg" style={{ color: '#475569' }}>
          Manage and verify organizations requesting donation access
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-slate-100 transition-transform hover:-translate-y-1 cursor-default"
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
            placeholder="Search organizations..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
            style={{ focusRing: '#9BC7D8' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Filter size={20} className="text-slate-400 mr-2" />
          {['All', 'Pending', 'Approved', 'Rejected'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                activeFilter === filter 
                  ? 'text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              style={activeFilter === filter ? { backgroundColor: '#9BC7D8' } : {}}
            >
              {filter}
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
                <th className="p-4 font-semibold text-slate-600">Organization Name</th>
                <th className="p-4 font-semibold text-slate-600">Type</th>
                <th className="p-4 font-semibold text-slate-600 hidden md:table-cell">Location</th>
                <th className="p-4 font-semibold text-slate-600">Status</th>
                <th className="p-4 font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrgs.map((org) => {
                const statusStyle = getStatusStyle(org.status);
                
                return (
                  <tr 
                    key={org.id} 
                    className={`border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${org.status === 'Pending' ? 'bg-[#FFF4F0]/30' : ''}`}
                    onClick={() => navigateToDetails(org.id)}
                  >
                    <td className="p-4">
                      <div className="font-medium text-slate-900">{org.name}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-slate-600 bg-slate-100 px-3 py-1 rounded-full text-xs font-medium w-max">
                        {getOrgTypeIcon(org.type)}
                        {org.type}
                      </div>
                    </td>
                    <td className="p-4 text-slate-500 text-sm hidden md:table-cell truncate max-w-xs">{org.location}</td>
                    <td className="p-4">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium inline-block shadow-sm"
                        style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                      >
                        {org.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => navigateToDetails(org.id)}
                          className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        {org.status === 'Pending' && (
                          <>
                            <button 
                              onClick={(e) => handleApprove(org.id, e)}
                              className="p-2 rounded-lg transition-colors"
                              style={{ color: '#9BC7D8' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EAF6FB'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                              title="Approve"
                            >
                              <Check size={18} />
                            </button>
                            <button 
                              onClick={(e) => handleReject(org.id, e)}
                              className="p-2 rounded-lg transition-colors"
                              style={{ color: '#D67A5C' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FDECEA'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
              
              {filteredOrgs.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">
                    No organizations found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */ }
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <span>Showing 1 to {filteredOrgs.length} of {organizations.length} entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 text-white rounded" style={{ backgroundColor: '#9BC7D8' }}>1</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgApprovel;