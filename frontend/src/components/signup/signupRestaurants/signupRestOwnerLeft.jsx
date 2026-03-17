import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle, ShieldCheck } from 'lucide-react';
import bgImage from '../../../assets/backgroundRestSignup2.jpg';

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
      <div className="absolute inset-0 bg-[#F8F8F6]/35 z-[-2]"></div>

      {/* Soft pastel blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#E9A38E] rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-[-1]"
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-[#9BC7D8] rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-[-1]"
      />

      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 p-5 bg-white/60 rounded-3xl backdrop-blur-md shadow-[0_8px_32px_0_rgba(216,195,165,0.4)] border border-white"
        >
          <UserCircle size={64} className="text-[#1F5E2A]" strokeWidth={1.5} />
        </motion.div>
        
        <h1 className="text-4xl lg:text-4xl font-extrabold mb-6 leading-tight tracking-tight text-[#1F5E2A]">
          Tell Us About You <span className="text-[#D67A5C]">👤</span>
        </h1>
        
        <p className="text-lg mb-10 text-gray-600 leading-relaxed font-medium">
          We just need a few details about the restaurant owner to complete your profile.
        </p>
        
        <div className="p-6 bg-white/50 backdrop-blur-md rounded-2xl border border-white shadow-sm relative overflow-hidden flex items-start gap-4 text-left">
          <ShieldCheck size={28} className="text-[#A7D63B] flex-shrink-0 mt-1" />
          <p className="text-[#D67A5C] font-semibold leading-snug">
            Your information is safe and helps build trust with customers in the FoodShare community.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupRestOwnerLeft;
