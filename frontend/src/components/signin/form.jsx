import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Hardcoded mock credentials
    const restaurantUser = { email: 'restaurant@test.com', password: 'password123' };
    const requesterUser = { email: 'requester@test.com', password: 'password123..' };

    if (email === restaurantUser.email && password === restaurantUser.password) {
      navigate('/restaurant-dashboard');
    } else if (email === requesterUser.email && password === requesterUser.password) {
      navigate('/receiver/home');
    } else {
      setError('Invalid email or password. Please use standard mock credentials.');
    }
  };

  return (
    <div>
      <div className='text-center mb-6'>
        <h2 className='text-3xl font-extrabold text-[#1F5E2A]'>Welcome Back</h2>
        <p className='text-gray-500 mt-2'>Sign in to continue</p>
        <div className="mt-2 text-xs text-gray-400 bg-gray-50 p-2 rounded">
          <p><strong>Restaurant:</strong> restaurant@test.com / password123</p>
          <p><strong>Requester:</strong> requester@test.com / password123..</p>
        </div>
      </div>

      <form className='space-y-5' onSubmit={handleLogin}>
        {error && <div className="text-red-500 text-sm text-center font-medium">{error}</div>}
        {/* Email */}
        <div>
          <label className='text-sm font-semibold text-[#1F5E2A] ml-1'>Email</label>
          <div className='relative flex items-center mt-1'>
            <Mail className='absolute left-4 text-gray-400' size={18} />
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#A7D63B] outline-none'
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className='text-sm font-semibold text-[#1F5E2A] ml-1'>Password</label>
          <div className='relative flex items-center mt-1'>
            <Lock className='absolute left-4 text-gray-400' size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password'
              className='w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#A7D63B] outline-none'
              required
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-4 text-gray-400 hover:text-gray-600 transition-colors'
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className='flex justify-end mt-2'>
            <button type="button" className='text-sm text-[#A7D63B] hover:text-[#1F5E2A] font-medium transition-colors'>
              Forgot password?
            </button>
          </div>
        </div>

        {/* Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='w-full py-3 rounded-xl font-bold bg-[#A7D63B] text-[#1F5E2A] shadow-lg hover:bg-[#C8E66A] transition-all'
        >
          Sign In
        </motion.button>
      </form>

      {/* Divider */}
      <div className='my-6 flex items-center gap-3'>
        <div className='flex-1 h-px bg-gray-200'></div>
        <span className='text-sm text-gray-400'>or</span>
        <div className='flex-1 h-px bg-gray-200'></div>
      </div>

      {/* Google */}
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className='w-full py-3 rounded-xl border border-gray-200 flex items-center justify-center gap-3 hover:bg-gray-50 font-semibold text-gray-700 transition-colors'
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Sign in with Google
      </motion.button>

      <div className="mt-8 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button onClick={() => navigate('/signup')} className="text-[#A7D63B] hover:text-[#1F5E2A] font-bold transition-colors">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Form;
