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

const ReportWasted = ({ selectedDate }) => {
  const [activeTab, setActiveTab] = useState('daily');

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <div className="flex gap-3 mt-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-2 font-semibold rounded-full transition-colors z-10 ${
              activeTab === tab.id ? 'bg-[#A7D63B] text-[#1F5E2A]' : 'bg-white text-gray-600 hover:bg-[#C8E66A]/30'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-[#A7D63B] rounded-full -z-10"
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
          {activeTab === 'daily' && <motion.div key="daily" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}><DailyWasted selectedDate={selectedDate} /></motion.div>}
          {activeTab === 'weekly' && <motion.div key="weekly" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}><WeeklyWasted selectedDate={selectedDate} /></motion.div>}
          {activeTab === 'monthly' && <motion.div key="monthly" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}><MonthlyWasted selectedDate={selectedDate} /></motion.div>}
          {activeTab === 'yearly' && <motion.div key="yearly" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}><YearlyWasted selectedDate={selectedDate} /></motion.div>}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReportWasted;
