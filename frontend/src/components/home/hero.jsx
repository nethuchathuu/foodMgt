import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Utensils } from 'lucide-react';
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

const Hero = () => {
  const images = [img1, img2, img3, img4, img5, img6];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-[#F8F8F6] overflow-hidden text-[#1F5E2A]">
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
            Available across <span className="font-bold text-[#1F5E2A]">Colombo District</span>, discover amazing deals on surplus food from local restaurants. Enjoy delicious meals at a fraction of the cost, or request food donations for your community.
          </p>
          {/*<div className="flex flex-col sm:flex-row gap-4">
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
          </div>*/}
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
                  const angle = (index * 360) / images.length;

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
  );
};

export default Hero;