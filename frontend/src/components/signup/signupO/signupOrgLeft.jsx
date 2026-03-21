import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Leaf, ArrowUpRight } from 'lucide-react';

const SignupOrgLeft = () => {
  return (
    <div className='md:w-5/12 bg-gradient-to-br from-[#E9A38E] via-[#D8C3A5]/50 to-[#C8E66A] text-[#1F5E2A] flex flex-col justify-between p-12 relative overflow-hidden'>
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
            <Building2 size={32} className="text-[#1F5E2A]" />
          </div>
          <h1 className='text-4xl md:text-5xl font-extrabold mb-4 leading-tight'>
            Organization <br/>
            <span className="text-white drop-shadow-md">Signup</span>
          </h1>
          <p className='text-lg font-medium opacity-90 leading-relaxed max-w-md'>
            Register your organization to distribute surplus food or receive essential meals efficiently.
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
                  <Users size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1F5E2A]">Support Communities</h3>
                  <p className="text-sm opacity-80 font-medium">Provide vital sustenance to those who need it most.</p>
                </div>
              </li>
              <li className='flex items-start gap-4'>
                <div className="mt-1 bg-[#1F5E2A] text-[#A7D63B] rounded-full p-1 shadow-md flex-shrink-0">
                  <ArrowUpRight size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1F5E2A]">Partner with Providers</h3>
                  <p className="text-sm opacity-80 font-medium">Connect directly with restaurants and food services.</p>
                </div>
              </li>
              <li className='flex items-start gap-4'>
                <div className="mt-1 bg-[#1F5E2A] text-[#A7D63B] rounded-full p-1 shadow-md flex-shrink-0">
                  <Leaf size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1F5E2A]">Reduce Food Waste</h3>
                  <p className="text-sm opacity-80 font-medium">Drive a sustainable, zero-waste future together.</p>
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
          "Empowering organizations to make a tangible impact."
        </p>
      </motion.div>
    </div>
  );
};

export default SignupOrgLeft;
