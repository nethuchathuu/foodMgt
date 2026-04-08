import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ListDonation from './listDonation';
import DetailsDonation from './detailsDonation';
import ProfileDonation from './profileDonation';

const DonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClearAllOpen, setIsClearAllOpen] = useState(false);

  // Fetch Requests on load
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/donation-requests/restaurant', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Use directly since the backend maps it to match ordering system exactly
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching donation requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const selectedRequest = requests.find(r => r.id === selectedRequestId);

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/donation-requests/${requestId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update state locally
      setRequests(requests.map(req =>
        req.id === requestId ? { ...req, status: newStatus } : req
      ));
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update status');
    }
  };

  const openProfile = (requester) => {
    setSelectedProfile(requester);
    setIsProfileModalOpen(true);
  };

  const handleClearAll = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:5000/api/donation-requests/restaurant/delete-all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests([]);
      setSelectedRequestId(null);
      setIsClearAllOpen(false);
    } catch (err) {
      console.error('Failed to clear all requests:', err);
      alert('Failed to clear all requests');
    }
  };

  return (
    <div className="bg-[#F8F8F6] min-h-screen p-6 font-sans">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#1F5E2A] flex items-center gap-3">
            Donation Requests <Heart className="text-[#A7D63B]" size={32} />
          </h1>
          <p className="text-gray-600 mt-1">Support communities by managing donation requests</p>
        </div>               <button 
          onClick={() => setIsClearAllOpen(true)}
          className="bg-red-100 text-red-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-red-200 hover:scale-105 transition-all flex items-center gap-2"
          disabled={requests.length === 0}
        >
          <Trash2 size={20} />
          Clear All
        </button>
      </motion.div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
        {/* Left Panel: List */}
        <div className="lg:col-span-1 h-full">
          <ListDonation
            requests={requests}
            selectedRequestId={selectedRequestId}
            onSelectRequest={setSelectedRequestId}
          />
        </div>

        {/* Right Panel: Details */}
        <div className="lg:col-span-2 h-full">
          <DetailsDonation
            request={selectedRequest}
            onStatusChange={handleStatusChange}
            onViewProfile={() => selectedRequest && openProfile(selectedRequest.requester)}
          />
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileDonation
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        requester={selectedProfile}
      />

      {isClearAllOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all scale-100 opacity-100 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Trash2 className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Clear All Items?</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Are you sure you want to permanently clear all your donation requests? This action cannot be undone.
            </p>
            <div className="flex gap-4 w-full">
              <button 
                onClick={() => setIsClearAllOpen(false)}
                className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleClearAll}
                className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all active:scale-95"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
