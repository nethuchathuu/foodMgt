import React from 'react';
import { LayoutDashboard, Utensils, ShoppingBag, HandHeart, ClipboardList, History, User, Settings, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  {
    
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/receiver/home' },
      { id: 'browseFood', label: 'Browse Food', icon: Utensils, path: '/receiver/foods' },
      { id: 'orders', label: 'My Orders', icon: ShoppingBag, path: '/receiver/orders' },
      { id: 'myRequests', label: 'My Requests', icon: ClipboardList, path: '/receiver/requests' },
    ]
  },
  
];

export default function SidebarUser() {
  return (
    <aside className="w-64 flex-shrink-0 min-h-screen bg-white border-r flex flex-col shadow-sm" style={{ borderColor: '#D8C3A5' }}>
      <div className="p-6 flex flex-col items-center border-b" style={{ borderColor: '#D8C3A5' }}>
         <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2" style={{ borderColor: '#9BC7D8' }}>
            <span className="text-gray-500 font-bold text-xl">NH</span>
            {/* <img src="/assets/user.png" alt="Nethmi Heshani" className="object-cover w-full h-full" /> */}
         </div>
         <h3 className="mt-4 font-semibold text-lg" style={{ color: '#1F5E2A' }}>Nethmi Heshani</h3>
         <p className="text-sm font-medium" style={{ color: '#D67A5C' }}>Individual Receiver</p>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        {navItems.map((group, idx) => (
          <div key={idx} className="mb-6 px-4">
            <p className="text-xs uppercase tracking-wider mb-2 font-bold opacity-70" style={{ color: '#1F5E2A' }}>
              {group.section}
            </p>
            <ul>
              {group.items.map((item) => (
                <li key={item.id} className="mb-1">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium ${
                        isActive 
                          ? 'text-white' 
                          : 'hover:bg-opacity-20 hover:bg-[#9BC7D8]'
                      }`
                    }
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? '#E9A38E' : 'transparent',
                      color: isActive ? '#fff' : '#1F5E2A'
                    })}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t" style={{ borderColor: '#D8C3A5' }}>
         <button className="flex items-center gap-3 px-3 py-2 w-full font-medium rounded-lg text-red-500 hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5"/>
            Logout
         </button>
      </div>
    </aside>
  );
}
