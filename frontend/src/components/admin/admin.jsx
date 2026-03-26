import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarAdmin from './navbarAdmin';
import SlidebarAdmin from './slidebarAdmin';

const Admin = () => {
  return (
    <div className="min-h-screen font-['Poppins'] flex" style={{ backgroundColor: '#F0F9FF' }}>
      <SlidebarAdmin />
      
      <div className="flex-1 flex flex-col md:ml-[250px]">
        <NavbarAdmin />
        
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;
