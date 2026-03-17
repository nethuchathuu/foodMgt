import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle, ShieldCheck } from 'lucide-react';
import bgImage from '../../../assets/backgroundRestSignup.jpg';

const SignupRestOwnerLeft = () => {
  return (
    <div 
      className="relative h-full flex flex-col justify-center items-center p-12 overflow-hidden text-center z-0"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Semi-transparent overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[#1F5E2A]/60 z-[-2]"></div>

      {/* Animated gradient blobs in background using Theme Colors */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#A7D63B] rounded-full mix-blend-multiply filter blur-3xl opacity-40 z-[-1]"
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-[#E9A38E] rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-[-1]"
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          x: [-20, 10, -20],
          y: [20, -10, 20]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[40%] right-[-20%] w-56 h-56 bg-[#9BC7D8] rounded-full mix-blend-multiply filter blur-3xl opacity-20 z-[-1]"
      />

      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 text-white flex flex-col items-center"
      >
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 p-5 bg-white/10 rounded-3xl backdrop-blur-md shadow-[0_8px_32px_0_rgba(167,214,59,0.2)] border border-white/20"
        >
          <UserCircle size={48} className="text-[#E9A38E]" strokeWidth={1.5} />
        </motion.div>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight">
          Tell Us About You 
        </h1>
        
        <p className="text-xl mb-10 text-[#D8C3A5] leading-relaxed font-light">
          We just need a few details about the restaurant owner to complete your profile.
        </p>
        
        <div className="p-6 bg-[#1F5E2A]/40 backdrop-blur-md rounded-2xl border border-[#D8C3A5]/20 shadow-lg relative overflow-hidden flex items-start gap-4 text-left">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#E9A38E]"></div>
          <ShieldCheck size={28} className="text-[#A7D63B] flex-shrink-0 mt-1" />
          <p className="text-[#9BC7D8] italic font-medium leading-snug">
            "Your information is safe and helps build trust with customers in the FoodShare community."
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupRestOwnerLeft;
