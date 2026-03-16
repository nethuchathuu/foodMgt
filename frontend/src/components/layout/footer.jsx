import React from 'react';
import { Heart, MapPin, Phone, Mail, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
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
            <li><Link to="/about" className="hover:text-white hover:underline transition-all">About Us</Link></li>
            <li><Link to="/offers" className="hover:text-white hover:underline transition-all">Food Offers</Link></li>
            <li><Link to="/donate" className="hover:text-white hover:underline transition-all">Request Donation</Link></li>
            <li><Link to="/faq" className="hover:text-white hover:underline transition-all">FAQ</Link></li>
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
  );
};

export default Footer;