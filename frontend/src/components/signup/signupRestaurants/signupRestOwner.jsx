import React from 'react';
import { motion } from 'framer-motion';
import SignupRestOwnerLeft from './signupRestOwnerLeft';
import SignupRestOwnerRight from './signupRestOwnerRight';

const SignupRestOwner = () => {
  return (
    <div className="min-h-screen bg-[#F8F8F6] pt-32 pb-12 flex items-center justify-center px-4 md:px-8 relative overflow-hidden">
      {/* Subtle Background Elements using Pastel Theme Accents */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#9BC7D8] rounded-full mix-blend-multiply filter blur-[120px] opacity-40"></div>
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-[#E9A38E] rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
      <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-[#D8C3A5] rounded-full mix-blend-multiply filter blur-[100px] opacity-30"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl min-h-[80vh] bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(31,94,42,0.1)] overflow-hidden grid grid-cols-1 lg:grid-cols-5 relative z-10 border border-[#D8C3A5]/30"
      >
        <div className="lg:col-span-2 hidden md:block">
          <SignupRestOwnerLeft />
        </div>
        <div className="lg:col-span-3">
          <SignupRestOwnerRight />
        </div>
      </motion.div>
    </div>
  );
};

export default SignupRestOwner;
