import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, ShoppingBag, Heart } from 'lucide-react';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const HowItWorks = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F8F6] overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-[#A7D63B] rounded-full mix-blend-multiply filter blur-[120px] opacity-[0.15] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#9BC7D8] rounded-full mix-blend-multiply filter blur-[150px] opacity-[0.15] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#E9A38E] rounded-full mix-blend-multiply filter blur-[130px] opacity-[0.15] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#D67A5C] rounded-full mix-blend-multiply filter blur-[160px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#1F5E2A]">How It Works</h2>
          <p className="text-xl text-gray-600">Three simple steps to make a difference</p>
        </div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { title: "Restaurants Post", desc: "Restaurants list surplus, high-quality meals before expiry at a discount.", icon: <Utensils size={40} />, gradient: "bg-gradient-to-r from-[#9BC7D8] to-[#6CA0B0]" },
            { title: "Customers Grab Deals", desc: "Users buy the delicious food at a significantly reduced price.", icon: <ShoppingBag size={40} />, gradient: "bg-gradient-to-r from-[#A7D63B] to-[#5C8B2D]" },
            { title: "Donations Initiated", desc: "Organizations request unsold food as donations from generous restaurants.", icon: <Heart size={40} />, gradient: "bg-gradient-to-r from-[#E9A38E] to-[#D67A5C]" }
          ].map((step, idx) => (
            <motion.div 
              key={idx}
              variants={fadeIn}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white/60 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg border border-gray-100 transition-all cursor-default group"
            >
              <div className={`w-20 h-20 mx-auto ${step.gradient} text-white rounded-full flex items-center justify-center mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#1F5E2A]">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;