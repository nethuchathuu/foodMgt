import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button 
        className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-lg">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-[#A7D63B]">
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-[#F8F8F6]"
          >
            <div className="px-6 py-5 border-t border-gray-100 text-gray-700">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq = () => {
  return (
    <div className="pt-20 bg-[#F8F8F6] min-h-screen text-[#1F5E2A]">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F8F6]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Got questions? We've got answers.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "Is the food safe to eat?", a: "Absolutely! Restaurants only post food that is perfectly safe and delicious, just items that they wouldn't be able to sell the next day." },
              { q: "How do donations work?", a: "Registered charitable organizations can request free food from participating restaurants through the platform. Restaurants approve and prepare the hand-off." },
              { q: "Can anyone buy the discounted food?", a: "Yes, anyone can sign up as a personal user, browse local deals, and reserve food for pickup at a fraction of the regular cost." }
            ].map((faq, idx) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
