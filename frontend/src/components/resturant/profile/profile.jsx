import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut } from 'lucide-react';
import RestaurantDetails from './restaurentdetails';
import OwnerDetails from './ownerDetails';

const Profile = () => {
  const [activeSection, setActiveSection] = useState('restaurant'); // 'restaurant' or 'owner'
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage / tokens upon logout
    localStorage.removeItem('token');
    localStorage.removeItem('userRole'); // Assuming role is stored; adjust if different
    // Navigate to the sign-in page
    navigate('/signin');
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black/20 backdrop-blur-md px-4 sm:px-6">
      {/* Decorative Blob Shapes */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#C8E66A]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob pointer-events-none"></div>
      <div className="absolute top-0 right-20 w-72 h-72 bg-[#9BC7D8]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-[#E9A38E]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 pointer-events-none"></div>

      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/70 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(31,94,42,0.1)] p-6 sm:p-8 transition-all z-10 relative">
        
        {/* Header / Back Button */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#1F5E2A] hover:bg-white/60 px-4 py-2 rounded-xl transition-all shadow-sm border border-white/40 backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold">Back</span>
          </button>
          <h2 className="text-2xl font-black text-[#1F5E2A] tracking-wider uppercase">Profile Overview</h2>
          <div className="w-24"></div> {/* Spacer to keep the title centered */}
        </div>

        {/* Navbar Section inside Card */}
        <div className="flex gap-4 mb-8 bg-white/30 p-2 rounded-2xl backdrop-blur-md border border-white/50">
          <button
            onClick={() => setActiveSection('restaurant')}
            className={`flex-1 py-3 text-sm uppercase tracking-widest rounded-xl font-bold text-center transition-all duration-300 ${
              activeSection === 'restaurant' 
                ? 'bgGradientToR from-[#A7D63B] to-[#C8E66A] bg-[#A7D63B] text-[#1F5E2A] shadow-md shadow-[#A7D63B]/30' 
                : 'text-[#1F5E2A]/70 hover:bg-white/50 hover:text-[#1F5E2A]'
            }`}
          >
            Restaurant Details
          </button>
          <button
            onClick={() => setActiveSection('owner')}
            className={`flex-1 py-3 text-sm uppercase tracking-widest rounded-xl font-bold text-center transition-all duration-300 ${
              activeSection === 'owner' 
                ? 'bgGradientToR from-[#A7D63B] to-[#C8E66A] bg-[#A7D63B] text-[#1F5E2A] shadow-md shadow-[#A7D63B]/30' 
                : 'text-[#1F5E2A]/70 hover:bg-white/50 hover:text-[#1F5E2A]'
            }`}
          >
            Owner Details
          </button>
        </div>

        {/* Section Content */}
        <div className="mb-6">
          {activeSection === 'restaurant' && <RestaurantDetails />}
          {activeSection === 'owner' && <OwnerDetails />}
        </div>
        
        {/* Logout Button */}
        <div className="pt-6 border-t border-[#1F5E2A]/10 flex justify-center mt-6">
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3 bg-red-50/80 text-red-600 hover:bg-red-100 hover:text-red-700 hover:shadow-lg hover:-translate-y-1 rounded-xl font-bold transition-all border border-red-100 backdrop-blur-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
