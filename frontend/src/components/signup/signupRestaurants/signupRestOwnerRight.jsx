import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, User, MapPin, Calendar, CreditCard, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GlassInput = ({ label, icon: Icon, type = "text", placeholder, fullWidth = false, isActive, onFocus, onBlur }) => {
  return (
    <div className={`flex flex-col mb-4 relative ${fullWidth ? 'col-span-1 md:col-span-2' : ''}`}>
      <label className="text-sm font-medium text-white/90 mb-2 pl-1">{label}</label>
      <div className={`relative flex items-center rounded-xl overflow-hidden transition-all duration-300 backdrop-blur-sm ${isActive ? 'bg-white/20 ring-2 ring-[#A7D63B] shadow-[0_0_15px_rgba(167,214,59,0.3)] border-transparent' : 'bg-white/10 border border-white/20 hover:border-white/40'}`}>
        <div className="pl-4 pr-3 text-white/50">
          <Icon size={18} className={isActive ? 'text-[#A7D63B]' : ''} />
        </div>
        {type === "textarea" ? (
          <textarea 
            className="w-full bg-transparent py-3 pr-4 outline-none text-white placeholder-white/40 resize-none h-24"
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur} 
          />
        ) : (
          <input 
            type={type} 
            className="w-full bg-transparent py-3 pr-4 outline-none text-white placeholder-white/40"
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

const SignupRestOwnerRight = () => {
  const [activeInput, setActiveInput] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-[#1F5E2A] overflow-y-auto w-full h-full relative z-10 p-8 md:p-12 shadow-inner text-white">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg mx-auto"
      >
        {/* Step indicator */}
        <div className="flex items-center mb-6 text-sm font-bold text-[#A7D63B]">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A7D63B] text-[#1F5E2A] mr-3 shadow-sm border border-[#C8E66A]/30">
            2
          </span>
          Step 2 of 3: Owner Details
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-2">Owner Details</h2>
            <p className="text-white/70 font-medium">Fill in your personal information</p>
          </div>
          {/* Avatar Icon Preview */}
          <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center flex-shrink-0 relative overflow-hidden backdrop-blur-md">
            <User size={32} className="text-white/50" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#A7D63B]/20 to-transparent opacity-50"></div>
          </div>
        </div>

        {/* Subtle divider */}
        <div className="h-px w-full bg-gradient-to-r from-white/20 via-white/10 to-transparent mb-8"></div>

        {/* Form Slide-Up Animation Wrapper */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2, duration: 0.5 }}
        >
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              <GlassInput 
                label="Owner Name" 
                icon={User} 
                placeholder="Enter full name" 
                fullWidth={true}
                isActive={activeInput === "Owner Name"}
                onFocus={() => setActiveInput("Owner Name")}
                onBlur={() => setActiveInput(null)}
              />
              <GlassInput 
                label="Home Address" 
                icon={MapPin} 
                type="textarea" 
                placeholder="Full residential address" 
                fullWidth={true} 
                isActive={activeInput === "Home Address"}
                onFocus={() => setActiveInput("Home Address")}
                onBlur={() => setActiveInput(null)}
              />
              <GlassInput 
                label="Date of Birth" 
                icon={Calendar} 
                type="date" 
                isActive={activeInput === "Date of Birth"}
                onFocus={() => setActiveInput("Date of Birth")}
                onBlur={() => setActiveInput(null)}
              />
              <GlassInput 
                label="NIC" 
                icon={CreditCard} 
                placeholder="National ID number" 
                isActive={activeInput === "NIC"}
                onFocus={() => setActiveInput("NIC")}
                onBlur={() => setActiveInput(null)}
              />
              
              {/* Gender Radio Pills */}
              <div className="col-span-1 md:col-span-2 mb-4">
                <label className="text-sm font-medium text-white/90 mb-3 pl-1 block">Gender</label>
                <div className="flex gap-4">
                  {['Male', 'Female'].map((gender) => (
                    <motion.button
                      key={gender}
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedGender(gender)}
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold border transition-all duration-300 flex items-center justify-center gap-2 ${
                        selectedGender === gender 
                          ? 'bg-[#A7D63B] text-[#1F5E2A] border-[#A7D63B] shadow-[0_0_15px_rgba(167,214,59,0.3)]' 
                          : 'bg-white/5 text-white/70 border-white/20 hover:bg-white/10 hover:border-white/40'
                      }`}
                    >
                      {selectedGender === gender && <CheckCircle2 size={16} />}
                      {gender}
                    </motion.button>
                  ))}
                </div>
              </div>

              <GlassInput 
                label="Email" 
                icon={Mail} 
                type="email" 
                placeholder="owner@example.com" 
                isActive={activeInput === "Email"}
                onFocus={() => setActiveInput("Email")}
                onBlur={() => setActiveInput(null)}
              />
              <GlassInput 
                label="Contact Number" 
                icon={Phone} 
                type="tel" 
                placeholder="+1 (555) 000-0000" 
                isActive={activeInput === "Contact Number"}
                onFocus={() => setActiveInput("Contact Number")}
                onBlur={() => setActiveInput(null)}
              />
            </div>

            <div className="mt-8 pt-4 flex gap-4">
              <motion.button
                type="button"
                onClick={() => navigate(-1)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-1/3 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white px-4 py-4 rounded-xl font-extrabold shadow-lg transition-all duration-300 border border-white/20"
              >
                <ArrowLeft className="mr-2" size={20} /> Back
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-2/3 flex items-center justify-center bg-[#A7D63B] hover:bg-[#C8E66A] text-[#1F5E2A] px-8 py-4 rounded-xl font-extrabold shadow-lg hover:shadow-[0_10px_20px_rgba(167,214,59,0.2)] transition-all duration-300"
              >
                Next Step <ArrowRight className="ml-2" size={20} />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupRestOwnerRight;
