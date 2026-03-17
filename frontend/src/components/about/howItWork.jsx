import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Heart, Utensils, Clock, ChevronDown, 
  Leaf, Info, MapPin, Phone, Mail, Instagram, Twitter, Facebook 
} from 'lucide-react';



const LandContent = () => {
  // Counters State
  const [mealsSaved, setMealsSaved] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMealsSaved(prev => (prev < 1250 ? prev + 5 : 1250));
    }, 10);
    return () => clearInterval(interval);
  }, []);
    return (
        <div className="pt-20 bg-[#F8F8F6] overflow-hidden text-[#1F5E2A]">
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
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
                        { title: "Restaurants Post", desc: "Restaurants list surplus, high-quality meals before expiry at a discount.", icon: <Utensils size={40} />, color: "bg-[#9BC7D8]" },
                        { title: "Customers Grab Deals", desc: "Users buy the delicious food at a significantly reduced price.", icon: <ShoppingBag size={40} />, color: "bg-[#A7D63B]" },
                        { title: "Donations Initiated", desc: "Organizations request unsold food as donations from generous restaurants.", icon: <Heart size={40} />, color: "bg-[#E9A38E]" }
                        ].map((step, idx) => (
                        <motion.div 
                            key={idx}
                            variants={fadeIn}
                            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            className="bg-[#F8F8F6] rounded-2xl p-8 text-center shadow-sm border border-gray-100 transition-all cursor-default"
                        >
                            <div className={`w-20 h-20 mx-auto ${step.color} text-white rounded-full flex items-center justify-center mb-6 shadow-lg`}>
                            {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                            <p className="text-gray-600">{step.desc}</p>
                        </motion.div>
                        ))}
                    </motion.div>
                    </div>
                </section>
        </div>
    );
};

export default howItWork;

