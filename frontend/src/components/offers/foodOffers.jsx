import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Clock, Search, MapPin, Info, Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FoodOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/food-offers");
        setOffers(response.data);
      } catch (error) {
        console.error("Failed to fetch food offers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const handleAction = () => {
    navigate("/signup-before");
  };

  const getCountdown = (expiryDate) => {
    if (!expiryDate) return "No Expiry";
    const expiry = new Date(expiryDate).getTime();
    const now = new Date().getTime();
    const diff = expiry - now;

    if (diff <= 0) return "Expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  const isNearExpiry = (expiryDate) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate).getTime();
    const now = new Date().getTime();
    const diff = expiry - now;
    return diff > 0 && diff <= 60 * 60 * 1000; // 1 hour in ms
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
  };

  return (
    <div className="relative pt-20 bg-[#F8F8F6] min-h-screen text-[#1F5E2A] overflow-hidden">
      {/* Blur Gradient Backgrounds */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#A7D63B] opacity-10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#9BC7D8] opacity-10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E9A38E] opacity-10 blur-[120px] pointer-events-none rounded-full" />

      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">🔥 Latest Food Offers</h2>
              <p className="text-xl text-gray-600">Grab delicious meals before they’re gone!</p>
            </div>
            <button className="hidden md:block font-bold text-[#1F5E2A] hover:text-[#A7D63B] transition-colors">
              View All Offers &rarr;
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="bg-white/50 backdrop-blur-sm rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : offers.length === 0 ? (
             <div className="py-16 text-center text-gray-500 bg-white/70 backdrop-blur-md rounded-2xl shadow-sm">
               <div className="text-5xl mb-4">🍽️</div>
               <h3 className="text-2xl font-bold mb-2 text-[#1F5E2A]">No food offers available right now</h3>
               <p>Check back later for fresh deals.</p>
             </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 xl:gap-8">
              {offers.map((food, idx) => (
                <motion.div 
                  key={idx}
                  custom={idx}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  whileHover={{ scale: 1.04, boxShadow: "0 25px 40px rgba(0,0,0,0.12)" }}
                  className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(33.333%-1.333rem)] bg-white/70 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl group border border-white/40 flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10 pointer-events-none" />

                    {food.discountPercentage > 0 && (
                      <span className="absolute top-3 left-3 z-20 bg-gradient-to-r from-green-500 to-[#1F5E2A] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <Leaf size={12} /> {food.discountPercentage}% OFF
                      </span>
                    )}
                    
                    {isNearExpiry(food.expiryTime) && (
                      <span className="absolute top-3 right-3 z-20 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <Clock size={12} /> Expiry Warning
                      </span>
                    )}

                    <img 
                      src={food.image ? food.image : "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400"} 
                      alt={food.foodName} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 bg-gray-100" 
                    />
                  </div>

                  <div className="p-5 flex-1 relative z-20 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold truncate pr-2 text-[#1F5E2A]">{food.foodName}</h3>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                      <MapPin size={14} className="flex-shrink-0" />
                      <span className="truncate">{food.restaurant?.name || 'Restaurant'} • {food.restaurant?.location || 'Location'}</span>
                    </p>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex flex-col">
                        {food.discountPrice ? (
                           <>
                             <span className="text-2xl font-extrabold text-[#D67A5C]">Rs. {food.discountPrice}</span>
                             <span className="text-sm text-gray-400 line-through">Rs. {food.price}</span>
                           </>
                        ) : (
                          <span className="text-2xl font-extrabold text-[#D67A5C]">Rs. {food.price}</span>
                        )}
                      </div>
                      <div className="flex items-center text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-md shadow-sm">
                        <Clock size={12} className="mr-1" />
                        {getCountdown(food.expiryTime)}
                      </div>
                    </div>

                    <div className="mt-auto flex flex-wrap gap-2 justify-center border-t border-gray-200/50 pt-4">
                       <button
                         onClick={handleAction}
                         className="flex-1 flex justify-center items-center gap-1 py-2 px-2 rounded-xl font-semibold transition-all duration-300 border-2 border-[#1F5E2A] text-[#1F5E2A] hover:bg-[#1F5E2A] hover:text-white"
                       >
                         <Heart className="w-4 h-4" />
                         Request
                       </button>

                       <button
                         onClick={handleAction}
                         className="flex-1 flex justify-center items-center gap-1 py-2 px-2 rounded-xl font-bold transition-all duration-300 bg-gradient-to-r from-[#A7D63B] to-[#1F5E2A] text-white hover:scale-105 shadow-md shadow-[#A7D63B]/50"
                       >
                         <ShoppingCart className="w-4 h-4" />
                         Order
                       </button>

                       <button
                         onClick={handleAction}
                         className="flex-1 flex justify-center items-center gap-1 py-2 px-2 rounded-xl font-medium transition-all duration-300 text-gray-500 hover:text-[#1F5E2A] hover:underline"
                       >
                         <Info className="w-4 h-4" />
                         Details
                       </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FoodOffers;