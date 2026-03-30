import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import WastedLoss from './wastedLoss';

const FinancialLoss = () => {
  const [wastedData, setWastedData] = useState([]);
  const [todayTotals, setTodayTotals] = useState({ wastedLoss: 0, totalLoss: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [listRes, totalsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/restaurants/financial-loss', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:5000/api/financial-loss/today', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setWastedData(listRes.data.wastedData || []);
        setTodayTotals(totalsRes.data || { wastedLoss: 0, totalLoss: 0 });
      } catch (err) {
        console.error('Error fetching financial loss data:', err);
      }
    };
    fetchData();
  }, []);

  const totalWasted = wastedData.reduce((sum, item) => sum + item.loss, 0);
  const totalLoss = todayTotals.totalLoss || totalWasted;

  return (
    <div className="bg-[#F8F8F6] min-h-screen p-4 sm:p-8 font-sans pb-24 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F5E2A] flex items-center gap-3">
              Financial Loss Analysis 💸
            </h1>
            <p className="text-gray-500 mt-2 text-lg">Track where your money is being lost due to food left behind.</p>
          </div>
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-white to-[#F8F8F6]">
            <div>
              <p className="text-sm font-bold text-gray-500 tracking-wider uppercase mb-2">Total Wasted Loss</p>
              <p className="text-2xl font-extrabold text-[#D67A5C]">Rs. {totalWasted.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-500 tracking-wider uppercase">Today Total Loss</p>
              <p className="text-4xl sm:text-5xl font-black text-[#D67A5C] tracking-tight">Rs. {totalLoss.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
        <div className="mt-6">
          <WastedLoss data={wastedData} />
        </div>

      </div>
    </div>
  );
};

export default FinancialLoss;
