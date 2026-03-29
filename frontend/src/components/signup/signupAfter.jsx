import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const SignupAfter = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    const name = location.state?.name || 'User';
    const role = location.state?.role || 'requester_person'; // default
    const profileData = location.state?.profileData || {};

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', role);

      // Separate file properties out of regular JSON block
      const documentsList = profileData.documents || [];
      const profileImageFile = profileData.owner?.profilePicture;

      // Clean profileData of raw File objects to prevent JSON stringify issues
      const cleanProfile = { ...profileData };
      delete cleanProfile.documents;
      if (cleanProfile.owner && cleanProfile.owner.profilePicture) {
        delete cleanProfile.owner.profilePicture;
      }
      formData.append('profileData', JSON.stringify(cleanProfile));

      // Append files through Multer format
      if (documentsList.length > 0) {
        documentsList.forEach(file => {
           formData.append('documents', file);
        });
      }
      if (profileImageFile) {
         formData.append('profileImage', profileImageFile);
      }

      const response = await fetch('http://localhost:5000/api/auth/register', { 
        method: 'POST',
        // Note: Do not set Content-Type mapping when using FormData (browser sets boundary automatically)
        body: formData
      });

      if (response.ok) {
        navigate('/signin');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Signup failed');
      }
    } catch (err) {
      setError('Server error.');
    }
  };

  // Simple password strength calculator
  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length > 5) score += 1;
    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strength = calculateStrength(password);
  
  const getStrengthColor = () => {
    if (strength === 0) return 'bg-gray-200';
    if (strength <= 2) return 'bg-red-400';
    if (strength <= 4) return 'bg-yellow-400';
    return 'bg-[#A7D63B]';
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8 mt-16 bg-[#F8F8F6]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full p-8 md:p-10 rounded-3xl shadow-2xl bg-white"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#1F5E2A]">
            Create Your Account 
          </h2>
          <p className="text-gray-500 mt-2">Secure your account to start using FoodShare</p>
        </div>

        <form className="space-y-5 mt-6" onSubmit={handleSignup}>
          {error && <div className="text-red-500 text-sm text-center font-medium">{error}</div>}
          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#1F5E2A] ml-1">Email Address</label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-gray-400">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#A7D63B] hover:border-[#A7D63B] outline-none transition text-gray-800"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#1F5E2A] ml-1">Password</label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-gray-400">
                <Lock size={18} />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Create a password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#A7D63B] hover:border-[#A7D63B] outline-none transition text-gray-800"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-400 hover:text-[#1F5E2A] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <div className="pt-2 px-1">
                <div className="flex h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(strength / 5) * 100}%` }}
                    className={`h-full ${getStrengthColor()} transition-all duration-300`}
                  />
                </div>
                <p className="text-xs text-right mt-1 text-gray-400">
                  {strength <= 2 ? 'Weak' : strength <= 4 ? 'Good' : 'Strong'}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#1F5E2A] ml-1">Confirm Password</label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-gray-400">
                <Lock size={18} />
              </div>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Re-enter password" 
                className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#A7D63B] hover:border-[#A7D63B] outline-none transition text-gray-800"
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 text-gray-400 hover:text-[#1F5E2A] transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-xl font-bold bg-[#A7D63B] text-[#1F5E2A] shadow-lg hover:bg-[#C8E66A] transition-all duration-300"
            >
              Sign Up
            </motion.button>
          </div>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-sm text-gray-400 font-medium">or continue with</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl border border-gray-200 flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-300 font-semibold text-gray-700"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path fill="#4285F4" d="M -3.264,51.509 C -3.264,50.719 -3.334,49.969 -3.454,49.239 L -14.754,49.239 L -14.754,53.749 L -8.284,53.749 C -8.574,55.229 -9.424,56.479 -10.684,57.329 L -10.684,60.329 L -6.824,60.329 C -4.564,58.239 -3.264,55.159 -3.264,51.509 Z"/>
              <path fill="#34A853" d="M -14.754,63.239 C -11.514,63.239 -8.804,62.159 -6.824,60.329 L -10.684,57.329 C -11.764,58.049 -13.134,58.489 -14.754,58.489 C -17.884,58.489 -20.534,56.379 -21.484,53.529 L -25.464,53.529 L -25.464,56.619 C -23.494,60.539 -19.444,63.239 -14.754,63.239 Z"/>
              <path fill="#FBBC05" d="M -21.484,53.529 C -21.734,52.809 -21.864,52.039 -21.864,51.239 C -21.864,50.439 -21.724,49.669 -21.484,48.949 L -21.484,45.859 L -25.464,45.859 C -26.284,47.479 -26.754,49.299 -26.754,51.239 C -26.754,53.179 -26.284,54.999 -25.464,56.619 L -21.484,53.529 Z"/>
              <path fill="#EA4335" d="M -14.754,43.989 C -12.984,43.989 -11.404,44.599 -10.154,45.789 L -6.734,41.939 C -8.804,40.009 -11.514,38.989 -14.754,38.989 C -19.444,38.989 -23.494,41.689 -25.464,45.859 L -21.484,48.949 C -20.534,46.099 -17.884,43.989 -14.754,43.989 Z"/>
            </g>
          </svg>
          Sign up with Google
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SignupAfter;
