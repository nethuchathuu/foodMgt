import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SignupForm from './signupForm';
import { ArrowRight, UtensilsCrossed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignupRestRight = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white overflow-y-auto w-full h-full relative z-10 p-8 md:p-12 shadow-inner">
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg mx-auto"
      >
        <div className="flex items-center mb-6 text-sm font-bold text-[#1a84ae]">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#9BC7D8] text-[#1F5E2A] mr-3 shadow-sm border border-[#D67A5C]/20">
            1
          </span>
          Step 1 of 3: Basic Info
        </div>

        <h2 className="text-3xl font-extrabold text-[#1F5E2A] mb-2 flex items-center">
          Restaurant Registration
        </h2>
        <p className="text-[#A7D63B] mb-8 font-semibold">
          Fill in your details to start sharing food
        </p>

        <SignupForm />

        <div className="mt-8 pt-6 border-t border-[#D8C3A5]/30 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/signup/restaurant/owner')}
            className="flex items-center bg-[#A7D63B] hover:bg-[#D67A5C] text-[#1F5E2A] hover:text-white px-8 py-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Next Step <ArrowRight className="ml-2" size={20} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupRestRight;
