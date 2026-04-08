import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OwnerDetails = () => {
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/restaurants/owner', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setOwner(res.data);
      } catch (err) {
        console.error('Failed to fetch owner details:', err);
      }
    };
    fetchOwner();
  }, []);

  if (!owner) return <div className="text-[#1F5E2A] italic p-4">Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
      {/* Profile Image Section */}
      {owner.profileImage && (
        <div className="md:col-span-2 flex justify-center mb-4">
          <div className="w-32 h-32 rounded-full shadow-[0_8px_32px_0_rgba(214,122,92,0.3)] bg-gradient-to-tr from-[#E9A38E] to-[#A7D63B] p-1">
            <img 
              src={`http://localhost:5000${owner.profileImage.fileUrl}`} 
              alt="Owner Profile" 
              className="w-full h-full object-cover rounded-full border-4 border-white"
              onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-white bg-[#1F5E2A] rounded-full text-4xl">👤</div>'; }}
            />
          </div>
        </div>
      )}

      <div className="p-5 bg-white/40 rounded-2xl shadow-[0_8px_32px_0_rgba(31,94,42,0.1)] backdrop-blur-md border border-white/60 hover:bg-white/50 transition-all">
        <h3 className="text-xs uppercase tracking-wider text-[#1F5E2A] mb-1 font-semibold opacity-80">Full Name</h3>
        <p className="text-lg text-gray-800 font-bold">{owner.fullName || 'N/A'}</p>
      </div>

      <div className="p-5 bg-white/40 rounded-2xl shadow-[0_8px_32px_0_rgba(31,94,42,0.1)] backdrop-blur-md border border-white/60 hover:bg-white/50 transition-all">
        <h3 className="text-xs uppercase tracking-wider text-[#1F5E2A] mb-1 font-semibold opacity-80">NIC</h3>
        <p className="text-lg text-gray-800 font-bold">{owner.nic || 'N/A'}</p>
      </div>

      <div className="p-5 bg-white/40 rounded-2xl shadow-[0_8px_32px_0_rgba(31,94,42,0.1)] backdrop-blur-md border border-white/60 hover:bg-white/50 transition-all">
        <h3 className="text-xs uppercase tracking-wider text-[#1F5E2A] mb-1 font-semibold opacity-80">Date of Birth</h3>
        <p className="text-lg text-gray-800 font-bold">
          {owner.dob ? new Date(owner.dob).toLocaleDateString() : 'N/A'}
        </p>
      </div>

      <div className="p-5 bg-white/40 rounded-2xl shadow-[0_8px_32px_0_rgba(31,94,42,0.1)] backdrop-blur-md border border-white/60 hover:bg-white/50 transition-all">
        <h3 className="text-xs uppercase tracking-wider text-[#1F5E2A] mb-1 font-semibold opacity-80">Gender</h3>
        <p className="text-lg text-gray-800 font-bold capitalize">{owner.gender || 'N/A'}</p>
      </div>

      <div className="p-5 bg-white/40 rounded-2xl shadow-[0_8px_32px_0_rgba(31,94,42,0.1)] backdrop-blur-md border border-white/60 hover:bg-white/50 transition-all md:col-span-2">
        <h3 className="text-xs uppercase tracking-wider text-[#1F5E2A] mb-1 font-semibold opacity-80">Home Address</h3>
        <p className="text-lg text-gray-800 font-bold leading-relaxed">{owner.homeAddress || 'N/A'}</p>
      </div>

      <div className="p-5 bg-white/40 rounded-2xl shadow-[0_8px_32px_0_rgba(31,94,42,0.1)] backdrop-blur-md border border-white/60 hover:bg-white/50 transition-all">
        <h3 className="text-xs uppercase tracking-wider text-[#1F5E2A] mb-1 font-semibold opacity-80">Email Address</h3>
        <p className="text-lg text-gray-800 font-bold">{owner.email || 'N/A'}</p>
      </div>

      <div className="p-5 bg-white/40 rounded-2xl shadow-[0_8px_32px_0_rgba(31,94,42,0.1)] backdrop-blur-md border border-white/60 hover:bg-white/50 transition-all">
        <h3 className="text-xs uppercase tracking-wider text-[#1F5E2A] mb-1 font-semibold opacity-80">Contact Number</h3>
        <p className="text-lg text-gray-800 font-bold">{owner.contactNumber || 'N/A'}</p>
      </div>

    </div>
  );
};

export default OwnerDetails;
