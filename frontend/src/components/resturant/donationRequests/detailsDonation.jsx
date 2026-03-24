import React from 'react';
import { motion } from 'framer-motion';
import { Heart, User, Building2, Phone, Mail, MapPin, CheckCircle, XCircle, Calendar, ChevronRight, Hash, AlertCircle } from 'lucide-react';

const DetailsDonation = ({ request, onStatusChange, onViewProfile }) => {
  if (!request) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-[#D8C3A5]/30 h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
          <Heart className="text-green-300" size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-700 mb-2">No Request Selected</h2>
        <p className="text-gray-500 max-w-md">
          Select a donation request from the list to view its details, requester information, and approve or schedule pickups.
        </p>
      </div>
    );
  }

  const isOrganization = request.requester.type === "Organization";

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      key={request.id}
      className="bg-white rounded-2xl shadow-sm border border-[#D8C3A5]/30 h-full flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gradient-to-r from-white to-[#F8F8F6]">
        <div>
          <span className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-1">
            <Hash size={14} className="text-[#A7D63B]" /> {request.id}
            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">• {request.time}</span>
          </span>
          <h2 className="text-2xl font-bold text-[#1F5E2A] mt-2">{request.items}</h2>
        </div>
        {request.urgency === 'High' && (
          <div className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg border border-red-100 font-medium text-sm">
            <AlertCircle size={16} /> Needed Urgently
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* Request Details Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Heart size={20} className="text-[#A7D63B]" /> Request Details
          </h3>
          <div className="bg-gray-50 rounded-xl p-5 grid grid-cols-2 gap-y-6 gap-x-6 border border-gray-100 relative overflow-hidden">
            {/* Decal */}
            <Heart className="absolute -right-4 -bottom-4 text-gray-200/50 w-32 h-32" />
            
            <div className="relative z-10">
              <p className="text-sm text-gray-500 mb-1">Requested Items</p>
              <p className="font-semibold text-gray-800 text-lg">{request.items}</p>
            </div>
            <div className="relative z-10">
              <p className="text-sm text-gray-500 mb-1">Quantity Needed</p>
              <p className="font-semibold text-gray-800 text-lg">{request.quantity} units</p>
            </div>
            <div className="relative z-10 bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex items-start gap-3 col-span-2">
               <div className="p-2 bg-blue-50 text-blue-500 rounded-md">
                 <Calendar size={20} />
               </div>
               <div>
                  <p className="text-xs text-gray-500 font-medium">Preferred Pickup Time</p>
                  <p className="font-bold text-gray-800">{request.preferredPickup}</p>
               </div>
            </div>
          </div>
        </section>

        {/* Requester Info Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              {isOrganization ? <Building2 size={20} className="text-[#E9A38E]" /> : <User size={20} className="text-[#9BC7D8]" />}
              Requester Info
            </h3>
            <button 
              onClick={onViewProfile}
              className="text-sm text-[#1F5E2A] hover:text-[#A7D63B] font-medium flex items-center gap-1 transition-colors group"
            >
              View Profile <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className={`rounded-xl p-5 border ${
            isOrganization ? 'bg-[#E9A38E]/5 border-[#E9A38E]/20' : 'bg-[#9BC7D8]/5 border-[#9BC7D8]/20'
          }`}>
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-black/5">
              <img src={request.requester.avatar} alt="Avatar" className="w-14 h-14 rounded-full border-2 border-white shadow-sm" />
              <div>
                <h4 className="font-bold text-gray-800 text-lg">{request.requester.name}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full text-white inline-block mt-1 ${
                  isOrganization ? 'bg-[#E9A38E]' : 'bg-[#9BC7D8]'
                }`}>
                  {request.requester.type}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone size={16} className="text-gray-400" />
                <span>{request.requester.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail size={16} className="text-gray-400" />
                <span>{request.requester.email}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin size={16} className="text-gray-400 mt-0.5" />
                <span>{request.requester.address}</span>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Action Buttons */}
      <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
        {request.status === 'Pending' ? (
          <>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStatusChange(request.id, 'Approved')}
              className="flex-1 bg-[#A7D63B] text-[#1F5E2A] py-3 rounded-xl font-bold shadow-sm hover:shadow-md transition-all flex justify-center items-center gap-2"
            >
              <CheckCircle size={20} /> Approve
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStatusChange(request.id, 'Rejected')}
              className="px-6 bg-white border-2 border-[#D67A5C] text-[#D67A5C] py-3 rounded-xl font-bold hover:bg-[#D67A5C] hover:text-white transition-all shadow-sm flex justify-center items-center gap-2"
            >
              <XCircle size={20} /> Reject
            </motion.button>
          </>
        ) : request.status === 'Approved' ? (
          <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStatusChange(request.id, 'Scheduled')}
              className="flex-1 bg-[#9BC7D8] text-white py-3 rounded-xl font-bold shadow-sm hover:shadow-md transition-all flex justify-center items-center gap-2"
            >
              <Calendar size={20} /> Schedule Pickup
          </motion.button>
        ) : (
          <div className={`flex-1 text-center py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2
            ${request.status === 'Scheduled' ? 'bg-[#C8E66A]/20 text-[#1F5E2A]' : 'bg-red-50 text-red-600'}
          `}>
            Status: {request.status} 
            {request.status === 'Scheduled' && <CheckCircle size={18} className="text-[#A7D63B]" />}
          </div>
        )}
      </div>

    </motion.div>
  );
};

export default DetailsDonation;
