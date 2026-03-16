import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Voices of Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { role: "Restaurant Owner", name: "Chef Mario", quote: "This platform changed how we handle surplus. We waste zero food now, and connect with our community!", bg: "bg-[#D8C3A5]/20" },
            { role: "Customer", name: "Sarah L.", quote: "I love getting high-quality cafe meals for half the price! It's good for my wallet and the planet.", bg: "bg-[#9BC7D8]/20" },
            { role: "Organization", name: "Hope Shelter", quote: "The donation feature is incredible. We’ve been able to provide warm, restaurant-quality meals to so many families.", bg: "bg-[#A7D63B]/20" }
          ].map((test, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-[2rem] ${test.bg} relative`}
            >
              <div className="text-4xl text-[#1F5E2A] opacity-20 font-serif absolute top-4 left-6">"</div>
              <p className="text-lg italic text-gray-700 mb-6 relative z-10 pt-4">"{test.quote}"</p>
              <div>
                <h4 className="font-bold text-[#1F5E2A] text-xl">{test.name}</h4>
                <p className="text-sm text-gray-500 font-medium">{test.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;