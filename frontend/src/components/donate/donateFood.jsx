import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Leaf, Utensils } from 'lucide-react';

const DonateFood = () => {
  return (
    <div className="pt-20 bg-[#F8F8F6] min-h-screen text-[#1F5E2A]">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-[#E9A38E] rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-xl shadow-[#E9A38E]/20">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full rounded-bl-[100px] -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D67A5C] rounded-full rounded-tr-[80px] -ml-5 -mb-5"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Food Belongs In Bellies, Not Bins.</h2>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Are you an organization looking to support your community? Connect with generous restaurants willing to donate their surplus, perfectly good food to those in need.
              </p>
              <button className="px-8 py-4 bg-white text-[#D67A5C] rounded-2xl font-bold shadow-lg hover:bg-[#F8F8F6] transition-colors inline-flex items-center gap-2">
                <Heart size={20} fill="#D67A5C" /> Request Donation
              </button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="w-full max-w-sm aspect-square bg-[#F8F8F6] rounded-full flex flex-col items-center justify-center p-8 shadow-2xl relative">
                 <Heart size={80} className="text-[#E9A38E] mb-4" />
                 <h3 className="text-2xl font-bold text-[#1F5E2A] text-center">Together We Care</h3>
                 
                 {/* Mini decorative icons */}
                 <div className="absolute top-10 right-10 text-[#9BC7D8]"><Leaf size={30} /></div>
                 <div className="absolute bottom-16 left-10 text-[#A7D63B]"><Utensils size={40} /></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonateFood;