import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Heart, Utensils, Clock, ChevronDown, 
  Leaf, Info, MapPin, Phone, Mail, Instagram, Twitter, Facebook 
} from 'lucide-react';
import foodMgtLogoPng from '../../assets/foodMgtLogo.png';
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpeg";
import img3 from "../../assets/img3.jpeg";
import img4 from "../../assets/img4.jpg";
import img5 from "../../assets/img5.jpg";
import img6 from "../../assets/img6.jpg";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const LandContent = () => {
  // Counters State
  const [mealsSaved, setMealsSaved] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMealsSaved(prev => (prev < 1250 ? prev + 5 : 1250));
    }, 10);
    return () => clearInterval(interval);
  }, []);

  const images = [img1, img2, img3, img4, img5, img6];

  return (
    <div className="pt-20 bg-[#F8F8F6] overflow-hidden text-[#1F5E2A]">
      
      {/* Hero Section */}
      <section id="about" className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#C8E66A] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#9BC7D8] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-[#E9A38E] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Reduce Food Waste. <br/>
              <span className="text-[#A7D63B]">Share Meals.</span> <br/>
              Help Communities.
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              Discover amazing deals on surplus food from local restaurants. Enjoy delicious meals at a fraction of the cost, or request food donations for your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-8 py-4 bg-[#A7D63B] text-[#1F5E2A] rounded-2xl font-bold shadow-lg shadow-[#A7D63B]/30 hover:bg-[#C8E66A]"
              >
                Find Food Deals
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-8 py-4 bg-[#E9A38E] text-white rounded-2xl font-bold shadow-lg shadow-[#E9A38E]/30 hover:bg-[#D67A5C]"
              >
                Request Donation
              </motion.button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full aspect-square bg-[#D8C3A5]/20 rounded-full flex items-center justify-center border-[10px] border-white/50 shadow-2xl">

                {/* Rotating Image Wheel */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    className="absolute w-full h-full"
                >
                    {images.map((img, index) => {
                    const angle = (index * 360) / images.length; // equal spacing

                    return (
                        <div
                        key={index}
                        className="absolute top-1/2 left-1/2 -mt-14 -ml-14"
                        style={{
                            transform: `rotate(${angle}deg) translate(220px) rotate(-${angle}deg)`
                        }}
                        >
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                                className="w-28 h-28"
                            >
                                <img
                                    src={img}
                                    alt={`food-${index}`}
                                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl"
                                />
                            </motion.div>
                        </div>
                    );
                    })}
                </motion.div>

                {/* Floating Icons */}
                <motion.div 
                    animate={{ y: [0, -20, 0] }} 
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute top-10 left-10 bg-white p-4 rounded-2xl shadow-xl text-[#D67A5C]"
                >
                    <Utensils size={32} />
                </motion.div>

                <motion.div 
                    animate={{ y: [0, 20, 0] }} 
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    className="absolute bottom-10 right-10 bg-white p-4 rounded-2xl shadow-xl text-[#9BC7D8]"
                >
                    <ShoppingBag size={32} />
                </motion.div>

                {/* Center Logo */}
                <motion.div 
                    animate={{ scale: [1, 1.05, 1] }} 
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    <img 
                    src={foodMgtLogoPng}
                    alt="Food"
                    className="w-60 h-60 object-cover rounded-full"
                    />
                </motion.div>

                </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to make a difference</p>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { title: "Restaurants Post", desc: "Restaurants list surplus, high-quality meals before expiry at a discount.", icon: <Utensils size={40} />, color: "bg-[#9BC7D8]" },
              { title: "Customers Grab Deals", desc: "Users buy the delicious food at a significantly reduced price.", icon: <ShoppingBag size={40} />, color: "bg-[#A7D63B]" },
              { title: "Donations Initiated", desc: "Organizations request unsold food as donations from generous restaurants.", icon: <Heart size={40} />, color: "bg-[#E9A38E]" }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                variants={fadeIn}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-[#F8F8F6] rounded-2xl p-8 text-center shadow-sm border border-gray-100 transition-all cursor-default"
              >
                <div className={`w-20 h-20 mx-auto ${step.color} text-white rounded-full flex items-center justify-center mb-6 shadow-lg`}>
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Food Offers Showcase */}
      <section id="offers" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Fresh Deals Near You</h2>
              <p className="text-xl text-gray-600">Save delicious food and your money</p>
            </div>
            <button className="hidden md:block font-bold text-[#1F5E2A] hover:text-[#A7D63B] transition-colors">
              View All Offers &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Vegetable Noodles", restaurant: "Green Bites Cafe", price: "$3.50", oldPrice: "$10.00", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400", time: "Expires in 2h" },
              { name: "Assorted Pastries", restaurant: "Morning Bakery", price: "$2.00", oldPrice: "$8.00", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400", time: "Expires in 1h" },
              { name: "Rice & Curry Prep", restaurant: "Spice Route", price: "$4.00", oldPrice: "$12.00", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400", time: "Expires in 3h" },
              { name: "Fresh Salad Bowl", restaurant: "Healthy Life", price: "$3.00", oldPrice: "$9.00", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400", time: "Expires in 45m" }
            ].map((food, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md group border border-gray-100"
              >
                <div className="h-48 overflow-hidden relative">
                  <span className="absolute top-3 left-3 z-10 bg-[#A7D63B] text-[#1F5E2A] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Leaf size={12} /> Save Food
                  </span>
                  <img src={food.img} alt={food.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold truncate pr-2">{food.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{food.restaurant}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-extrabold text-[#D67A5C]">{food.price}</span>
                      <span className="text-sm text-gray-400 line-through ml-2">{food.oldPrice}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 gap-1 bg-gray-100 px-2 py-1 rounded">
                      <Clock size={12} />
                      {food.time}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-[#E9A38E] rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-xl shadow-[#E9A38E]/20">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full rounded-bl-[100px] -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D67A5C] rounded-full rounded-tr-[80px] -ml-5 -mb-5"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Food Belongs In Bellies, Not Bins.</h2>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Are you an organization looking to support your community? Connect with generous restaurants willing to donate their surplus, perfectly good food to those in need.
              </p>
              <button className="px-8 py-4 bg-white text-[#D67A5C] rounded-2xl font-bold shadow-lg hover:bg-[#F8F8F6] transition-colors inline-flex items-center gap-2">
                <Heart size={20} fill="#D67A5C" /> Request Donation
              </button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="w-full max-w-sm aspect-square bg-[#F8F8F6] rounded-full flex flex-col items-center justify-center p-8 shadow-2xl relative">
                 <Heart size={80} className="text-[#E9A38E] mb-4" />
                 <h3 className="text-2xl font-bold text-[#1F5E2A] text-center">Together We Care</h3>
                 
                 {/* Mini decorative icons */}
                 <div className="absolute top-10 right-10 text-[#9BC7D8]"><Leaf size={30} /></div>
                 <div className="absolute bottom-16 left-10 text-[#A7D63B]"><Utensils size={40} /></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-[#1F5E2A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="py-4"
            >
              <div className="text-6xl font-extrabold mb-2 text-[#A7D63B]">{mealsSaved}+</div>
              <div className="text-xl opacity-80">Meals Saved</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="py-4"
            >
              <div className="text-6xl font-extrabold mb-2 text-[#9BC7D8]">120+</div>
              <div className="text-xl opacity-80">Restaurants Joined</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="py-4"
            >
              <div className="text-6xl font-extrabold mb-2 text-[#E9A38E]">850+</div>
              <div className="text-xl opacity-80">Donations Delivered</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Voices of Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { role: "Restaurant Owner", name: "Chef Mario", quote: "This platform changed how we handle surplus. We waste zero food now, and connect with our community!", bg: "bg-[#D8C3A5]/20" },
              { role: "Customer", name: "Sarah L.", quote: "I love getting high-quality cafe meals for half the price! It's good for my wallet and the planet.", bg: "bg-[#9BC7D8]/20" },
              { role: "Organization", name: "Hope Shelter", quote: "The donation feature is incredible. We’ve been able to provide warm, restaurant-quality meals to so many families.", bg: "bg-[#A7D63B]/20" }
            ].map((test, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className={`p-8 rounded-[2rem] ${test.bg} relative`}
              >
                <div className="text-4xl text-[#1F5E2A] opacity-20 font-serif absolute top-4 left-6">"</div>
                <p className="text-lg italic text-gray-700 mb-6 relative z-10 pt-4">"{test.quote}"</p>
                <div>
                  <h4 className="font-bold text-[#1F5E2A] text-xl">{test.name}</h4>
                  <p className="text-sm text-gray-500 font-medium">{test.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F8F6]">
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

      {/* Footer */}
      <footer className="bg-[#1F5E2A] text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Heart fill="#A7D63B" className="text-[#A7D63B]" />
              <span className="font-bold text-2xl">FoodShare</span>
            </div>
            <p className="opacity-80 mb-6">Turning surplus food into shared smiles. Join the movement against food waste today!</p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#A7D63B] transition-colors hover:text-[#1F5E2A]">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#A7D63B] transition-colors hover:text-[#1F5E2A]">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#A7D63B] transition-colors hover:text-[#1F5E2A]">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#A7D63B]">Quick Links</h4>
            <ul className="space-y-3 opacity-80">
              <li><a href="#about" className="hover:text-white hover:underline transition-all">About Us</a></li>
              <li><a href="#offers" className="hover:text-white hover:underline transition-all">Food Offers</a></li>
              <li><a href="#donate" className="hover:text-white hover:underline transition-all">Request Donation</a></li>
              <li><a href="#faq" className="hover:text-white hover:underline transition-all">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#A7D63B]">Accounts</h4>
            <ul className="space-y-3 opacity-80">
              <li><a href="#" className="hover:text-white hover:underline transition-all">Restaurant Login</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-all">User Sign Up</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-all">Organization Portal</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-all">Admin Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-[#A7D63B]">Contact Us</h4>
            <ul className="space-y-4 opacity-80">
              <li className="flex items-center gap-3"><MapPin size={18} /> 123 Green Ave, Eco City</li>
              <li className="flex items-center gap-3"><Phone size={18} /> +1 (555) 123-4567</li>
              <li className="flex items-center gap-3"><Mail size={18} /> hello@foodshare.org</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-70">
          <p>&copy; 2026 FoodShare Management System. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

// FAQ Item Component with Animation
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

export default LandContent;