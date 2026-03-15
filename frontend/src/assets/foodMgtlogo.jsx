import React from 'react';
import { motion } from 'framer-motion';

const FoodMgtLogo = ({ className = "w-10 h-10" }) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} text-[#A7D63B]`}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    >
      <path d="M12 2v20" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </motion.svg>
  );
};

export default FoodMgtLogo;