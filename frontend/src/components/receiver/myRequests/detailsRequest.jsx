import React from 'react';
import { ArrowLeft, Clock, Calendar, Hash, FileText, CheckCircle, Store, XCircle, MapPin, Phone } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import SidebarUser from '../slidebarUser';
import NavbarUser from '../navbarUser';

// Reusing Mock Data here for simplicity across views
const mockRequests = {
  1: {
    id: 1,
    foodType: 'Rice Packets',
    quantity: 50,
    description: 'Needed for a community shelter weekend drive.',
    status: 'Pending',
    date: '2023-11-01',
    restaurantName: 'Green Cafe',
    restaurantLocation: 'Colombo',
    restaurantContact: '0771234567',
    responses: []
  },
  2: {
    id: 2,
    foodType: 'Assorted Bakery Items',
    quantity: 20,
    description: 'For local orphanage afternoon tea.',
    status: 'Approved',
    date: '2023-10-28',
    restaurantName: 'Fresh Bakes',
    restaurantLocation: 'Nearby',
    restaurantContact: '0719876543',
    responses: [
      { id: 101, restaurantName: 'Fresh Bakes', message: 'We can provide 20 items. Please pick up by 4 PM.', status: 'Approved' }
    ]
  },
  3: {
    id: 3,
    foodType: 'Vegetable Curries',
    quantity: 15,
    description: 'Lunch meals for elder care home.',
    status: 'Rejected',
    date: '2023-10-25',
    restaurantName: 'Curry Pot',
    restaurantLocation: 'Kandy',
    restaurantContact: '0774567890',
    responses: [
      { id: 102, restaurantName: 'Curry Pot', message: 'Unfortunately, we do not have enough portions left to fulfill this request today.', status: 'Rejected' }
    ]
  }
};

export default function DetailsRequest() {
  const { id } = useParams();
  const req = mockRequests[id] || mockRequests[1]; // Fallback mock

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending': return { bg: '#E9A38E', icon: <Clock className="w-4 h-4" /> };
      case 'Approved': return { bg: '#9BC7D8', icon: <CheckCircle className="w-4 h-4" /> };
      case 'Rejected': return { bg: '#D67A5C', icon: <XCircle className="w-4 h-4" /> };
      default: return { bg: '#D8C3A5', icon: null };
    }
  };

  const badge = getStatusBadge(req.status);

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>
      <SidebarUser />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <NavbarUser />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Nav and Actions */}
            <div className="flex justify-between items-center mb-4">
              <Link 
                to="/receiver/requests" 
                className="inline-flex items-center gap-2 font-bold hover:underline transition-all"
                style={{ color: '#1F5E2A' }}
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Requests
              </Link>
              
              {req.status === 'Pending' && (
                <button 
                  className="px-6 py-2.5 rounded-xl font-bold text-white shadow-md hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#E9A38E' }}
                >
                  Edit Request
                </button>
              )}
            </div>

            {/* Request Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border p-8" style={{ borderColor: '#D8C3A5' }}>
              
              <div className="flex justify-between items-start mb-8 border-b pb-6 border-gray-100">
                <div>
                  <h1 className="text-3xl font-bold mb-2" style={{ color: '#1F5E2A' }}>{req.foodType}</h1>
                  <p className="text-gray-500 font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Requested on: {req.date}
                  </p>
                </div>
                <div 
                  className="px-4 py-2 rounded-full font-bold text-white shadow-sm flex items-center gap-2 text-sm"
                  style={{ backgroundColor: badge.bg }}
                >
                  {badge.icon}
                  {req.status}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Quantity Needed</label>
                  <p className="text-xl font-medium flex items-center gap-2" style={{ color: '#D67A5C' }}>
                    <Hash className="w-5 h-5 opacity-70" />
                    {req.quantity} portions
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Internal ID</label>
                  <p className="text-lg font-mono text-gray-600">REQ-{req.id.toString().padStart(4, '0')}</p>
                </div>
              </div>

              {/* Restaurant Info Fragment */}
              {req.restaurantName && (
                <div className="mb-8 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <h3 className="font-bold text-lg mb-4" style={{ color: '#1F5E2A' }}>Requested From</h3>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                    <div className="flex items-center gap-2">
                       <Store className="w-5 h-5 text-gray-400" />
                       <span className="font-bold text-gray-700">{req.restaurantName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <MapPin className="w-5 h-5 text-gray-400" />
                       <span className="text-gray-600 font-medium">{req.restaurantLocation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Phone className="w-5 h-5 text-gray-400" />
                       <span className="text-gray-600 font-medium">{req.restaurantContact}</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Description / Purpose</label>
                <div className="bg-[#F8F8F6] p-5 rounded-xl border border-gray-100 flex items-start gap-4">
                  <FileText className="w-6 h-6 shrink-0 mt-0.5" style={{ color: '#9BC7D8' }} />
                  <p className="text-lg text-gray-700 leading-relaxed">{req.description}</p>
                </div>
              </div>
            </div>

            {/* Donor Responses Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 ml-1" style={{ color: '#1F5E2A' }}>Donor Responses</h2>
              
              <div className="bg-[#F8F8F6] rounded-2xl p-6 border border-dashed" style={{ borderColor: '#D8C3A5' }}>
                {req.responses.length === 0 ? (
                  <div className="py-8 text-center text-gray-500">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 border shadow-sm" style={{ borderColor: '#D8C3A5' }}>
                       <Store className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="font-medium">No responses yet.</p>
                    <p className="text-sm mt-1">We will notify you when a restaurant responds to this request.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {req.responses.map(response => (
                      <div key={response.id} className="bg-white rounded-xl p-5 border shadow-sm flex flex-col md:flex-row gap-6" style={{ borderColor: '#D8C3A5' }}>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2 flex items-center gap-2" style={{ color: '#1F5E2A' }}>
                            <Store className="w-5 h-5 text-gray-400" />
                            {response.restaurantName}
                          </h4>
                          <div 
                            className={`p-4 rounded-xl border ${
                              response.status === 'Rejected' 
                                ? 'bg-red-50 border-red-100 text-red-800' 
                                : 'bg-blue-50 border-blue-100'
                            }`} 
                            style={response.status !== 'Rejected' ? { color: '#9BC7D8' } : {}}
                          >
                            <p className="font-medium">{response.message}</p>
                          </div>
                        </div>
                        <div className="md:border-l md:pl-6 border-gray-100 flex flex-col justify-center">
                          <span className="text-sm font-bold text-gray-400 mb-1">Status</span>
                          <span 
                            className="font-black text-xl" 
                            style={{ color: response.status === 'Rejected' ? '#D67A5C' : '#9BC7D8' }}
                          >
                            {response.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}