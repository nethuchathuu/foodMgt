import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const getEmoji = (name) => {
  const lowerName = (name || '').toLowerCase();
  if (lowerName.includes('rice')) return "🍛";
  if (lowerName.includes('bread')) return "🍞";
  if (lowerName.includes('salad')) return "🥗";
  if (lowerName.includes('curry')) return "🍲";
  return "🍽️";
};

const DailyLoss = ({ wasted, unsold }) => {
  const combined = {};
  wasted.forEach(item => {
    if (!combined[item.foodName]) combined[item.foodName] = { wastedLoss: 0, unsoldLoss: 0 };
    combined[item.foodName].wastedLoss += item.loss;
  });
  unsold.forEach(item => {
    if (!combined[item.foodName]) combined[item.foodName] = { wastedLoss: 0, unsoldLoss: 0 };
    combined[item.foodName].unsoldLoss += item.lostRevenue;
  });

  const foods = Object.keys(combined).map(name => ({
    foodName: name,
    wastedLoss: combined[name].wastedLoss,
    unsoldLoss: combined[name].unsoldLoss,
    totalLoss: combined[name].wastedLoss + combined[name].unsoldLoss
  })).sort((a,b) => b.totalLoss - a.totalLoss);

  const totalSold = 15000; 
  const totalWasted = foods.reduce((acc, i) => acc + i.wastedLoss, 0);
  const totalUnsold = foods.reduce((acc, i) => acc + i.unsoldLoss, 0);
  const totalLoss = totalWasted + totalUnsold;

  const highestLossItem = foods[0]?.foodName;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      {highestLossItem && (
        <div className="bg-[#D67A5C]/10 border border-[#D67A5C]/20 rounded-2xl p-5 flex items-center gap-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingDown size={64} className="text-[#D67A5C]" />
          </div>
          <div className="bg-white p-3 rounded-full shadow-sm text-3xl z-10 w-16 h-16 flex items-center justify-center">
            {getEmoji(highestLossItem)}
          </div>
          <div className="z-10">
            <h4 className="text-[#D67A5C] font-extrabold text-lg flex items-center gap-2">Highest Loss: {highestLossItem}</h4>
            <p className="text-sm text-[#D67A5C]/80 mt-1 font-semibold">Consider preparing less of this item to reduce financial drain.</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {foods.map((item, idx) => (
          <motion.div 
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-gray-100"
          >
            <h3 className="text-xl font-bold text-[#1F5E2A] flex items-center gap-2 mb-4 pb-3 border-b border-gray-50">
              <span className="text-2xl">{getEmoji(item.foodName)}</span> {item.foodName}
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-red-50/50 p-3 rounded-xl border border-red-50">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Wasted Loss</p>
                <p className="text-[#D67A5C] font-extrabold text-lg">Rs. {item.wastedLoss}</p>
              </div>
              <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-50">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Unsold Loss</p>
                <p className="text-[#9BC7D8] font-extrabold text-lg">Rs. {item.unsoldLoss}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex flex-col justify-center shadow-sm">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Overall Loss</p>
                <p className="text-[#1F5E2A] font-black text-xl">Rs. {item.totalLoss}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm mt-8 border border-gray-100">
        <h4 className="font-extrabold text-xl text-[#1F5E2A] mb-6">Daily Revenue vs Loss</h4>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-bold text-gray-600 uppercase tracking-wide">Food Sold</span>
              <span className="text-[#A7D63B] font-extrabold text-lg">Rs. {totalSold.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-gradient-to-r from-[#C8E66A] to-[#A7D63B] h-full rounded-full"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-bold text-gray-600 uppercase tracking-wide">Food Wasted/Unsold</span>
              <span className="text-[#D67A5C] font-extrabold text-lg flex items-center gap-1">
                Rs. {totalLoss.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden shadow-inner flex">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "10%" }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="bg-gradient-to-r from-[#D67A5C] to-[#E9A38E] h-full"
                title="Wasted"
              />
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "5%" }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                className="bg-gradient-to-r from-[#9BC7D8] to-blue-300 h-full border-l border-white/50"
                title="Unsold"
              />
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default DailyLoss;
