import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Ban, CheckCircle, Eye, User as UserIcon, Store, Building2, ChevronDown } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', avatar: '' },
  { id: 2, name: 'Spicy Delight', email: 'contact@spicy.com', role: 'Restaurant', status: 'Blocked', avatar: '' },
  { id: 3, name: 'Hope Foundation', email: 'fund@hope.org', role: 'Organization', status: 'Active', avatar: '' },
  { id: 4, name: 'Sarah Smith', email: 'sarah.smith@example.com', role: 'User', status: 'Active', avatar: '' },
  { id: 5, name: 'Ocean Catch', email: 'hello@oceancatch.com', role: 'Restaurant', status: 'Active', avatar: '' },
];

const UserManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [users, setUsers] = useState(mockUsers);

  const stats = [
    { label: 'Total Users', value: users.length, color: '#9BC7D8', bg: '#F1F7FA' },
    { label: 'Active Users', value: users.filter(u => u.status === 'Active').length, color: '#6FAFC4', bg: '#EAF6FB' },
    { label: 'Blocked Users', value: users.filter(u => u.status === 'Blocked').length, color: '#D67A5C', bg: '#FDECEA' }
  ];

  const getRoleStyle = (role) => {
    switch(role) {
      case 'User': return { bg: '#EAF6FB', text: '#9BC7D8', icon: <UserIcon size={14} className="mr-1" /> };
      case 'Restaurant': return { bg: '#EAF6FB', text: '#7FB3C9', icon: <Store size={14} className="mr-1" /> };
      case 'Organization': return { bg: '#EAF6FB', text: '#5C9DB5', icon: <Building2 size={14} className="mr-1" /> };
      default: return { bg: '#F1F5F9', text: '#475569', icon: null };
    }
  };

  const getStatusStyle = (status) => {
    return status === 'Active' 
      ? { bg: '#EAF6FB', text: '#9BC7D8' } 
      : { bg: '#FDECEA', text: '#D67A5C' };
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const toggleUserStatus = (id, e) => {
    e.stopPropagation();
    setUsers(users.map(u => {
      if (u.id === id) {
        // Confirmation before blocking
        if (u.status === 'Active' && !window.confirm(`Are you sure you want to block ${u.name}?`)) {
          return u;
        }
        return { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' };
      }
      return u;
    }));
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'All' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  return (
    <div className="p-6 font-['Poppins'] min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3" style={{ color: '#0F172A' }}>
          User Management
        </h1>
        <p className="text-lg" style={{ color: '#475569' }}>
          Monitor and control all system users
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
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold border"
              style={{ backgroundColor: stat.bg, color: stat.color, borderColor: `${stat.color}30` }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col xl:flex-row justify-between items-center gap-4">
        
        {/* Search */}
        <div className="relative w-full xl:w-[400px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, email, or role..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm"
            style={{ focusRing: '#9BC7D8' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Role:</span>
            <select 
              className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer appearance-none pr-4"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              {['All', 'User', 'Restaurant', 'Organization'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Status:</span>
            <select 
              className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer appearance-none pr-4"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {['All', 'Active', 'Blocked'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100" style={{ backgroundColor: '#F1F7FA' }}>
                <th className="p-4 font-semibold text-slate-600 rounded-tl-xl">User</th>
                <th className="p-4 font-semibold text-slate-600 hidden md:table-cell">Email</th>
                <th className="p-4 font-semibold text-slate-600">Role</th>
                <th className="p-4 font-semibold text-slate-600">Status</th>
                <th className="p-4 font-semibold text-slate-600 text-right rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const isBlocked = user.status === 'Blocked';
                const roleStyle = getRoleStyle(user.role);
                const statusStyle = getStatusStyle(user.status);

                return (
                  <tr 
                    key={user.id} 
                    className={`border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${isBlocked ? 'bg-red-50/20' : ''}`}
                    style={isBlocked ? { backgroundColor: '#FDECEA30' } : {}}
                    onClick={() => navigate(`/admin/users/${user.id}`)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm"
                             style={{ backgroundColor: roleStyle.text }}>
                          {getInitials(user.name)}
                        </div>
                        <div className="font-medium text-slate-900">{user.name}</div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-500 text-sm hidden md:table-cell">{user.email}</td>
                    <td className="p-4">
                       <span className="flex items-center w-max px-3 py-1 rounded-full text-xs font-medium"
                             style={{ backgroundColor: roleStyle.bg, color: roleStyle.text }}>
                         {roleStyle.icon}
                         {user.role}
                       </span>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium border"
                            style={{ backgroundColor: statusStyle.bg, color: statusStyle.text, borderColor: `${statusStyle.text}40` }}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => navigate(`/admin/users/${user.id}`)}
                          className="p-2 text-slate-400 hover:text-[#9BC7D8] hover:bg-[#EAF6FB] rounded-lg transition-colors"
                          title="View Profile"
                        >
                          <Eye size={18} />
                        </button>
                        
                        <button 
                          onClick={(e) => toggleUserStatus(user.id, e)}
                          className="p-2 rounded-lg transition-colors border"
                          style={{ 
                            color: isBlocked ? '#9BC7D8' : '#D67A5C',
                            borderColor: isBlocked ? '#EAF6FB' : '#FDECEA',
                            backgroundColor: isBlocked ? '#EAF6FB50' : '#FDECEA50'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = isBlocked ? '#EAF6FB' : '#FDECEA';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = isBlocked ? '#EAF6FB50' : '#FDECEA50';
                          }}
                          title={isBlocked ? "Activate User" : "Block User"}
                        >
                          {isBlocked ? <CheckCircle size={18} /> : <Ban size={18} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                       <Search className="text-slate-300" size={32} />
                       <p>No users found matching your search or filters.</p>
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

export default UserManagement;