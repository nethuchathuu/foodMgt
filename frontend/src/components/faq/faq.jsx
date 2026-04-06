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
              { q: "What is the main purpose of this platform?", a: "Our platform helps reduce food waste by connecting restaurants with individuals and organizations who can purchase discounted food or request donations in real time." },
              { q: "Who can use this system?", a: "Anyone can join! Restaurants can list surplus food, while individuals and organizations can browse, order, or request food donations." },
              { q: "How does food ordering work?", a: "Users can browse available food, select items, and place orders. Restaurants will then accept or reject the order and prepare it for pickup." },
              { q: "How does the donation request process work?", a: "Organizations or individuals can request available food marked for donation. Restaurants review and approve requests, then schedule pickup or delivery." },
              { q: "What happens when food reaches its expiry time?", a: "The system automatically detects expired food and moves it to wastage tracking. This helps restaurants monitor losses and reduce future waste." },
              { q: "Can restaurants track their food waste and losses?", a: "Yes! Restaurants can monitor daily wastage, view reasons for waste, and calculate financial loss to improve their operations." },
              { q: "Is there a benefit for restaurants to use this system?", a: "Definitely! Restaurants can reduce losses, earn from surplus food, improve sustainability, and build a positive brand image by supporting the community." }
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
