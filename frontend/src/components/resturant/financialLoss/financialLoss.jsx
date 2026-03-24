import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WastedLoss from './wastedLoss';
import UnsoldLoss from './unsoldLoss';
import DailyLoss from './dailyLoss';

const wastedData = [
  { id: 1, foodName: "Rice", quantity: 5, unit: "kg", loss: 800 },
  { id: 2, foodName: "Bread", quantity: 10, unit: "units", loss: 500 },
];

const unsoldData = [
  { id: 1, foodName: "Salad", quantity: 2, unit: "kg", originalPrice: 600, lostRevenue: 400 },
  { id: 2, foodName: "Vegetable Curry", quantity: 3, unit: "portions", originalPrice: 600, lostRevenue: 450 },
];

const FinancialLoss = () => {
  const [activeTab, setActiveTab] = useState('wasted');

  const totalWasted = wastedData.reduce((sum, item) => sum + item.loss, 0);
  const totalUnsold = unsoldData.reduce((sum, item) => sum + item.lostRevenue, 0);
  const totalLoss = totalWasted + totalUnsold;

  const tabs = [
    { id: 'wasted', label: 'Wasted Food Loss' },
    { id: 'unsold', label: 'Unsold Food Loss' },
    { id: 'daily', label: 'Daily Breakdown' }
  ];

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
              <p className="text-sm font-bold text-gray-500 tracking-wider uppercase mb-2">Total Loss Today</p>
              {totalLoss > 2000 && (
                <span className="text-xs text-[#D67A5C] font-bold bg-[#D67A5C]/10 px-3 py-1.5 rounded-lg flex items-center gap-2 w-max border border-[#D67A5C]/20">
                  <span className="w-2 h-2 rounded-full bg-[#D67A5C] animate-pulse"></span>
                  High Loss Warning
                </span>
              )}
            </div>
            <div className="text-4xl sm:text-5xl font-black text-[#D67A5C] tracking-tight drop-shadow-sm">
              Rs. {totalLoss.toLocaleString()}
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-max max-w-full overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-6 py-3 rounded-xl font-bold transition-all duration-300 whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'text-[#1F5E2A]' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="lossTabIndicator"
                  className="absolute inset-0 bg-[#A7D63B] rounded-xl -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === 'wasted' && (
              <motion.div key="wasted" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
                <WastedLoss data={wastedData} />
              </motion.div>
            )}
            {activeTab === 'unsold' && (
              <motion.div key="unsold" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
                <UnsoldLoss data={unsoldData} />
              </motion.div>
            )}
            {activeTab === 'daily' && (
              <motion.div key="daily" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
                <DailyLoss wasted={wastedData} unsold={unsoldData} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default FinancialLoss;
