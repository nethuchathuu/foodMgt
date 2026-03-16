import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Clock } from 'lucide-react';

const FoodOffers = () => {
  return (
    <div className="pt-20 bg-[#F8F8F6] min-h-screen text-[#1F5E2A]">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
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
    </div>
  );
};

export default FoodOffers;