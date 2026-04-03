import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, Mail, Building2, User, Clock, Star } from 'lucide-react';

const ProfileOrders = ({ isOpen, onClose, customer }) => {
  if (!customer) return null;

  const isOrg = customer.type === "Organization";
  const themeColor = isOrg ? 'bg-[#E9A38E]' : 'bg-[#9BC7D8]';
  const themeText = isOrg ? 'text-[#E9A38E]' : 'text-[#9BC7D8]';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1F5E2A]/20 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden z-10 border border-[#D8C3A5]/50"
          >
            {/* Header/Cover */}
            <div className={`h-32 ${themeColor} relative opacity-80 bg-gradient-to-tr from-black/10 to-transparent`}>
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-md transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Profile Content */}
            <div className="px-8 pb-8 pt-0 relative">
              {/* Avatar Bubble */}
              <div className="flex justify-between items-end -mt-12 mb-6">
                <div className="relative">
                  <img 
                    src={customer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=random`} 
                    alt={customer.name} 
                    className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover bg-white"
                  />
                  <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center ${themeColor} text-white shadow-sm`}>
                    {isOrg ? <Building2 size={14} /> : <User size={14} />}
                  </div>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm ${themeColor} h-fit`}>
                  {customer.type}
                </div>
              </div>

              {/* Names */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                  {customer.name}
                </h2>
                {isOrg && customer.orgName && customer.orgName !== customer.name && (
                  <p className="text-gray-500 text-sm font-medium mt-1">{customer.orgName}</p>
                )}
                <div className="flex gap-4 mt-3 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400" fill="currentColor"/> 4.8 Rating</span>
                  <span className="flex items-center gap-1"><Clock size={14}/> Member since '25</span>
                </div>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${themeColor}/10 ${themeText}`}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-0.5">Phone Number</p>
                    <p className="text-sm font-semibold text-gray-700">{customer.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${themeColor}/10 ${themeText}`}>
                    <Mail size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-gray-400 font-medium mb-0.5">Email Address</p>
                    <p className="text-sm font-semibold text-gray-700 truncate">{customer.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${themeColor}/10 ${themeText}`}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-0.5">Delivery Address</p>
                    <p className="text-sm font-semibold text-gray-700 leading-tight">{customer.address}</p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button className="w-full py-3 rounded-xl bg-[#1F5E2A] text-white font-bold hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg active:scale-95 flex justify-center items-center gap-2">
                <Mail size={18} />
                Contact Customer
              </button>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProfileOrders;
