import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, User, Building2, Clock } from 'lucide-react';

const statusColors = {
  "Pending": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Accepted": "bg-[#C8E66A]/30 text-[#1F5E2A] border-[#A7D63B]",
  "Completed": "bg-gray-100 text-gray-600 border-gray-200",
  "Rejected": "bg-[#E9A38E]/30 text-[#D67A5C] border-[#E9A38E]"
};

const typeStyles = {
  "Individual": { bg: "bg-[#9BC7D8]", icon: <User size={12} className="text-white" /> },
  "Organization": { bg: "bg-[#E9A38E]", icon: <Building2 size={12} className="text-white" /> }
};

const ListOrders = ({ orders, selectedOrderId, onSelectOrder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.foodName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#D8C3A5]/30 p-4 h-full flex flex-col">
      {/* Search & Filter Header */}
      <div className="mb-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search orders, customers..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A7D63B] focus:border-transparent text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {['All', 'Pending', 'Accepted', 'Completed'].map(status => (
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
      </div>

      {/* Order List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
        <AnimatePresence>
          {filteredOrders.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center text-gray-500 mt-10 p-4"
            >
              No orders found matching your criteria.
            </motion.div>
          ) : (
            filteredOrders.map((order) => {
              const isSelected = order.id === selectedOrderId;
              const typeStyle = typeStyles[order.customer.type];

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={order.id}
                  onClick={() => onSelectOrder(order.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group
                    ${isSelected 
                      ? 'border-[#A7D63B] shadow-md bg-[#A7D63B]/5 ring-1 ring-[#A7D63B]' 
                      : 'border-gray-100 hover:border-[#A7D63B]/50 hover:shadow-sm hover:-translate-y-0.5 bg-white'
                    }
                  `}
                >
                  {/* Hover indicator accent line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${isSelected ? 'bg-[#A7D63B]' : 'bg-transparent group-hover:bg-[#C8E66A]'}`}></div>

                  <div className="flex justify-between items-start mb-2 pl-2">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800 line-clamp-1">{order.customer.name}</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className={`flex items-center justify-center w-5 h-5 rounded-full ${typeStyle.bg}`}>
                          {typeStyle.icon}
                        </span>
                        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                          {order.customer.type}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12}/>{order.time}</span>
                  </div>

                  <div className="pl-2">
                    <p className="text-sm font-medium text-gray-700 mb-1">{order.foodName}</p>
                    <div className="flex justify-between items-end mt-3">
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <span>Qty: <strong className="text-gray-700">{order.quantity}</strong></span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </div>
                      <span className="font-bold text-[#1F5E2A] bg-[#C8E66A]/20 px-2 py-1 rounded-lg">
                        ${order.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #D8C3A5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #bfa57d;
        }
      `}} />
    </div>
  );
};

export default ListOrders;
