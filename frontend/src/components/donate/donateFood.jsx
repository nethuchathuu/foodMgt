import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Leaf, Utensils, ShieldCheck, Clock, Users, ArrowRight } from 'lucide-react';

const avatars = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4"
];

const DonateFood = () => {
  const [clicked, setClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleDonateClick = () => {
    setClicked(true);
    // Optional: play sound here
    setTimeout(() => setClicked(false), 3000);
  };

  return (
    <div className="relative min-h-[85vh] flex items-center py-28 px-6 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#E9A38E] via-[#D67A5C] to-[#3F7A4C]" />
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 z-0 bg-black/25" />

      {/* Floating Icons Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [-20, -100], x: [-10, 10], opacity: [0, 0.2, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute top-1/4 left-1/4"
        >
          <Heart size={40} color="#ffffff" />
        </motion.div>
        <motion.div 
          animate={{ y: [20, -80], x: [10, -20], opacity: [0, 0.2, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear", delay: 2 }}
          className="absolute top-2/3 right-1/4"
        >
          <Heart size={30} color="#ffffff" />
        </motion.div>
        <motion.div 
          animate={{ x: [-20, 100], y: [-10, 20], opacity: [0, 0.2, 0], rotate: [0, 90] }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear", delay: 1 }}
          className="absolute top-1/3 right-1/3"
        >
          <Leaf size={50} color="#A7D63B" />
        </motion.div>
      </div>

      {/* Live Impact Banner */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div 
          animate={{ boxShadow: ['0px 0px 0px rgba(255,255,255,0)', '0px 0px 15px rgba(255,255,255,0.4)', '0px 0px 0px rgba(255,255,255,0)'] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="bg-white/20 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 flex items-center justify-center gap-2"
        >
          <span className="text-white font-medium text-sm md:text-base whitespace-nowrap">
            ✨ 12 meals donated in the last hour
          </span>
        </motion.div>
      </motion.div>

      {/* Blur Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#A7D63B] opacity-20 blur-[140px] pointer-events-none rounded-full z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#9BC7D8] opacity-20 blur-[160px] pointer-events-none rounded-full z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col pt-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white relative z-20"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-md">
              Don’t Let <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A7D63B] to-white">Good Food</span> Go to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#A7D63B]">Waste</span> 
            </h2>
            
            <p className="text-lg md:text-xl opacity-90 max-w-xl mb-4 leading-relaxed">
              Every meal you save can feed someone in need. Join hands with restaurants and make a real difference in your community today.
            </p>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-lg italic text-white/80 max-w-xl mb-6 leading-relaxed border-l-4 border-[#A7D63B] pl-4"
            >
              “Yesterday, a single donation helped feed 15 families in Colombo.”
            </motion.p>

            <div className="flex flex-col mb-10 mt-8 space-y-2">
              <motion.div 
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-[#FFD166] font-bold text-sm flex items-center gap-2"
              >
                🔥 High demand right now
              </motion.div>
              
              <div className="flex flex-wrap gap-4 items-center relative">
                <AnimatePresence>
                  {clicked && (
                    <motion.div
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2, opacity: 0, y: -50 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none flex items-center justify-center z-50 text-3xl"
                    >
                      ❤️
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button 
                  onClick={handleDonateClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-gradient-to-r from-[#A7D63B] to-[#3F7A4C] text-white rounded-2xl font-bold shadow-[0_0_20px_rgba(167,214,59,0.5)] hover:shadow-[0_0_30px_rgba(167,214,59,0.8)] transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
                >
                  {clicked ? (
                    <span>❤️ Thank you for caring!</span>
                  ) : (
                    <>
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                        <Heart size={24} className="fill-white text-white" />
                      </motion.div>
                      Donate with Heart ❤️
                    </>
                  )}
                </motion.button>
                
                <button 
                  onClick={() => navigate('/signup')}
                  className="px-10 py-5 border-2 border-white text-white rounded-2xl font-bold hover:bg-white hover:text-[#D67A5C] transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  Join the Kindness <ArrowRight size={20} />
                </button>
              </div>
              <span className="text-white/70 text-sm ml-2 mt-1">From your heart to theirs ❤️</span>
            </div>

            

          </motion.div>

          {/* Right Side: Visual Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center lg:justify-end relative"
          >
            <motion.div 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-full max-w-md bg-white/15 backdrop-blur-[20px] border border-white/20 rounded-3xl p-10 shadow-2xl relative z-10"
            >
               {/* Hover Effect - Floating Hearts */}
              <AnimatePresence>
                {isHovered && (
                   <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -30 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 1 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 text-2xl text-pink-400"
                   >
                     💖💕
                   </motion.div>
                )}
              </AnimatePresence>

              {/* Decorations */}
              <motion.div whileHover={{ rotate: 15 }} className="absolute -top-6 -right-6 bg-white/10 p-4 rounded-full backdrop-blur-sm border border-white/20 cursor-pointer shadow-lg">
                <Leaf size={32} className="text-[#A7D63B]" />
              </motion.div>
              <motion.div whileHover={{ rotate: -15 }} className="absolute -bottom-6 -left-6 bg-white/10 p-4 rounded-full backdrop-blur-sm border border-white/20 cursor-pointer shadow-lg">
                <Utensils size={32} className="text-[#9BC7D8]" />
              </motion.div>

              <div className="flex flex-col items-center">
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }} 
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]"
                >
                  <Heart size={100} className="text-white fill-white/20" />
                </motion.div>
                
                <h3 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-md">
                  Together We Care
                </h3>

                <div className="w-full space-y-4">
                  <div className="bg-black/20 rounded-2xl p-5 flex justify-between items-center border border-white/10 hover:bg-black/30 transition-colors cursor-default backdrop-blur-md">
                    <span className="text-white/90 font-medium text-lg">Meals Saved</span>
                    <span className="text-3xl font-extrabold text-[#A7D63B]">1250+</span>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-5 flex justify-between items-center border border-white/10 hover:bg-black/30 transition-colors cursor-default backdrop-blur-md">
                    <span className="text-white/90 font-medium text-lg">People Helped</span>
                    <span className="text-3xl font-extrabold text-[#9BC7D8]">850+</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Trust Signals Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 w-full flex flex-wrap justify-center gap-4 lg:gap-8 z-20"
        >
           <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
             <ShieldCheck size={24} color="#A7D63B" />
             <span className="text-white font-medium text-sm sm:text-base">Verified Restaurants</span>
           </div>
           
           <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
             <Clock size={24} color="#9BC7D8" />
             <span className="text-white font-medium text-sm sm:text-base">Real-time Matching</span>
           </div>

           <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
             <Users size={24} color="#E9A38E" />
             <span className="text-white font-medium text-sm sm:text-base">100% Community Impact</span>
           </div>
        </motion.div>

      </div>
    </div>
  );
};

export default DonateFood;