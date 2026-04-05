import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ImpactStats = () => {
  const [mealsSaved, setMealsSaved] = useState(0);
  const [restaurantsJoined, setRestaurantsJoined] = useState(0);
  const [donationsDelivered, setDonationsDelivered] = useState(0);

  useEffect(() => {
    let meals = 0;
    let restaurants = 0;
    let donations = 0;

    const interval = setInterval(() => {
      if (meals >= 1250 && restaurants >= 120 && donations >= 850) {
        clearInterval(interval);
        return;
      }

      meals = Math.min(meals + 5, 1250);
      restaurants = Math.min(restaurants + 1, 120);
      donations = Math.min(donations + 3, 850);

      setMealsSaved(meals);
      setRestaurantsJoined(restaurants);
      setDonationsDelivered(donations);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="py-16 bg-gradient-to-r from-[#3F7A4C] to-[#2E5E3A] text-white">
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
              <div className="text-6xl font-extrabold mb-2 text-[#9BC7D8]">{restaurantsJoined}+</div>
              <div className="text-xl opacity-80">Restaurants Joined</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="py-4"
            >
              <div className="text-6xl font-extrabold mb-2 text-[#E9A38E]">{donationsDelivered}+</div>
              <div className="text-xl opacity-80">Donations Delivered</div>
            </motion.div>
          </div>
        </div>
      </section>
      <div className="h-[5px] w-full bg-[#F8F8F6]"></div>
    </>
  );
};

export default ImpactStats;