import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, ShieldAlert } from 'lucide-react';

const monthlyData = [
  { name: 'Week 1', amount: 95, loss: 12000 },
  { name: 'Week 2', amount: 122, loss: 15500 },
  { name: 'Week 3', amount: 80, loss: 9800 },
  { name: 'Week 4', amount: 85, loss: 10200 },
];

const MonthlyWasted = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#C8E66A]/20 border border-[#C8E66A]/40 p-6 rounded-2xl shadow-sm">
           <p className="text-[#1F5E2A] font-medium mb-1">Total Monthly Wastage</p>
           <h2 className="text-4xl font-black text-[#A7D63B]">382 <span className="text-xl font-bold">kg</span></h2>
           <p className="text-sm text-gray-600 mt-2">Target: &lt; 400 kg</p>
        </div>

        <div className="bg-[#D67A5C]/10 border border-[#D67A5C]/30 p-6 rounded-2xl shadow-sm relative overflow-hidden">
           <DollarSign className="absolute -right-4 -bottom-4 text-[#D67A5C]/10 w-32 h-32" />
           <p className="text-red-800 font-medium mb-1 relative z-10">Estimated Financial Loss</p>
           <h2 className="text-4xl font-black text-[#D67A5C] relative z-10">LKR 47,500</h2>
           <p className="text-sm text-red-600/80 mt-2 relative z-10 flex items-center gap-1"><ShieldAlert size={14}/> 5% higher than last month</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#D8C3A5]/30">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-[#1F5E2A]">Wastage vs Loss (Weekly Breakdown)</h3>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888'}} />
              <YAxis yAxisId="left" orientation="left" stroke="#888" axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#D67A5C" axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}} 
                cursor={{fill: 'transparent'}}
              />
              <Bar yAxisId="left" dataKey="amount" name="Wastage (kg)" fill="#C8E66A" radius={[6, 6, 0, 0]} barSize={40} />
              <Bar yAxisId="right" dataKey="loss" name="Loss (LKR)" fill="#D67A5C" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default MonthlyWasted;
