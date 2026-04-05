import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Clock, Heart, BarChart2, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import HowItWorks from './howItWorks';

const About = () => {
  const [mealsSaved, setMealsSaved] = useState(0);
  const [restaurantsJoined, setRestaurantsJoined] = useState(0);
  const [receiversHelped, setReceiversHelped] = useState(0);

  useEffect(() => {
    let meals = 0;
    let restaurants = 0;
    let receivers = 0;

    const interval = setInterval(() => {
      if (meals >= 1250 && restaurants >= 120 && receivers >= 850) {
        clearInterval(interval);
        return;
      }
      meals = Math.min(meals + 5, 1250);
      restaurants = Math.min(restaurants + 1, 120);
      receivers = Math.min(receivers + 3, 850);
      
      setMealsSaved(meals);
      setRestaurantsJoined(restaurants);
      setReceiversHelped(receivers);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-20 bg-[#F8F8F6] min-h-screen text-[#1F5E2A] relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#A7D63B] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E9A38E] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none"></div>
      <div className="absolute top-[40%] left-0 w-[350px] h-[350px] bg-[#9BC7D8] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none"></div>
      <div className="absolute top-[40%] right-0 w-[300px] h-[300px] bg-[#D67A5C] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none"></div>
      <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3F7A4C] rounded-full mix-blend-multiply filter blur-[120px] opacity-30 pointer-events-none"></div>

      <section className="relative z-10 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-[#1F5E2A] mb-4"
          >
            Turning Surplus into Smiles in Colombo District
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl font-semibold text-[#3F7A4C] mb-6 max-w-4xl mx-auto"
          >
            Smart Food Management for a Sustainable Future
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-md md:text-lg text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Our platform empowers restaurants, organizations, and individuals in Colombo District to share surplus food before it goes to waste. With real-time listings, smart categorization, and seamless donation requests, we ensure every edible meal finds someone who needs it. Together, we reduce waste, fight hunger, and build a greener, more sustainable community.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8">
            <motion.div whileHover={{ scale: 1.05, boxShadow: "0 20px 30px rgba(0,0,0,0.1)" }} className="md:col-span-2 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 transition border-t-4 border-[#A7D63B] group">
              <div className="w-20 h-20 mx-auto bg-[#A7D63B]/20 rounded-full flex items-center justify-center mb-4 transition-colors group-hover:bg-[#A7D63B]/30">
                <Utensils className="w-10 h-10 text-[#A7D63B] drop-shadow-lg transition-colors group-hover:text-[#8db832]" />
              </div>
              <h3 className="text-xl font-bold mt-4">Food Sharing</h3>
              <p className="text-gray-600 mt-2">Restaurants list surplus food, instantly visible to nearby receivers.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, boxShadow: "0 20px 30px rgba(0,0,0,0.1)" }} className="md:col-span-2 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 transition border-t-4 border-[#E9A38E] group">
              <div className="w-20 h-20 mx-auto bg-[#E9A38E]/20 rounded-full flex items-center justify-center mb-4 transition-colors group-hover:bg-[#E9A38E]/30">
                <Clock className="w-10 h-10 text-[#E9A38E] drop-shadow-lg transition-colors group-hover:text-[#d38f7a]" />
              </div>
              <h3 className="text-xl font-bold mt-4">Expiry Alerts</h3>
              <p className="text-gray-600 mt-2">Track near-expiry food to prevent waste before it happens.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, boxShadow: "0 20px 30px rgba(0,0,0,0.1)" }} className="md:col-span-2 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 transition border-t-4 border-[#9BC7D8] group">
              <div className="w-20 h-20 mx-auto bg-[#9BC7D8]/20 rounded-full flex items-center justify-center mb-4 transition-colors group-hover:bg-[#9BC7D8]/30">
                <Heart className="w-10 h-10 text-[#9BC7D8] drop-shadow-lg transition-colors group-hover:text-[#88b0c0]" />
              </div>
              <h3 className="text-xl font-bold mt-4">Instant Requests</h3>
              <p className="text-gray-600 mt-2">Receivers request food and restaurants respond in real-time.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, boxShadow: "0 20px 30px rgba(0,0,0,0.1)" }} className="md:col-span-2 md:col-start-2 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 transition border-t-4 border-[#1F5E2A] group">
              <div className="w-20 h-20 mx-auto bg-[#1F5E2A]/20 rounded-full flex items-center justify-center mb-4 transition-colors group-hover:bg-[#1F5E2A]/30">
                <BarChart2 className="w-10 h-10 text-[#1F5E2A] drop-shadow-lg transition-colors group-hover:text-[#184820]" />
              </div>
              <h3 className="text-xl font-bold mt-4">Waste Reduction Analytics</h3>
              <p className="text-gray-600 mt-2">Track meals saved, CO₂ reduced, and community helped.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, boxShadow: "0 20px 30px rgba(0,0,0,0.1)" }} className="md:col-span-2 md:col-start-4 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 transition border-t-4 border-[#D67A5C] group">
              <div className="w-20 h-20 mx-auto bg-[#D67A5C]/20 rounded-full flex items-center justify-center mb-4 transition-colors group-hover:bg-[#D67A5C]/30">
                <Leaf className="w-10 h-10 text-[#D67A5C] drop-shadow-lg transition-colors group-hover:text-[#be6a50]" />
              </div>
              <h3 className="text-xl font-bold mt-4">Eco-Friendly</h3>
              <p className="text-gray-600 mt-2">Minimize environmental impact by reducing food waste.</p>
            </motion.div>
          </div>

          
        </div>
      </section>

      {/* Impact Counters */}
      <section className="relative z-10 py-16 bg-gradient-to-r from-[#3F7A4C] to-[#2E5E3A] text-white mt-12 mb-12 rounded-3xl max-w-7xl mx-auto shadow-xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
          <motion.div className="py-4">
            <div className="text-5xl font-extrabold mb-2 text-[#A7D63B]">{mealsSaved}+</div>
            <div className="text-lg opacity-90">Meals Saved</div>
          </motion.div>
          <motion.div className="py-4">
            <div className="text-5xl font-extrabold mb-2 text-[#9BC7D8]">{restaurantsJoined}+</div>
            <div className="text-lg opacity-90">Active Restaurants</div>
          </motion.div>
          <motion.div className="py-4">
            <div className="text-5xl font-extrabold mb-2 text-[#E9A38E]">{receiversHelped}+</div>
            <div className="text-lg opacity-90">Receivers Helped</div>
          </motion.div>
        </div>
      </section>

      <HowItWorks />
    </div>
  );
};

export default About;
