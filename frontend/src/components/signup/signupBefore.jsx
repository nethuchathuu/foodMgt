import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Heart, User, Building, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignupBefore = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [requesterType, setRequesterType] = useState(null);
  const navigate = useNavigate();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-[#E5E9E0] relative overflow-hidden flex flex-col items-center pt-28 pb-6 px-4 sm:px-6 lg:px-8 font-sans text-[#1F5E2A]">
      {/* Background Floating Blobs */}
      <div className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-[#8BA832] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob"></div>
      <div className="absolute top-[15%] right-[-5%] w-96 h-96 bg-[#6898A8] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-[#C87D65] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>

      <div className="max-w-5xl w-full relative z-10 flex-grow flex flex-col justify-start">
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-[#1A4D23]">Join FoodShare</h1>
          <p className="text-lg text-[#3A5D42]">Choose how you want to use the platform to make an impact</p>
        </motion.div>

        {/* Primary Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-stretch">
          
          {/* Restaurant / Hotel Owner Card */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03, y: -5 }}
            onClick={() => {
              setSelectedRole('restaurant');
              setRequesterType(null); // Clear requester selections
            }}
            className={`cursor-pointer rounded-3xl p-6 flex flex-col relative overflow-hidden transition-all duration-300 ${
              selectedRole === 'restaurant' 
                ? 'bg-[#EAF0E2] ring-2 ring-[#4A7252] shadow-xl shadow-[#4A7252]/20' 
                : 'bg-white/90 shadow-lg hover:shadow-xl border border-[#D5DCCC]'
            }`}
          >
            {/* Decorative Card Background elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#9BC7D8]/20 rounded-full blur-2xl"></div>
            
            <div className="flex flex-col h-full relative z-10">
              <div className="w-12 h-12 bg-[#2C6E3B] rounded-xl flex items-center justify-center shadow-md text-white mb-4 transform -rotate-6">
                <Utensils size={24} />
              </div>
              <h2 className="text-2xl font-extrabold mb-2 text-[#1F5E2A]">Food Provider</h2>
              <p className="text-[#3A5D42] mb-4 font-medium text-sm leading-relaxed flex-grow">
                Restaurants & Hotels: Turn your surplus into shared smiles. Register to offer perfectly good meals to your community.
              </p>
              
              <ul className="space-y-2 mb-6 text-sm">
                {['List surplus food deals effortlessly', 'Dramatically reduce operational food waste', 'Contribute meals to local charities'].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[#2C6E3B] font-medium">
                    <CheckCircle size={18} className="text-[#A7D63B] mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl font-bold text-white shadow-md text-sm bg-[#C87D65] hover:bg-[#B36850] shadow-[#C87D65]/40 flex items-center justify-center gap-2 transition-colors"
                  onClick={() => navigate('/signup/restaurant')}
                >
                  Register as Provider <ArrowRight size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Food Requester Card */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.03, y: -5 }}
            onClick={() => setSelectedRole('requester')}
            className={`cursor-pointer rounded-3xl p-6 flex flex-col relative overflow-hidden transition-all duration-300 ${
              selectedRole === 'requester' 
                ? 'bg-[#EAF0E2] ring-2 ring-[#4A7252] shadow-xl shadow-[#4A7252]/20' 
                : 'bg-white/90 shadow-lg hover:shadow-xl border border-[#D5DCCC]'
            }`}
          >
            {/* Decorative Card Background elements */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#E9A38E]/20 rounded-full blur-2xl"></div>

            <div className="flex flex-col h-full relative z-10">
              <div className="w-12 h-12 bg-[#2C6E3B] rounded-xl flex items-center justify-center shadow-md text-white mb-4 transform rotate-6">
                <Heart size={24} />
              </div>
              <h2 className="text-2xl font-extrabold mb-2 text-[#1F5E2A]">Food Receiver</h2>
              <p className="text-[#3A5D42] mb-4 font-medium text-sm leading-relaxed flex-grow">
                Individuals & Organizations: Rescue delicious food at a discount or request essential meal donations.
              </p>
              
              <ul className="space-y-2 mb-6 text-sm">
                {['Rescue high-quality surplus meals', 'Save significantly on your food budget', 'Request dedicated food donations for orgs'].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[#2C6E3B] font-medium">
                    <CheckCircle size={18} className="text-[#A7D63B] mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-2">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl font-bold text-[#1A4D23] shadow-md text-sm bg-[#A7D63B] hover:bg-[#92C226] shadow-[#A7D63B]/40 flex items-center justify-center gap-2 transition-colors"
                >
                  Continue as Receiver <ArrowRight size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Secondary Selection UI (For Requester) */}
        <AnimatePresence>
          {selectedRole === 'requester' && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={scaleUp}
              className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-[#D5DCCC] max-w-3xl mx-auto w-full mb-8 relative z-20"
            >
              <h3 className="text-xl font-extrabold mb-4 text-center text-[#1A4D23]">Select Receiver Type</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                
                {/* Personal User Option */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setRequesterType('personal')}
                  className={`cursor-pointer rounded-2xl p-4 flex flex-col items-center text-center transition-all border-2 shadow-sm ${
                    requesterType === 'personal' 
                      ? 'border-[#8BA832] bg-[#EAF0E2] shadow-[#8BA832]/20' 
                      : 'border-[#E5E9E0] hover:border-[#8BA832]/50 bg-white hover:shadow-md'
                  }`}
                >
                  <div className="bg-[#8BA832]/20 text-[#2C6E3B] p-3 rounded-full mb-3">
                    <User size={24} />
                  </div>
                  <h4 className="text-lg font-bold mb-1 text-[#1A4D23]">Individual Saver</h4>
                  <p className="text-[#3A5D42] text-xs font-medium">Order discounted, perfectly good meals for yourself or your family.</p>
                </motion.div>

                {/* Organization Option */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setRequesterType('organization')}
                  className={`cursor-pointer rounded-2xl p-4 flex flex-col items-center text-center transition-all border-2 shadow-sm ${
                    requesterType === 'organization' 
                      ? 'border-[#6898A8] bg-[#EAF0E2] shadow-[#6898A8]/20' 
                      : 'border-[#E5E9E0] hover:border-[#6898A8]/50 bg-white hover:shadow-md'
                  }`}
                >
                  <div className="bg-[#6898A8]/20 text-[#2C6E3B] p-3 rounded-full mb-3">
                    <Building size={24} />
                  </div>
                  <h4 className="text-lg font-bold mb-1 text-[#1A4D23]">Community Organization</h4>
                  <p className="text-[#3A5D42] text-xs font-medium">Request food donations and order discounted meals to support charities or community groups.</p>
                </motion.div>

              </div>

              <div className="flex justify-center mt-2">
                <motion.button
                  disabled={!requesterType}
                  whileHover={requesterType ? { scale: 1.05 } : {}}
                  className={`px-10 py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 text-sm ${
                    requesterType 
                      ? 'bg-[#2C6E3B] shadow-md shadow-[#2C6E3B]/30 hover:bg-[#1A4D23]' 
                      : 'bg-[#D5DCCC] cursor-not-allowed text-[#8F9B88]'
                  }`}
                >
                  Proceed to Sign Up <ArrowRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default SignupBefore;
