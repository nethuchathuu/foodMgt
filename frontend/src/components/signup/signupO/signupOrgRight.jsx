import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Building2, MapPin, FileText, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InputField = ({ label, icon: Icon, type = "text", placeholder, fullWidth = false, isActive, onFocus, onBlur, value, onChange }) => {
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
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur} 
          />
        ) : (
          <input 
            type={type} 
            className="w-full bg-transparent py-3 pr-4 outline-none text-[#1F5E2A] placeholder-[#D8C3A5]"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
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

const SignupOrgRight = () => {
  const [activeInput, setActiveInput] = useState(null);
  const [orgName, setOrgName] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/signup-org-guardian', { state: { name: orgName || 'Organization', role: 'requester' } });
  };

  return (
    <div className="flex flex-col bg-white overflow-y-auto w-full md:w-7/12 h-full relative z-10 p-8 md:p-12">
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg mx-auto"
      >
        {/* Step indicator */}
        <div className="flex items-center mb-6 text-sm font-bold text-[#D67A5C]">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E9A38E] text-white mr-3 shadow-sm border border-[#D67A5C]/20">
            1
          </span>
          Step 1 of 3: Organization Details
        </div>

        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-extrabold text-[#1F5E2A] mb-2">Create Account</h2>
          <p className="text-[#A7D63B] font-semibold">Join as a Food Receiver (Organization)</p>
        </div>

        {/* Form Slide-Up Animation Wrapper */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2, duration: 0.5 }}
        >
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              <InputField 
                label="Organization Name" 
                icon={Building2} 
                placeholder="Enter organization name" 
                fullWidth={true}                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}                isActive={activeInput === "Organization Name"}
                onFocus={() => setActiveInput("Organization Name")}
                onBlur={() => setActiveInput(null)}
              />
              <InputField 
                label="Organization Address" 
                icon={MapPin} 
                type="textarea" 
                placeholder="Full operational address" 
                fullWidth={true} 
                isActive={activeInput === "Organization Address"}
                onFocus={() => setActiveInput("Organization Address")}
                onBlur={() => setActiveInput(null)}
              />
              <InputField 
                label="Registration Number" 
                icon={FileText} 
                placeholder="Official registration ID" 
                fullWidth={true}
                isActive={activeInput === "Registration Number"}
                onFocus={() => setActiveInput("Registration Number")}
                onBlur={() => setActiveInput(null)}
              />
              <InputField 
                label="Official Email" 
                icon={Mail} 
                type="email" 
                placeholder="contact@org.org" 
                isActive={activeInput === "Email"}
                onFocus={() => setActiveInput("Email")}
                onBlur={() => setActiveInput(null)}
              />
              <InputField 
                label="Contact Number" 
                icon={Phone} 
                type="tel" 
                placeholder="+1 (555) 000-0000" 
                isActive={activeInput === "Contact Number"}
                onFocus={() => setActiveInput("Contact Number")}
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
                onClick={handleNext}
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

export default SignupOrgRight;
