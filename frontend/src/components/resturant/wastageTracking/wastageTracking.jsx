import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, BarChart3, Calendar, DollarSign, Plus } from 'lucide-react';
import AddWasted from './addWasted';
import ReportWasted from './reportWasted';
import CalendarWasted from './calendarWasted';

const WastageTracking = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const summaryCards = [
    { title: "Today's Wastage", value: "7 kg", sub: "2 items recorded", icon: Trash2, color: "text-[#E9A38E]", bg: "bg-[#E9A38E]/10" },
    { title: "Weekly Wastage", value: "122 kg", sub: "↓ 12% vs last week", icon: BarChart3, color: "text-[#9BC7D8]", bg: "bg-[#9BC7D8]/10" },
    { title: "Monthly Wastage", value: "382 kg", sub: "-18 kg under target", icon: Calendar, color: "text-[#C8E66A]", bg: "bg-[#A7D63B]/20" },
    { title: "Estimated Loss", value: "LKR 47.5k", sub: "↑ 5% vs last month", icon: DollarSign, color: "text-[#D67A5C]", bg: "bg-[#D67A5C]/10" }
  ];

  return (
    <div className="bg-[#F8F8F6] min-h-screen p-6 font-sans pb-24">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#1F5E2A] flex items-center gap-3">
            Wastage Tracking ♻️
          </h1>
          <p className="text-gray-600 mt-1">Monitor, analyze, and reduce food waste efficiently.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#D67A5C] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus size={20} /> Add Wastage
        </motion.button>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#D8C3A5]/30 hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${card.bg} opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.bg} ${card.color} relative z-10`}>
              <card.icon size={24} />
            </div>
            <h3 className="text-gray-500 font-medium text-sm mb-1 relative z-10">{card.title}</h3>
            <div className="flex items-baseline gap-2 relative z-10">
              <p className="text-3xl font-black text-[#1F5E2A]">{card.value}</p>
            </div>
            <p className={`text-xs font-semibold mt-2 relative z-10 ${card.sub.includes('↓') || card.sub.includes('under') ? 'text-green-600' : card.sub.includes('↑') ? 'text-red-500' : 'text-gray-400'}`}>
              {card.sub}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Reports & Charts (Takes up 2 columns on extra large screens) */}
        <div className="xl:col-span-2">
           <ReportWasted />
        </div>

        {/* Calendar Side Panel */}
        <div className="xl:col-span-1">
           <CalendarWasted />
           
           {/* Gamification Idea Widget */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.5 }}
             className="mt-6 bg-[#A7D63B] text-[#1F5E2A] p-6 rounded-2xl shadow-sm border border-[#1F5E2A]/10 relative overflow-hidden"
           >
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/20 rounded-bl-full"></div>
              <h4 className="font-bold text-lg mb-2 relative z-10">Eco Warrior Status</h4>
              <p className="text-sm font-medium opacity-90 relative z-10">You've successfully diverted 45kg of food from landfills this month by donating leftovers!</p>
              
              <div className="mt-4 bg-white/30 rounded-full h-2 w-full relative z-10">
                 <div className="bg-[#1F5E2A] h-2 rounded-full w-[70%]"></div>
              </div>
              <p className="text-xs font-bold mt-2 text-right relative z-10">70% to Next Goal</p>
           </motion.div>
        </div>

      </div>

      {/* Modals */}
      <AddWasted isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

    </div>
  );
};

export default WastageTracking;
