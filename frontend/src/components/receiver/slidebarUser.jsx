import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Utensils, ShoppingBag, HandHeart, ClipboardList, History, User, Settings, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/foodMgtLogo.png';
import axios from 'axios';

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
    <aside className="w-64 flex-shrink-0 min-h-screen bg-white border-r flex flex-col shadow-sm" style={{ borderColor: '#D8C3A5' }}>
      <div className="p-6 flex flex-col items-center border-b" style={{ borderColor: '#D8C3A5' }}>
         <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border-2" style={{ borderColor: '#9BC7D8' }}>
            {organization ? (
              <img src={logo} alt={displayName} className="object-contain w-full h-full" />
            ) : (
              <span className="text-gray-500 font-bold text-xl">{(profile?.name || 'G').split(' ').map(n=>n[0]).slice(0,2).join('')}</span>
            )}
         </div>
         <h2 className="mt-4 text-lg font-bold" style={{ color: '#1F5E2A' }}>{displayName}</h2>
         <p className="text-sm font-medium" style={{ color: '#D67A5C' }}>{subLabel}</p>
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
         <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 w-full font-medium rounded-lg text-red-500 hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5"/>
            Logout
         </button>
      </div>
    </aside>
  );
}
