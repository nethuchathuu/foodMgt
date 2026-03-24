import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Dummy Data
const logs = [
  { id: 1, food: "Rice Bowls", qty: "5 kg", reason: "Expired", time: "10:30 AM" },
  { id: 2, food: "Vegetable Curry", qty: "2 kg", reason: "Customer Leftovers", time: "02:15 PM" },
  { id: 3, food: "Bread", qty: "10 units", reason: "Overcooked", time: "05:45 PM" },
];

const barData = [
  { time: '8 AM', amount: 1 },
  { time: '12 PM', amount: 4 },
  { time: '4 PM', amount: 2 },
  { time: '8 PM', amount: 6 },
];

const pieData = [
  { name: 'Expired', value: 40 },
  { name: 'Leftovers', value: 30 },
  { name: 'Overcooked', value: 30 },
];
const COLORS = ['#D67A5C', '#E9A38E', '#D8C3A5'];

const DailyWasted = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Left: Charts */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#D8C3A5]/30">
          <h3 className="text-lg font-bold text-[#1F5E2A] mb-4">Wastage by Time (Today)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                <Tooltip cursor={{fill: 'rgba(214, 122, 92, 0.05)'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="amount" fill="#D67A5C" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#D8C3A5]/30 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex-1">
             <h3 className="text-lg font-bold text-[#1F5E2A] mb-2">Reasons for Waste</h3>
             <p className="text-sm text-gray-500 mb-4">Breakdown of why food was discarded today.</p>
             <div className="space-y-2">
               {pieData.map((entry, index) => (
                 <div key={entry.name} className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                     <span className="text-gray-700">{entry.name}</span>
                   </div>
                   <span className="font-bold text-gray-900">{entry.value}%</span>
                 </div>
               ))}
             </div>
           </div>
           <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}} />
                </PieChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Right: Logs Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#D8C3A5]/30 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 bg-[#F8F8F6]">
          <h3 className="text-lg font-bold text-[#1F5E2A]">Today's Detailed Logs</h3>
        </div>
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">Time</th>
                <th className="p-4 font-medium">Food Item</th>
                <th className="p-4 font-medium">Quantity</th>
                <th className="p-4 font-medium">Reason</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                  <td className="p-4 text-sm text-gray-500">{log.time}</td>
                  <td className="p-4 text-sm font-semibold text-gray-800">{log.food}</td>
                  <td className="p-4 text-sm font-bold text-[#D67A5C]">{log.qty}</td>
                  <td className="p-4">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                      {log.reason}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {logs.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              No waste logged today. Great job! 🌍
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DailyWasted;
