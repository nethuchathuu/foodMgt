import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import foodMgtLogoPng from '../../assets/foodMgtLogo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'About', href: '/about' },
    { name: 'Food Offers', href: '/offers' },
    { name: 'Donate Food', href: '/donate' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#153E1E]/85 backdrop-blur-md shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex-shrink-0 flex items-center gap-0.5 cursor-pointer -ml-25">
            <motion.img 
              src={foodMgtLogoPng} 
              alt="System Logo" 
              className="w-32 h-32 object-contain"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            <span className="font-bold text-3xl text-white">Second<span className="text-[#A7D63B]">Serve</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative text-white/90 hover:text-[#C8E66A] font-medium group px-1 py-2 ${isActive ? '!text-[#A7D63B]' : ''}`}
                >
                  {item.name}
                  <span className={`absolute left-0 bottom-0 h-0.5 bg-[#A7D63B] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              );
            })}
            
            <div className="flex items-center space-x-4 ml-4">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)" }}
                onClick={() => navigate('/signin')}
                className="px-5 py-2 text-white border-2 border-white rounded-full font-bold transition-colors hover:bg-white hover:text-[#153E1E] hover:shadow-lg"
              >
                Sign In
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(167, 214, 59, 0.4)" }}
                onClick={() => navigate('/signup')}
                className="px-5 py-2 bg-[#A7D63B] text-[#153E1E] rounded-full font-bold transition-colors hover:bg-[#C8E66A] hover:shadow-lg"
              >
                Sign Up
              </motion.button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#A7D63B] focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#153E1E] shadow-lg absolute w-full overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-white font-medium hover:bg-[#1F5E2A] rounded-md border-b border-[#2F7A3A] last:border-0"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 mt-4 px-3 pt-2">
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/signin');
                  }}
                  className="w-full px-5 py-2 text-white border-2 border-white rounded-full font-bold hover:bg-white hover:text-[#153E1E] hover:shadow-lg transition-colors"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/signup');
                  }}
                  className="w-full px-5 py-2 bg-[#A7D63B] text-[#153E1E] rounded-full font-bold hover:bg-[#C8E66A] hover:shadow-lg transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;