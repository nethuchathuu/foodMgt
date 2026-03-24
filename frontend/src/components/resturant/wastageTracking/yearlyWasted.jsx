import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Leaf } from 'lucide-react';

const yearlyData = [
  { name: 'Jan', current: 400, prev: 450 },
  { name: 'Feb', current: 380, prev: 420 },
  { name: 'Mar', current: 420, prev: 400 },
  { name: 'Apr', current: 350, prev: 390 },
  { name: 'May', current: 320, prev: 380 },
  { name: 'Jun', current: 310, prev: 370 },
  { name: 'Jul', current: 390, prev: 380 },
  { name: 'Aug', current: 410, prev: 400 },
  { name: 'Sep', current: 370, prev: 410 },
  { name: 'Oct', current: 340, prev: 390 },
  { name: 'Nov', current: 300, prev: 350 },
  { name: 'Dec', current: 280, prev: 340 },
];

const YearlyWasted = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-[#1F5E2A] text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
        <Leaf className="absolute -left-10 -bottom-10 text-white/5 w-64 h-64" />
        
        <div className="relative z-10">
          <p className="text-[#A7D63B] font-medium mb-1 uppercase tracking-wider text-sm">Year to Date Impact</p>
          <h2 className="text-3xl lg:text-4xl font-black">4,270 kg <span className="font-normal text-xl opacity-80">Saved vs. Last Year</span></h2>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center relative z-10 min-w-[200px]">
          <p className="text-sm font-medium opacity-80 mb-1">Total Wastage Decrease</p>
          <p className="text-3xl font-bold text-[#A7D63B]">-14.5%</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#D8C3A5]/30">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-[#1F5E2A]">Year over Year Comparison</h3>
          <div className="flex gap-4 text-sm font-medium">
             <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#A7D63B]"></span> 2024 (Current)</div>
             <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-200"></span> 2023 (Previous)</div>
          </div>
        </div>
        
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={yearlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A7D63B" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#A7D63B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#888'}} />
              <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}} />
              <Area type="monotone" dataKey="prev" stroke="#e5e7eb" strokeWidth={2} fill="rgba(229, 231, 235, 0.3)" />
              <Area type="monotone" dataKey="current" stroke="#A7D63B" strokeWidth={3} fillOpacity={1} fill="url(#colorCurrent)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default YearlyWasted;
