import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Utensils, ShoppingBag, HandHeart, ClipboardList, History, User, Settings, LogOut, Bell } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/foodMgtLogo.png';
import axios from 'axios';


const navItems = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/receiver/home' },
      { id: 'browseFood', label: 'Browse Food', icon: Utensils, path: '/receiver/foods' },
      { id: 'orders', label: 'My Orders', icon: ShoppingBag, path: '/receiver/orders' },
      { id: 'myRequests', label: 'My Requests', icon: ClipboardList, path: '/receiver/requests' }
    ]
  },
];

export default function SidebarUser() {
  const [profile, setProfile] = useState(null);
  const [organization, setOrganization] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return;
    try {
      const u = JSON.parse(userStr);
      setProfile(u);

      if (u.role === 'requester_org') {
        // fetch organization profile
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5000/api/organization/me', { headers: { Authorization: `Bearer ${token}` } })
          .then(res => setOrganization(res.data.organization))
          .catch(() => setOrganization(null));
      }
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('restaurantUser');
    navigate('/signin');
  };

  const displayName = organization ? (organization.orgName || profile?.name) : (profile?.name || 'Guest Receiver');
  const subLabel = organization ? 'Organizational Receiver' : 'Individual Receiver';

  return (
    <aside className="w-64 flex-shrink-0 min-h-screen border-r flex flex-col shadow-sm" style={{ backgroundColor: '#E9A38E', borderColor: '#D8C3A5' }}>
      <div className="p-6 flex flex-col items-center border-b" style={{ borderColor: '#D8C3A5' }}>
         <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden border-2" style={{ borderColor: '#9BC7D8' }}>
            {(organization?.logo || profile?.image) ? (
              <img src={organization?.logo || profile?.image} alt={displayName} className="object-cover w-full h-full" />
            ) : (
              <img src={logo} alt={displayName} className="object-cover w-full h-full p-1" />
            )}
         </div>
         <h2 className="mt-4 text-xl font-bold" style={{ color: '#333333' }}>{displayName}</h2>
         <p className="text-sm font-medium" style={{ color: '#1F5E2A', opacity: 0.8 }}>{subLabel}</p>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        {navItems.map((group, idx) => (
          <div key={idx} className="mb-6 px-4">
            <p className="text-xs uppercase tracking-wider mb-2 font-bold opacity-80" style={{ color: '#1F5E2A' }}>
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
                          ? 'shadow-sm' 
                          : 'hover:bg-white/30'
                      }`
                    }
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? '#F8F8F6' : 'transparent',
                      color: isActive ? '#1F5E2A' : '#1F5E2A'
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
         <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 w-full font-bold rounded-lg transition-colors hover:bg-red-50 hover:text-red-500" style={{ color: '#1F5E2A' }}>
            <LogOut className="w-5 h-5"/>
            Logout
         </button>
      </div>
    </aside>
  );
}
