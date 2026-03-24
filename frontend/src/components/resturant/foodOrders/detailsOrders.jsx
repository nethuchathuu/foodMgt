import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, User, Building2, Phone, Mail, MapPin, CheckCircle, XCircle, ChevronRight, Hash } from 'lucide-react';

const DetailsOrders = ({ order, onStatusChange, onViewProfile }) => {
  if (!order) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-[#D8C3A5]/30 h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="text-gray-300" size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-700 mb-2">No Order Selected</h2>
        <p className="text-gray-500 max-w-md">
          Select an order from the list on the left to view its complete details, customer information, and manage its status.
        </p>
      </div>
    );
  }

  const isOrganization = order.customer.type === "Organization";

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      key={order.id}
      className="bg-white rounded-2xl shadow-sm border border-[#D8C3A5]/30 h-full flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-white to-[#F8F8F6]">
        <div>
          <span className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-1">
            <Hash size={14} className="text-[#A7D63B]" /> {order.id}
          </span>
          <h2 className="text-2xl font-bold text-[#1F5E2A]">{order.foodName}</h2>
        </div>
        <div className="text-right">
          <span className="block text-sm text-gray-500 mb-1">Total Amount</span>
          <span className="text-3xl font-black text-[#A7D63B]">${order.totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* Order Info Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#A7D63B]" /> Order Information
          </h3>
          <div className="bg-gray-50 rounded-xl p-5 grid grid-cols-2 gap-y-4 gap-x-6 border border-gray-100">
            <div>
              <p className="text-sm text-gray-500">Items</p>
              <p className="font-medium text-gray-800">{order.quantity}x {order.foodName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time Requested</p>
              <p className="font-medium text-gray-800">{order.time}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Status</p>
              <p className="font-medium text-gray-800 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  order.status === 'Pending' ? 'bg-yellow-400' :
                  order.status === 'Accepted' ? 'bg-[#A7D63B]' :
                  order.status === 'Completed' ? 'bg-gray-400' : 'bg-[#D67A5C]'
                }`}></span>
                {order.status}
              </p>
            </div>
          </div>
        </section>

        {/* Customer Info Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              {isOrganization ? <Building2 size={20} className="text-[#E9A38E]" /> : <User size={20} className="text-[#9BC7D8]" />}
              Customer Details
            </h3>
            <button 
              onClick={onViewProfile}
              className="text-sm text-[#1F5E2A] hover:text-[#A7D63B] font-medium flex items-center gap-1 transition-colors group"
            >
              View Full Profile <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className={`rounded-xl p-5 border ${
            isOrganization ? 'bg-[#E9A38E]/5 border-[#E9A38E]/20' : 'bg-[#9BC7D8]/5 border-[#9BC7D8]/20'
          }`}>
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-black/5">
              <img src={order.customer.avatar} alt="Avatar" className="w-14 h-14 rounded-full border-2 border-white shadow-sm" />
              <div>
                <h4 className="font-bold text-gray-800 text-lg">{order.customer.name}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full text-white inline-block mt-1 ${
                  isOrganization ? 'bg-[#E9A38E]' : 'bg-[#9BC7D8]'
                }`}>
                  {order.customer.type}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone size={16} className="text-gray-400" />
                <span>{order.customer.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail size={16} className="text-gray-400" />
                <span>{order.customer.email}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin size={16} className="text-gray-400 mt-0.5" />
                <span>{order.customer.address}</span>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Action Buttons */}
      <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-4">
        {order.status === 'Pending' ? (
          <>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStatusChange(order.id, 'Accepted')}
              className="flex-1 bg-[#A7D63B] text-[#1F5E2A] py-3 rounded-xl font-bold shadow-sm hover:shadow-md transition-all flex justify-center items-center gap-2"
            >
              <CheckCircle size={20} /> Accept Order
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStatusChange(order.id, 'Rejected')}
              className="flex-1 bg-white border-2 border-[#D67A5C] text-[#D67A5C] py-3 rounded-xl font-bold hover:bg-[#D67A5C] hover:text-white transition-all shadow-sm flex justify-center items-center gap-2"
            >
              <XCircle size={20} /> Reject
            </motion.button>
          </>
        ) : (
          <div className="flex-1 text-center py-2 px-4 rounded-xl bg-gray-200 text-gray-600 font-medium flex items-center justify-center gap-2">
            Status: {order.status}
            {order.status === 'Accepted' && (
               <button 
                onClick={() => onStatusChange(order.id, 'Completed')}
                className="ml-4 bg-[#1F5E2A] text-white px-4 py-1.5 rounded-lg text-sm hover:bg-opacity-90 transition"
               >
                 Mark Completed
               </button>
            )}
          </div>
        )}
      </div>

    </motion.div>
  );
};

export default DetailsOrders;
