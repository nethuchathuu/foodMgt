import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ImpactStats = () => {
  const [mealsSaved, setMealsSaved] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMealsSaved(prev => (prev < 1250 ? prev + 5 : 1250));
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-[#1F5E2A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-4"
          >
            <div className="text-6xl font-extrabold mb-2 text-[#A7D63B]">{mealsSaved}+</div>
            <div className="text-xl opacity-80">Meals Saved</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="py-4"
          >
            <div className="text-6xl font-extrabold mb-2 text-[#9BC7D8]">120+</div>
            <div className="text-xl opacity-80">Restaurants Joined</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="py-4"
          >
            <div className="text-6xl font-extrabold mb-2 text-[#E9A38E]">850+</div>
            <div className="text-xl opacity-80">Donations Delivered</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;