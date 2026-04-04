import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart } from 'lucide-react';
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

  // Fetch Requests on load
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/donation-requests/restaurant', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Map backend fields to frontend expected fields
      const formattedRequests = res.data.map(req => ({
        id: req._id,
        items: req.foodId?.name || 'Unknown Item',
        quantity: req.quantity,
        purpose: req.purpose || '',
        urgency: 'Normal', // Optional mock as it's not in DB
        preferredPickup: req.foodId?.expiresIn || 'Not specified',
        status: req.status,
        time: new Date(req.createdAt).toLocaleString(),
        requester: {
          id: req.receiverId?._id,
          type: req.receiverId?.organizationName ? 'Organization' : 'Individual',
          name: req.receiverId?.name || 'Unknown',
          orgName: req.receiverId?.organizationName || '',
          email: req.receiverId?.email || '',
          phone: req.receiverId?.phoneNumber || '',
          address: req.receiverId?.address || 'Not Provided',
          avatar: 'https://i.pravatar.cc/150?u=' + (req.receiverId?._id || 'default')
        },
        foodDetails: req.foodId // keep food details around for details panel
      }));
      setRequests(formattedRequests);
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
        </div>
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
    </div>
  );
};

export default DonationRequests;
