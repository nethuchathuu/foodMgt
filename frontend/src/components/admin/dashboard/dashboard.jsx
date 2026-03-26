import React from 'react';
import Cards from './cards';

const Dashboard = () => {
  return (
    <div 
      className="p-6 font-['Poppins']"
      style={{ 
        backgroundColor: '#F0F9FF', // Light blue background from theme
        minHeight: '100vh' 
      }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#0F172A' }}>
          Admin Dashboard
        </h1>
        <p className="text-lg" style={{ color: '#475569' }}>
          Monitor system activity and approvals in real-time
        </p>
      </div>

      <div className="mb-12">
        <Cards />
      </div>

    </div>
  );
};

export default Dashboard;
