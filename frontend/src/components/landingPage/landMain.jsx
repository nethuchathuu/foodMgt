import React from 'react';
import LandNav from './landNav';
import LandContent from './landContent';

const LandMain = () => {
  return (
    <div className="font-sans bg-[#F8F8F6] min-h-screen text-[#1F5E2A] selection:bg-[#A7D63B] selection:text-[#1F5E2A] scroll-smooth">
      <LandNav />
      <LandContent />
    </div>
  );
};

export default LandMain;