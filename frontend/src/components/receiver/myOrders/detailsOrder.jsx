import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Package, Calendar, MapPin, Store, Phone } from 'lucide-react';
import SidebarUser from '../slidebarUser';
import NavbarUser from '../navbarUser';

const mockOrderDetails = {
  1: {
    id: 1,
    foodName: 'Vegetable Rice Pack',
    status: 'Pending',
    quantity: 2,
    orderDate: '2023-11-20, 10:30 AM',
    pickupLocation: 'Green Cafe Outlet, Colombo',
    restaurant: {
      name: 'Green Cafe',
      location: '123 Main St, Colombo',
      contact: '0771234567'
    }
  },
  2: {
    id: 2,
    foodName: 'Assorted Bakery Items',
    status: 'Accepted',
    quantity: 1,
    orderDate: '2023-11-21, 08:15 AM',
    pickupLocation: 'Fresh Bakes, Kandy',
    restaurant: {
      name: 'Fresh Bakes',
      location: '45 Bakery Ave, Kandy',
      contact: '0719876543'
    }
  }
};

const statusStyles = {
  Pending: { bg: '#E9A38E', text: '#FFFFFF', icon: Package },
  Accepted: { bg: '#9BC7D8', text: '#FFFFFF', icon: CheckCircle },
  Completed: { bg: '#D67A5C', text: '#FFFFFF', icon: CheckCircle },
};

export default function DetailsOrder() {
  const { id } = useParams();
  const order = mockOrderDetails[id] || mockOrderDetails[1];
  const StatusIcon = statusStyles[order.status]?.icon || Package;

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>
      <SidebarUser />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <NavbarUser />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-3xl mx-auto">
            
            {/* Back Navigation */}
            <Link 
              to="/receiver/orders" 
              className="inline-flex items-center gap-2 mb-6 font-medium hover:underline transition-all"
              style={{ color: '#1F5E2A' }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Orders
            </Link>

            {/* Main Content Card */}
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden p-6 md:p-8" style={{ borderColor: '#D8C3A5' }}>
              
              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8 pb-8 border-b border-gray-100">
                <div>
                  <h1 className="text-2xl font-bold mb-2" style={{ color: '#1F5E2A' }}>
                    {order.foodName}
                  </h1>
                  <p className="text-gray-500 font-medium">Order #{order.id}</p>
                </div>
                
                <span 
                  className="px-4 py-2 text-sm font-bold rounded-full flex items-center justify-center gap-2 shadow-sm w-fit"
                  style={{ 
                    backgroundColor: statusStyles[order.status].bg, 
                    color: statusStyles[order.status].text 
                  }}
                >
                  <StatusIcon className="w-4 h-4" />
                  {order.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Order Information Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold" style={{ color: '#1F5E2A' }}>Order Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Package className="w-5 h-5 mt-0.5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Quantity</p>
                        <p className="font-bold text-lg" style={{ color: '#D67A5C' }}>{order.quantity} packs</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 mt-0.5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Order Date</p>
                        <p className="font-bold" style={{ color: '#1F5E2A' }}>{order.orderDate}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 mt-0.5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Pickup/Delivery Location</p>
                        <p className="font-bold" style={{ color: '#9BC7D8' }}>{order.pickupLocation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Restaurant Information Section */}
                <div className="space-y-6 bg-[#F8F8F6] p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-bold" style={{ color: '#1F5E2A' }}>Restaurant Info</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Store className="w-5 h-5 mt-0.5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Name</p>
                        <p className="font-bold" style={{ color: '#1F5E2A' }}>{order.restaurant.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 mt-0.5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="font-bold flex-1" style={{ color: '#D67A5C' }}>{order.restaurant.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 mt-0.5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Contact</p>
                        <p className="font-bold" style={{ color: '#9BC7D8' }}>{order.restaurant.contact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-end">
                <Link 
                  to="/receiver/orders"
                  className="px-6 py-3 rounded-xl font-bold transition-all text-center"
                  style={{ backgroundColor: '#D8C3A5', color: '#1F5E2A' }}
                >
                  Back to Orders
                </Link>
                
                {order.status === 'Accepted' && (
                  <button 
                    className="px-6 py-3 rounded-xl font-bold text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#E9A38E' }}
                  >
                    <CheckCircle className="w-5 h-5" />
                    Confirm Received
                  </button>
                )}
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
