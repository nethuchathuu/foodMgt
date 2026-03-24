import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DailyWasted from './dailyWasted';
import WeeklyWasted from './weeklyWasted';
import MonthlyWasted from './monthlyWasted';
import YearlyWasted from './yearlyWasted';

const tabs = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'yearly', label: 'Yearly' }
];

const ReportWasted = () => {
  const [activeTab, setActiveTab] = useState('daily');

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#D8C3A5]/30 p-2 inline-flex relative">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-2.5 text-sm font-bold rounded-xl transition-colors z-10 ${
              activeTab === tab.id ? 'text-[#1F5E2A]' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-[#A7D63B]/20 rounded-xl"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-20">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'daily' && <motion.div key="daily" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}><DailyWasted /></motion.div>}
          {activeTab === 'weekly' && <motion.div key="weekly" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}><WeeklyWasted /></motion.div>}
          {activeTab === 'monthly' && <motion.div key="monthly" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}><MonthlyWasted /></motion.div>}
          {activeTab === 'yearly' && <motion.div key="yearly" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}><YearlyWasted /></motion.div>}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReportWasted;
