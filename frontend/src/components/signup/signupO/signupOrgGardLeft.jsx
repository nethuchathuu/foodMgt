import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, ShieldCheck, Lock, Link } from 'lucide-react';

const SignupOrgGardLeft = () => {
  return (
    <div className='md:w-5/12 bg-gradient-to-br from-[#9BC7D8] via-[#8BA832]/60 to-[#A7D63B] text-[#1F5E2A] flex flex-col justify-between p-12 relative overflow-hidden'>
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/20 rounded-full mix-blend-overlay filter blur-[40px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-[#1F5E2A]/10 rounded-full mix-blend-overlay filter blur-[40px]"></div>

      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="w-16 h-16 bg-white/40 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white/50">
            <UserCheck size={32} className="text-[#1F5E2A]" />
          </div>
          <h1 className='text-4xl md:text-5xl font-extrabold mb-4 leading-tight'>
            Organization <br/>
            <span className="text-white drop-shadow-md">Representative</span>
          </h1>
          <p className='text-lg font-medium opacity-90 leading-relaxed max-w-md'>
            Provide details of the responsible person managing food operations.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative z-10"
        >
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-lg mb-8">
            <ul className='space-y-4'>
              <li className='flex items-start gap-4'>
                <div className="mt-1 bg-[#1F5E2A] text-[#A7D63B] rounded-full p-1 shadow-md flex-shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1F5E2A]">Ensure Accountability</h3>
                  <p className="text-sm opacity-80 font-medium">Verify interactions and maintain organizational trust.</p>
                </div>
              </li>
              <li className='flex items-start gap-4'>
                <div className="mt-1 bg-[#1F5E2A] text-[#A7D63B] rounded-full p-1 shadow-md flex-shrink-0">
                  <Link size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1F5E2A]">Secure Communication</h3>
                  <p className="text-sm opacity-80 font-medium">Be the primary contact for updates and coordination.</p>
                </div>
              </li>
              <li className='flex items-start gap-4'>
                <div className="mt-1 bg-[#1F5E2A] text-[#A7D63B] rounded-full p-1 shadow-md flex-shrink-0">
                  <Lock size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1F5E2A]">Verified Access</h3>
                  <p className="text-sm opacity-80 font-medium">Safeguard your organization's data and operations.</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 mt-auto"
      >
        <p className="text-sm font-semibold opacity-80">
          "Your dedication makes a real difference."
        </p>
      </motion.div>
    </div>
  );
};

export default SignupOrgGardLeft;
