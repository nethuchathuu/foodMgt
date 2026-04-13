import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Building2, UserCircle, MapPin, Mail, Phone, FileText, Calendar, ShieldCheck, Contact, ArrowLeft } from 'lucide-react';
import SidebarUser from '../slidebarUser';
import NavbarUser from '../navbarUser';

export default function ProfileOrganization() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const res = await axios.get('http://localhost:5000/api/organization/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data.organization);
      } catch (err) {
        console.error('Failed to fetch org profile:', err);
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
            <p className="text-gray-500 font-bold">Loading organization details...</p>
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
          <main className="flex-1 flex items-center justify-center text-center">
            <p className="text-red-500 font-bold text-lg">Unable to load organization details.<br/><span className="text-sm text-gray-500">Make sure this profile exists and you have access.</span></p>
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
          <div className="max-w-5xl mx-auto space-y-8">
            
            <div className="mb-2">
              <Link
                to="/receiver/home"
                className="inline-flex items-center gap-2 font-medium hover:underline transition-all"    
                style={{ color: '#1F5E2A' }}
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
              </Link>
            </div>

            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3" style={{ color: '#1F5E2A' }}>
                <Building2 className="w-8 h-8 opacity-80" /> My Organization
              </h1>
              <p className="text-gray-600 font-medium">Manage your organization and representative details</p>
            </div>

            {/* Top Org Card */}
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden p-8 animate-fade-in-up" style={{ borderColor: '#D8C3A5' }}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b pb-6 border-gray-100">
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-2xl bg-gray-50 border p-2 flex shrink-0 items-center justify-center shadow-sm" style={{ borderColor: '#D8C3A5' }}>
                    {profile.logo ? (
                      <img src={profile.logo.startsWith('http') ? profile.logo : `http://localhost:5000/${profile.logo}`} alt="Logo" className="w-full h-full object-contain rounded-xl" />
                    ) : (
                      <Building2 className="w-10 h-10 text-gray-300" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black mb-1" style={{ color: '#1F5E2A' }}>{profile.orgName || 'Organization Name'}</h2>
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-50 text-blue-800 border shadow-sm" style={{ borderColor: '#9BC7D8' }}>
                      Registered NGO
                    </span>
                  </div>
                </div>
              </div>

              {/* Organization Grid */}
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: '#D67A5C' }}>
                <ShieldCheck className="w-5 h-5 text-gray-400" /> Organization Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-300" /> Organization Address
                  </label>
                  <p className="text-gray-800 font-medium text-lg bg-gray-50 p-4 border border-gray-100 rounded-xl leading-relaxed">
                    {profile.orgAddress || 'Not provided'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-300" /> Registration Number
                  </label>
                  <p className="text-gray-800 font-mono font-medium text-lg bg-gray-50 p-4 border border-gray-100 rounded-xl">
                    {profile.regNumber || 'N/A'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-300" /> Official Email
                  </label>
                  <p className="text-gray-800 font-medium text-lg bg-gray-50 p-4 border border-gray-100 rounded-xl">
                    {profile.officialEmail || 'Not provided'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-300" /> Contact Number
                  </label>
                  <p className="text-gray-800 font-medium text-lg bg-gray-50 p-4 border border-gray-100 rounded-xl">
                    {profile.contactNumber || 'Not provided'}
                  </p>
                </div>

              </div>
            </div>

            {/* Representative Card */}
            {profile.representative && (
              <div className="bg-[#F8F8F6] rounded-2xl shadow-sm border border-dashed overflow-hidden p-8 animate-fade-in-up" style={{ borderColor: '#D8C3A5', animationDelay: '150ms' }}>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 pb-4 border-b border-gray-200" style={{ color: '#1F5E2A' }}>
                  <UserCircle className="w-6 h-6 text-gray-400" /> Representative (Owner) Details
                </h3>
  
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 bg-white flex shrink-0 items-center justify-center shadow-md object-center" style={{ borderColor: '#E9A38E' }}>
                    {profile.representative.profileImage ? (
                      <img src={profile.representative.profileImage.startsWith('http') ? profile.representative.profileImage : `http://localhost:5000/${profile.representative.profileImage}`} alt="Rep" className="w-full h-full object-cover" />
                    ) : (
                      <Contact className="w-10 h-10 text-gray-300" />
                    )}
                  </div>
  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 w-full">
                    <div>
                      <p className="text-sm font-bold text-gray-400 mb-1 uppercase tracking-wider">Full Name</p>
                      <p className="text-lg font-bold text-gray-800">{profile.representative.fullName || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-400 mb-1 uppercase tracking-wider">Gender</p>
                      <p className="text-lg font-medium text-gray-800 capitalize">{profile.representative.gender || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-400 mb-1 uppercase tracking-wider">NIC</p>
                      <p className="text-lg font-medium text-gray-800 tracking-wider">{(profile.representative.nic) || 'N/A'}</p>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mt-2">
                       <div>
                         <p className="text-sm font-bold text-gray-400 mb-1 flex items-center gap-2"><Mail className="w-4 h-4"/> Personal Email</p>
                         <p className="text-base font-semibold text-gray-700 truncate">{profile.representative.email || 'None'}</p>
                       </div>
                       <div>
                         <p className="text-sm font-bold text-gray-400 mb-1 flex items-center gap-2"><Phone className="w-4 h-4"/> Direct Phone</p>
                         <p className="text-base font-semibold text-gray-700">{profile.representative.phone || 'None'}</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}