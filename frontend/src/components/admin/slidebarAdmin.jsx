import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Store, 
  Building, 
  Users, 
  Utensils, 
  ShoppingCart, 
  HeartHandshake 
} from 'lucide-react';

const SlidebarAdmin = () => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, route: '/admin' },
    { name: 'Restaurant Approvals', icon: Store, route: '/admin/restaurants', highlight: true },
    { name: 'Organization Approvals', icon: Building, route: '/admin/organizations', highlight: true },
    { name: 'Users', icon: Users, route: '/admin/users' },
    { name: 'Food Listings', icon: Utensils, route: '/admin/foods' },
    { name: 'Orders', icon: ShoppingCart, route: '/admin/orders' },
    { name: 'Donations', icon: HeartHandshake, route: '/admin/donations' }
  ];

  return (
    <aside 
      className="fixed top-0 left-0 h-screen font-['Poppins'] flex flex-col hidden md:flex"
      style={{ 
        width: '250px',
        backgroundColor: '#FFFFFF',
        color: '#0F172A',
        borderRight: '1px solid #eee'
      }}
    >
      <div className="p-6 flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: '#1E3A8A' }}
        >
          <Utensils size={20} />
        </div>
        <h1 className="text-xl font-bold" style={{ color: '#1E3A8A' }}>FoodMgt Admin</h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              to={item.route}
              end={item.route === '/admin'}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 transition-colors ${isActive ? 'font-medium' : ''}`
              }
              style={({ isActive }) => ({
                borderRadius: '12px',
                backgroundColor: isActive ? '#60A5FA' : 'transparent',
                color: isActive ? '#FFFFFF' : '#0F172A',
                position: 'relative'
              })}
            >
              <Icon size={20} />
              <span>{item.name}</span>
              
              {item.highlight && (
                <span 
                  className="absolute right-3 w-2 h-2 rounded-full"
                  style={{ backgroundColor: '#F43F5E' }}
                />
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default SlidebarAdmin;
