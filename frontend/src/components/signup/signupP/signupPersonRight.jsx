import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, User, MapPin, Calendar, CreditCard, Mail, Phone, CheckCircle2, Camera, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const SignupPersonRight = () => {
  const [activeInput, setActiveInput] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col bg-white overflow-y-auto w-full md:w-7/12 h-full relative z-10 p-8 md:p-12">
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg mx-auto"
      >
        <div className="mb-4 text-center sm:text-left">
          <h2 className="text-3xl font-extrabold text-[#1F5E2A] mb-2 flex items-center sm:justify-start justify-center">Create Account</h2>
          <p className="text-[#A7D63B] font-semibold">Join as a Food Receiver</p>
        </div>

        {/* Profile Picture Upload Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className={`w-28 h-28 rounded-full border-4 border-[#A7D63B] overflow-hidden flex items-center justify-center cursor-pointer relative shadow-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(167,214,59,0.5)] ${!imagePreview ? 'border-dashed bg-[#F8F8F6]' : 'bg-white'}`}
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <>
                  <motion.img 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={imagePreview} 
                    alt="Profile Preview" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-semibold">Change</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-[#D8C3A5] group-hover:text-[#A7D63B] transition-colors">
                  <Camera size={32} className="mb-1" />
                </div>
              )}
            </motion.div>
            
            {/* Edit Icon Badge */}
            <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full border border-[#D8C3A5]/30 shadow-sm text-[#1F5E2A] pointer-events-none z-10">
              <Edit2 size={14} strokeWidth={2.5} />
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
          <p className="text-[#1F5E2A]/60 text-sm mt-3 font-medium">Add a profile picture (optional)</p>
        </div>

        {/* Subtle divider */}
        <div className="h-px w-full bg-gradient-to-r from-[#D8C3A5]/30 via-[#D8C3A5]/10 to-transparent mb-8"></div>

        {/* Form Slide-Up Animation Wrapper */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2, duration: 0.5 }}
        >
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              <InputField 
                label="Full Name" 
                icon={User} 
                placeholder="Enter full name" 
                fullWidth={true}
                isActive={activeInput === "Full Name"}
                onFocus={() => setActiveInput("Full Name")}
                onBlur={() => setActiveInput(null)}
              />
              <InputField 
                label="Home Address" 
                icon={MapPin} 
                type="textarea" 
                placeholder="Full residential address" 
                fullWidth={true} 
                isActive={activeInput === "Home Address"}
                onFocus={() => setActiveInput("Home Address")}
                onBlur={() => setActiveInput(null)}
              />
              <InputField 
                label="Date of Birth" 
                icon={Calendar} 
                type="date" 
                isActive={activeInput === "Date of Birth"}
                onFocus={() => setActiveInput("Date of Birth")}
                onBlur={() => setActiveInput(null)}
              />
              <InputField 
                label="NIC" 
                icon={CreditCard} 
                placeholder="National ID number" 
                isActive={activeInput === "NIC"}
                onFocus={() => setActiveInput("NIC")}
                onBlur={() => setActiveInput(null)}
              />
              
              {/* Gender Radio Pills */}
              <div className="col-span-1 md:col-span-2 mb-4">
                <label className="text-sm font-semibold text-[#1F5E2A] mb-3 pl-1 block">Gender</label>
                <div className="flex gap-4">
                  {['Male', 'Female'].map((gender) => (
                    <motion.button
                      key={gender}
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedGender(gender)}
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold border transition-all duration-300 flex items-center justify-center gap-2 ${
                        selectedGender === gender 
                          ? 'bg-[#A7D63B] text-[#1F5E2A] border-[#A7D63B] shadow-sm' 
                          : 'bg-white text-[#1F5E2A]/70 border-[#D8C3A5]/50 hover:border-[#9BC7D8] hover:bg-[#9BC7D8]/10'
                      }`}
                    >
                      {selectedGender === gender && <CheckCircle2 size={16} />}
                      {gender}
                    </motion.button>
                  ))}
                </div>
              </div>

              <InputField 
                label="Email" 
                icon={Mail} 
                type="email" 
                placeholder="user@example.com" 
                isActive={activeInput === "Email"}
                onFocus={() => setActiveInput("Email")}
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
            </div>

            <div className="mt-8 pt-6 border-t border-[#D8C3A5]/30 flex justify-end gap-4">
              <motion.button
                type="button"
                onClick={() => navigate(-1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center bg-white hover:bg-gray-50 text-[#1F5E2A] px-8 py-4 rounded-xl font-bold border border-[#D8C3A5]/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <ArrowLeft className="mr-2" size={20} /> Back
              </motion.button>

              <motion.button
                type="button"
                onClick={() => navigate('/signup/signupAfter')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center bg-[#A7D63B] hover:bg-[#D67A5C] text-[#1F5E2A] hover:text-white px-8 py-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300"
              >
                Next <ArrowRight className="ml-2" size={20} />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPersonRight;
