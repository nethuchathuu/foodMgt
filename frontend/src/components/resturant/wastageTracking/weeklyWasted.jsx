import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingDown, AlertTriangle } from 'lucide-react';

const weeklyData = [
  { name: 'Mon', amount: 12 },
  { name: 'Tue', amount: 8 },
  { name: 'Wed', amount: 15 },
  { name: 'Thu', amount: 10 },
  { name: 'Fri', amount: 22 },
  { name: 'Sat', amount: 30 },
  { name: 'Sun', amount: 25 },
];

const topItems = [
  { name: "Cooked Rice", qty: "45 kg", percentage: 40 },
  { name: "Bakery Items", qty: "20 kg", percentage: 25 },
  { name: "Vegetables", qty: "15 kg", percentage: 15 },
];

const WeeklyWasted = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#9BC7D8]/10 border border-[#9BC7D8]/30 p-6 rounded-2xl shadow-sm flex justify-between items-center">
           <div>
             <p className="text-[#1F5E2A] font-medium mb-1">Total This Week</p>
             <h2 className="text-4xl font-black text-[#9BC7D8]">122 <span className="text-xl font-bold">kg</span></h2>
           </div>
           <div className="bg-white p-3 rounded-xl shadow-sm self-end flex items-center gap-2 text-green-600 font-bold text-sm">
             <TrendingDown size={18} /> 12% less than last week
           </div>
        </div>

        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl shadow-sm flex items-start gap-4">
           <div className="p-3 bg-red-100 text-red-500 rounded-xl">
             <AlertTriangle size={24} />
           </div>
           <div>
             <h3 className="font-bold text-red-800 mb-1">High Waste Day Detected</h3>
             <p className="text-sm text-red-600">Saturday saw a spike of 30kg. Consider adjusting weekend preparation batches.</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-[#D8C3A5]/30">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#1F5E2A]">Wastage Trend (Mon-Sun)</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9BC7D8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#9BC7D8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888'}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="amount" stroke="#9BC7D8" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Items */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#D8C3A5]/30">
          <h3 className="text-lg font-bold text-[#1F5E2A] mb-6">Most Wasted Items</h3>
          <div className="space-y-6">
            {topItems.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">{item.name}</span>
                  <span className="text-sm font-bold text-[#D67A5C]">{item.qty}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="bg-[#D67A5C] h-2.5 rounded-full"
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeeklyWasted;
