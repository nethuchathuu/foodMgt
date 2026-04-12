import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building2, User, Clock, AlertTriangle } from 'lucide-react';

const statusColors = {
  "Pending": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Accepted": "bg-[#C8E66A]/30 text-[#1F5E2A] border-[#A7D63B]",
  "Rejected": "bg-red-100 text-red-600 border-red-200",
  "Completed": "bg-blue-100 text-blue-700 border-blue-200",
  "Cancelled": "bg-[#E9A38E]/30 text-[#D67A5C] border-[#E9A38E]"
};

const typeStyles = {
  "Individual": { bg: "bg-[#9BC7D8]", icon: <User size={12} className="text-white" /> },
  "Organization": { bg: "bg-[#E9A38E]", icon: <Building2 size={12} className="text-white" /> }
};

const ListDonation = ({ requests, selectedRequestId, onSelectRequest }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.requester.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.items.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    const matchesType = typeFilter === 'All' || req.requester.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#D8C3A5]/30 p-4 h-full flex flex-col">
      {/* Search & Filters */}
      <div className="mb-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search requests..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A7D63B] focus:border-transparent text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {['All', 'Pending', 'Accepted', 'Completed', 'Cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === status 
                  ? 'bg-[#1F5E2A] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
           <button onClick={() => setTypeFilter('All')} className={`text-xs px-2 py-1 rounded ${typeFilter === 'All' ? 'bg-gray-200 font-bold' : 'text-gray-500'}`}>All Types</button>
           <button onClick={() => setTypeFilter('Organization')} className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${typeFilter === 'Organization' ? 'bg-[#E9A38E]/20 text-[#E9A38E] font-bold' : 'text-gray-500'}`}><Building2 size={12}/> Org</button>
           <button onClick={() => setTypeFilter('Individual')} className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${typeFilter === 'Individual' ? 'bg-[#9BC7D8]/20 text-[#9BC7D8] font-bold' : 'text-gray-500'}`}><User size={12}/> Ind</button>
        </div>
      </div>

      {/* Request List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
        <AnimatePresence>
          {filteredRequests.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center text-gray-500 mt-10 p-4"
            >
              No requests found matching your filters.
            </motion.div>
          ) : (
            filteredRequests.map((req) => {
              const isSelected = req.id === selectedRequestId;
              const typeStyle = typeStyles[req.requester.type];
              const isUrgent = req.urgency === 'High';

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={req.id}
                  onClick={() => onSelectRequest(req.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group
                    ${isSelected 
                      ? 'border-[#A7D63B] shadow-md bg-[#A7D63B]/5 ring-1 ring-[#A7D63B]' 
                      : 'border-gray-100 hover:border-[#A7D63B]/50 hover:shadow-sm hover:-translate-y-0.5 bg-white'
                    }
                  `}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${isSelected ? 'bg-[#A7D63B]' : 'bg-transparent group-hover:bg-[#C8E66A]'}`}></div>

                  <div className="flex justify-between items-start mb-2 pl-2">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800 line-clamp-1">{req.requester.name}</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className={`flex items-center justify-center w-5 h-5 rounded-full ${typeStyle.bg}`}>
                          {typeStyle.icon}
                        </span>
                        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                          {req.requester.type}
                        </span>
                      </div>
                    </div>
                    {isUrgent && (
                      <span className="text-red-500 flex items-center justify-center bg-red-50 p-1 rounded-full" title="High Urgency">
                        <AlertTriangle size={14} />
                      </span>
                    )}
                  </div>

                  <div className="pl-2">
                    <p className="text-sm font-medium text-gray-700">{req.items}</p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Clock size={12}/> {req.time}
                    </p>
                    <div className="flex justify-between items-end mt-3">
                      <div className="text-sm text-gray-500">
                        Qty: <strong className="text-gray-800">{req.quantity}</strong>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${statusColors[req.status]}`}>
                        {req.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ListDonation;
