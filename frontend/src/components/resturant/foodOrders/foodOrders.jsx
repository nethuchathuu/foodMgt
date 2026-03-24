import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import ListOrders from './listOrders';
import DetailsOrders from './detailsOrders';
import ProfileOrders from './profileOrders';

// Dummy Data
const initialOrders = [
  {
    id: "ORD-1201",
    foodName: "Rice & Curry Special",
    quantity: 2,
    totalPrice: 8.50,
    status: "Pending",
    time: "10:30 AM",
    customer: {
      id: "CUST-001",
      type: "Individual",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 890",
      address: "123 Maple Street, City Center",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    }
  },
  {
    id: "ORD-1202",
    foodName: "Large Meals Pack",
    quantity: 10,
    totalPrice: 45.00,
    status: "Pending",
    time: "09:15 AM",
    customer: {
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
    id: "ORD-1203",
    foodName: "Vegan Wrap",
    quantity: 1,
    totalPrice: 5.00,
    status: "Accepted",
    time: "08:45 AM",
    customer: {
      id: "CUST-002",
      type: "Individual",
      name: "Alice Smith",
      email: "alice@example.com",
      phone: "+1 555 123 456",
      address: "789 Oak Ave, Suburbs",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f"
    }
  },
  {
    id: "ORD-1204",
    foodName: "Bakery Surplus Box",
    quantity: 5,
    totalPrice: 15.00,
    status: "Completed",
    time: "Yesterday",
    customer: {
      id: "ORG-103",
      type: "Organization",
      name: "City Food Bank",
      orgName: "City Food Bank",
      email: "help@cityfoodbank.org",
      phone: "+1 444 789 012",
      address: "321 Food Bank Rd.",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b"
    }
  }
];

const FoodOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const openProfile = (customer) => {
    setSelectedProfile(customer);
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
            Food Orders <ShoppingBag className="text-[#A7D63B]" size={32} />
          </h1>
          <p className="text-gray-600 mt-1">Manage customer and organization orders</p>
        </div>
      </motion.div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
        {/* Left Panel: List */}
        <div className="lg:col-span-1 h-full">
          <ListOrders 
            orders={orders} 
            selectedOrderId={selectedOrderId} 
            onSelectOrder={setSelectedOrderId}
          />
        </div>

        {/* Right Panel: Details */}
        <div className="lg:col-span-2 h-full">
          <DetailsOrders 
            order={selectedOrder} 
            onStatusChange={handleStatusChange}
            onViewProfile={() => selectedOrder && openProfile(selectedOrder.customer)}
          />
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileOrders 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        customer={selectedProfile} 
      />
    </div>
  );
};

export default FoodOrders;
