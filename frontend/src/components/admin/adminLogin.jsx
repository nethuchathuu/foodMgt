import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/admin');
      } else {
        setError(data.message || 'Invalid admin credentials');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center font-['Poppins']"
      style={{ backgroundColor: '#F0F9FF' }}
    >
      <div 
        className="w-full max-w-md p-8 bg-white"
        style={{ 
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
        }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold" style={{ color: '#0F172A' }}>Admin Portal</h2>
          <p className="mt-2" style={{ color: '#475569' }}>Sign in to manage the platform</p>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm rounded bg-red-50 text-red-600 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: '#0F172A' }}>
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} style={{ color: '#475569' }} />
              </div>
              <input
                type="text"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ 
                  borderRadius: '12px',
                  borderColor: '#CBD5E1'
                }}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: '#0F172A' }}>
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} style={{ color: '#475569' }} />
              </div>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ 
                  borderRadius: '12px',
                  borderColor: '#CBD5E1'
                }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white font-medium hover:opacity-90 transition-opacity"
            style={{ 
              backgroundColor: '#60A5FA',
              borderRadius: '12px'
            }}
          >
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
