import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import SidebarUser from '../slidebarUser';
import NavbarUser from '../navbarUser';
import ViewRequests from './viewRequests';

// Mock Data
const mockRequests = [
  {
    id: 1,
    foodType: 'Rice Packets',
    quantity: 50,
    description: 'Needed for a community shelter weekend drive.',
    status: 'Pending',
    date: '2023-11-01'
  },
  {
    id: 2,
    foodType: 'Assorted Bakery Items',
    quantity: 20,
    description: 'For local orphanage afternoon tea.',
    status: 'Approved',
    date: '2023-10-28'
  },
  {
    id: 3,
    foodType: 'Vegetable Curries',
    quantity: 15,
    description: 'Lunch meals for elder care home.',
    status: 'Rejected',
    date: '2023-10-25'
  }
];

export default function MyRequests() {
  const [requests] = useState(mockRequests);

  // Calculate metrics
  const pendingCount = requests.filter(r => r.status === 'Pending').length;
  const approvedCount = requests.filter(r => r.status === 'Approved').length;
  const rejectedCount = requests.filter(r => r.status === 'Rejected').length;

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>
      <SidebarUser />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <NavbarUser />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#1F5E2A' }}>My Requests</h1>
              <p className="text-gray-600 font-medium">Track and manage your donation requests</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pending */}
              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border animate-pulse-soft flex items-start gap-4" style={{ borderColor: '#D8C3A5' }}>
                <div className="p-3 rounded-xl bg-orange-50">
                  <Clock className="w-8 h-8" style={{ color: '#E9A38E' }} />
                </div>
                <div>
                  <h3 className="text-gray-500 font-bold mb-1">Pending Requests</h3>
                  <p className="text-3xl font-black" style={{ color: '#1F5E2A' }}>{pendingCount}</p>
                </div>
              </div>

              {/* Approved */}
              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border animate-bounce-soft flex items-start gap-4" style={{ borderColor: '#D8C3A5' }}>
                <div className="p-3 rounded-xl bg-blue-50">
                  <CheckCircle className="w-8 h-8" style={{ color: '#9BC7D8' }} />
                </div>
                <div>
                  <h3 className="text-gray-500 font-bold mb-1">Approved Requests</h3>
                  <p className="text-3xl font-black" style={{ color: '#1F5E2A' }}>{approvedCount}</p>
                </div>
              </div>

              {/* Rejected */}
              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border animate-shake-soft flex items-start gap-4" style={{ borderColor: '#D8C3A5' }}>
                <div className="p-3 rounded-xl bg-red-50">
                  <XCircle className="w-8 h-8" style={{ color: '#D67A5C' }} />
                </div>
                <div>
                  <h3 className="text-gray-500 font-bold mb-1">Rejected Requests</h3>
                  <p className="text-3xl font-black" style={{ color: '#1F5E2A' }}>{rejectedCount}</p>
                </div>
              </div>
            </div>

            {/* Request List component */}
            <div className="pt-4">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#1F5E2A' }}>Request History</h2>
              <ViewRequests requests={requests} />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}