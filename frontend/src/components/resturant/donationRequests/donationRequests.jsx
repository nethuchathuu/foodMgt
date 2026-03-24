import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import ListDonation from './listDonation';
import DetailsDonation from './detailsDonation';
import ProfileDonation from './profileDonation';

// Dummy Data
const initialRequests = [
  {
    id: "REQ-2001",
    items: "Rice & Curry Packs",
    quantity: 50,
    urgency: "High",
    preferredPickup: "Today, 5:00 PM",
    status: "Pending",
    time: "2 hours ago",
    requester: {
      id: "ORG-102",
      type: "Organization",
      name: "Hope Charity Foundation",
      orgName: "Hope Charity Foundation",
      email: "contact@hopecharity.org",
      phone: "+1 987 654 321",
      address: "456 Charity Lane, Downtown",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e"
    }
  },
  {
    id: "REQ-2002",
    items: "Bakery Surplus",
    quantity: 15,
    urgency: "Medium",
    preferredPickup: "Tomorrow, 10:00 AM",
    status: "Approved",
    time: "4 hours ago",
    requester: {
      id: "ORG-105",
      type: "Organization",
      name: "Community Food Bank",
      orgName: "Community Food Bank",
      email: "hello@foodbank.org",
      phone: "+1 222 333 444",
      address: "789 Relief Ave",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704c"
    }
  },
  {
    id: "REQ-2003",
    items: "Assorted Vegetables",
    quantity: 5,
    urgency: "Low",
    preferredPickup: "Today, 8:00 PM",
    status: "Pending",
    time: "5 hours ago",
    requester: {
      id: "CUST-005",
      type: "Individual",
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      phone: "+1 555 987 654",
      address: "12 Maple St, Suburbs",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a"
    }
  },
  {
    id: "REQ-2004",
    items: "Fruits & Bread",
    quantity: 10,
    urgency: "High",
    preferredPickup: "Today, 4:00 PM",
    status: "Scheduled",
    time: "1 day ago",
    requester: {
      id: "CUST-008",
      type: "Individual",
      name: "Michael Chen",
      email: "m.chen@example.com",
      phone: "+1 444 555 666",
      address: "88 Pine Rd",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b"
    }
  }
];

const DonationRequests = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const selectedRequest = requests.find(r => r.id === selectedRequestId);

  const handleStatusChange = (requestId, newStatus) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: newStatus } : req
    ));
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
