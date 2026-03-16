import React from 'react';
import HowItWorks from './howItWorks';

const About = () => {
  return (
    <div className="pt-20 bg-[#F8F8F6] min-h-screen text-[#1F5E2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl font-extrabold mb-6">About Us</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Our mission is to reduce food waste by connecting generous restaurants with communities in need, while also providing users with amazing deals on high-quality surplus food.
        </p>
      </div>
      <HowItWorks />
    </div>
  );
};

export default About;
