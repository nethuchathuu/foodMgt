import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Calendar, Droplet, Hash, MapPin, ArrowLeft } from 'lucide-react';
import SidebarUser from '../slidebarUser';
import NavbarUser from '../navbarUser';

export default function ProfileIndividual() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id;

        const res = await axios.get(`http://localhost:5000/api/person/${userId}`);
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>
        <SidebarUser />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <NavbarUser />
          <main className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 font-bold">Loading profile...</p>
          </main>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>
        <SidebarUser />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <NavbarUser />
          <main className="flex-1 flex items-center justify-center">
            <p className="text-red-500 font-bold text-lg">Unable to load profile details.</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>
      <SidebarUser />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <NavbarUser />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            
            <Link
              to="/receiver/home"
              className="inline-flex items-center gap-2 mb-6 font-medium hover:underline transition-all"    
              style={{ color: '#1F5E2A' }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Link>

            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#1F5E2A' }}>My Profile</h1>
              <p className="text-gray-600 font-medium">Manage your personal details</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-8" style={{ borderColor: '#D8C3A5' }}>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10 pb-8 border-b border-gray-100">
                
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 bg-gray-100 flex shrink-0 items-center justify-center shadow-md animate-fade-in-up" style={{ borderColor: '#E9A38E' }}>
                  {profile.profilePicture ? (
                    <img src={profile.profilePicture.startsWith('http') ? profile.profilePicture : `http://localhost:5000/${profile.profilePicture}`} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-gray-400" />
                  )}
                </div>

                <div className="flex-1 text-center md:text-left animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  <h2 className="text-2xl font-black mb-2" style={{ color: '#1F5E2A' }}>{profile.fullName || 'User Name'}</h2>
                  <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2">
                    <Mail className="w-4 h-4" /> {profile.email || 'Not provided'}
                  </p>
                  <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                    <Phone className="w-4 h-4" /> {profile.phoneNumber || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Home Address
                  </label>
                  <p className="text-lg font-medium text-gray-700 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                    {profile.homeAddress || 'Not provided'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Hash className="w-4 h-4" /> NIC Number
                  </label>
                  <p className="text-lg font-medium tracking-wide text-gray-700 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                    {profile.nic || 'Not provided'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Date of Birth
                  </label>
                  <p className="text-lg font-medium text-gray-700 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                    {profile.dob ? new Date(profile.dob).toLocaleDateString() : 'Not provided'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Droplet className="w-4 h-4" /> Gender
                  </label>
                  <p className="text-lg font-medium text-gray-700 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 capitalize">
                    {profile.gender || 'Not provided'}
                  </p>
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}