import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, IdCard, MapPin, Mail, Phone, UploadCloud, Info, CheckCircle2 } from 'lucide-react';

const InputField = ({ label, icon: Icon, type = "text", placeholder, fullWidth = false, isActive, onFocus, onBlur }) => {
  return (
    <div className={`flex flex-col mb-4 relative ${fullWidth ? 'col-span-1 md:col-span-2' : ''}`}>
      <label className="text-sm font-semibold text-[#1F5E2A] mb-2 pl-1">{label}</label>
      <div className={`relative flex items-center bg-[#F8F8F6] rounded-xl overflow-hidden transition-all duration-300 ${isActive ? 'ring-2 ring-[#A7D63B] shadow-[0_0_15px_rgba(167,214,59,0.3)] bg-white' : 'border border-[#D8C3A5]/60 hover:border-[#9BC7D8]'}`}>
        <div className="pl-4 pr-3 text-[#D8C3A5]">
          <Icon size={18} className={isActive ? 'text-[#1F5E2A]' : ''} />
        </div>
        {type === "textarea" ? (
          <textarea 
            className="w-full bg-transparent py-3 pr-4 outline-none text-[#1F5E2A] placeholder-[#D8C3A5] resize-none h-24"
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur} 
          />
        ) : (
          <input 
            type={type} 
            className="w-full bg-transparent py-3 pr-4 outline-none text-[#1F5E2A] placeholder-[#D8C3A5]"
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )}
        <AnimatePresence>
          {isActive && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute right-4 text-[#A7D63B]"
            >
              <CheckCircle2 size={18} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SignupForm = () => {
  const [activeInput, setActiveInput] = useState(null);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const fileInputRef = useRef(null);
  
  const mealOptions = [
    "Breakfast", "Lunch", "Dinner", 
    "Snacks", "Desserts", "Beverages", 
    "Buffet Meals", "Family Packs", "One-Day Meals"
  ];

  const handleMealToggle = (meal) => {
    setSelectedMeals(prev => 
      prev.includes(meal) 
        ? prev.filter(m => m !== meal)
        : [...prev, meal]
    );
  };

  return (
    <form className="w-full" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
        <InputField 
          label="Restaurant Name" 
          icon={Building2} 
          placeholder="Enter restaurant name" 
          isActive={activeInput === "Restaurant Name"}
          onFocus={() => setActiveInput("Restaurant Name")}
          onBlur={() => setActiveInput(null)}
        />
        <InputField 
          label="Registered ID" 
          icon={IdCard} 
          placeholder="Business registration number" 
          isActive={activeInput === "Registered ID"}
          onFocus={() => setActiveInput("Registered ID")}
          onBlur={() => setActiveInput(null)}
        />
        <InputField 
          label="Address" 
          icon={MapPin} 
          type="textarea" 
          placeholder="Full address" 
          fullWidth={true} 
          isActive={activeInput === "Address"}
          onFocus={() => setActiveInput("Address")}
          onBlur={() => setActiveInput(null)}
        />
        <InputField 
          label="Restaurant Email" 
          icon={Mail} 
          type="email" 
          placeholder="example@restaurant.com" 
          isActive={activeInput === "Restaurant Email"}
          onFocus={() => setActiveInput("Restaurant Email")}
          onBlur={() => setActiveInput(null)}
        />
        <InputField 
          label="Phone Number" 
          icon={Phone} 
          type="tel" 
          placeholder="+1 (555) 000-0000" 
          isActive={activeInput === "Phone Number"}
          onFocus={() => setActiveInput("Phone Number")}
          onBlur={() => setActiveInput(null)}
        />
        
        {/* Upload documents */}
        <div className="col-span-1 md:col-span-2 mb-6">
          <label className="text-sm font-semibold text-[#1F5E2A] mb-2 pl-1 block">Upload Documents</label>
          <div 
            className="w-full border-2 border-dashed border-[#D8C3A5] hover:border-[#E9A38E] rounded-2xl bg-[#F8F8F6] hover:bg-[#F8F8F6]/50 p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group"
            onClick={() => fileInputRef.current?.click()}
          >
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:shadow-md transition-shadow group-hover:bg-[#E9A38E]/20"
            >
              <UploadCloud size={32} className="text-[#9BC7D8] group-hover:text-[#D67A5C]" />
            </motion.div>
            <p className="text-[#1F5E2A] font-medium mb-1">Click to upload or drag and drop</p>
            <p className="text-xs text-[#D8C3A5]">PDF, JPG, PNG (Max 5MB)</p>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*,application/pdf" multiple />
          </div>
        </div>
        
        <InputField 
          label="Description" 
          icon={Info} 
          type="textarea" 
          placeholder="Tell us about your restaurant..." 
          fullWidth={true} 
          isActive={activeInput === "Description"}
          onFocus={() => setActiveInput("Description")}
          onBlur={() => setActiveInput(null)}
        />

        {/* Meal selection */}
        <div className="col-span-1 md:col-span-2 mt-4">
          <label className="text-sm font-semibold text-[#1F5E2A] mb-3 pl-1 block">Meal Types Available</label>
          <div className="flex flex-wrap gap-3">
            {mealOptions.map((meal) => {
              const isSelected = selectedMeals.includes(meal);
              return (
                <motion.button
                  key={meal}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMealToggle(meal)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors shadow-sm ${
                    isSelected 
                      ? 'bg-[#A7D63B] text-[#1F5E2A] border-[#A7D63B]' 
                      : 'bg-white text-[#1F5E2A]/70 border-[#D8C3A5]/50 hover:border-[#9BC7D8] hover:bg-[#9BC7D8]/10'
                  }`}
                >
                  {meal}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
