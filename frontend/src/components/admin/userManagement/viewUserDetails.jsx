import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Ban, CheckCircle, Mail, Phone, MapPin, Briefcase, Calendar, ShieldAlert } from 'lucide-react';
import Swal from 'sweetalert2';

const ViewUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBlockModal, setShowBlockModal] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [id]);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const roleColors = {
    'User': '#9BC7D8',
    'Restaurant': '#7FB3C9',
    'Organization': '#5C9DB5'
  };

  const toggleStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/admin/toggle-user-status/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        const newStatus = user.status === 'Active' ? 'Blocked' : 'Active';
        setUser(prev => ({
          ...prev,
          status: newStatus
        }));
        setShowBlockModal(false);
        import('sweetalert2').then(Swal => {
           Swal.default.fire({
             title: 'Success!',
             text: `User has been ${newStatus === 'Blocked' ? 'blocked' : 'activated'}.`,
             icon: 'success',
             confirmButtonColor: '#9BC7D8'
           });
        }).catch(() => alert(`User has been ${newStatus === 'Blocked' ? 'blocked' : 'activated'}.`));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!user) return <div className="p-6 text-center">User not found.</div>;

  const isBlocked = user.status === 'Blocked';

  return (
    <div className="p-6 font-['Poppins'] min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      
      {/* Header */}
      <div className="mb-6">
        <button 
          onClick={() => navigate('/admin/users')}
          className="p-2 mb-4 bg-white rounded-full shadow-sm hover:bg-slate-50 transition-colors text-slate-600 inline-flex items-center justify-center"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Profile</h1>
          <p className="text-slate-500 text-sm">Detailed overview of user account</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Profile Card (Left Layout) */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center sticky top-6">
            
            <div className="relative inline-block mb-4">
              <div 
                className="w-28 h-28 mx-auto rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg border-4 border-white"
                style={{ backgroundColor: roleColors[user.role] || '#9BC7D8' }}
              >
                {getInitials(user.name)}
              </div>
              <span 
                className="absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white"
                style={{ backgroundColor: isBlocked ? '#D67A5C' : '#10B981' }}
                title={user.status}
              />
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-1">{user.name}</h2>
            <p className="text-sm font-medium text-slate-500 mb-6">{user.role} Account</p>

            <div className="inline-flex px-4 py-1.5 rounded-full text-sm font-medium border mb-8"
                 style={isBlocked 
                   ? { backgroundColor: '#FDECEA', color: '#D67A5C', borderColor: '#FDECEA' } 
                   : { backgroundColor: '#EAF6FB', color: '#9BC7D8', borderColor: '#EAF6FB' }}>
              {isBlocked ? 'Account Blocked' : 'Account Active'}
            </div>

            <div className="pt-6 border-t border-slate-100">
               {isBlocked ? (
                 <button 
                   onClick={toggleStatus}
                   className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white shadow-md transition-opacity hover:opacity-90"
                   style={{ backgroundColor: '#9BC7D8' }}
                 >
                   <CheckCircle size={18} />
                   Unblock User
                 </button>
               ) : (
                 <button 
                   onClick={() => setShowBlockModal(true)}
                   className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold border-2 transition-colors hover:text-white"
                   style={{ borderColor: '#D67A5C', color: '#D67A5C' }}
                   onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D67A5C'}
                   onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#D67A5C'; }}
                 >
                   <Ban size={18} />
                   Block User
                 </button>
               )}
            </div>
          </div>
        </div>

        {/* Info Cards (Right Layout) */}
        <div className="lg:w-2/3 space-y-6">
          
          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-5 pb-3 border-b border-slate-50">Basic Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{user.email}</p>
                  <p className="text-xs text-slate-500">Email Address</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{user.phone}</p>
                  <p className="text-xs text-slate-500">Phone Number</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-5 pb-3 border-b border-slate-50">Account Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                  <Briefcase size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{user.role}</p>
                  <p className="text-xs text-slate-500">Role Identity</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{user.joinedDate}</p>
                  <p className="text-xs text-slate-500">Registration Date</p>
                </div>
              </div>

            </div>
          </div>

          {/* Additional Info */}
          {(user.address || user.entityName) && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-5 pb-3 border-b border-slate-50">Additional Information</h3>
              <div className="space-y-4">
                
                {user.entityName && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{user.entityName}</p>
                      <p className="text-xs text-slate-500">Business / Organization Name</p>
                    </div>
                  </div>
                )}

                {user.address && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{user.address}</p>
                      <p className="text-xs text-slate-500">Registered Address</p>
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          )}

          {/* Owner / Representative Details */}
          {user.ownerDetails && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-5 pb-3 border-b border-slate-50">
                {user.role === 'Organization' ? 'Representative Details' : 'Owner Details'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {user.ownerDetails.fullName && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{user.ownerDetails.fullName}</p>
                      <p className="text-xs text-slate-500">Full Name</p>
                    </div>
                  </div>
                )}

                {user.ownerDetails.email && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{user.ownerDetails.email}</p>
                      <p className="text-xs text-slate-500">Email</p>
                    </div>
                  </div>
                )}

                {(user.ownerDetails.phoneNumber || user.ownerDetails.contactNumber) && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{user.ownerDetails.phoneNumber || user.ownerDetails.contactNumber}</p>
                      <p className="text-xs text-slate-500">Contact Number</p>
                    </div>
                  </div>
                )}

                {user.ownerDetails.nic && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{user.ownerDetails.nic}</p>
                      <p className="text-xs text-slate-500">NIC</p>
                    </div>
                  </div>
                )}

                {user.ownerDetails.gender && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{user.ownerDetails.gender}</p>
                      <p className="text-xs text-slate-500">Gender</p>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

        </div>
      </div>

      {/* Block Confirmation Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 text-center animate-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 mx-auto flex items-center justify-center mb-4">
              <ShieldAlert size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Block this user?</h3>
            <p className="text-sm text-slate-500 mb-6">
              <span className="font-semibold">{user.name}</span> will lose access to their account immediately. They can be unblocked later on this page.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowBlockModal(false)}
                className="flex-1 py-2.5 font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={toggleStatus}
                className="flex-1 py-2.5 font-semibold text-white rounded-xl shadow-md transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#D67A5C' }}
              >
                Block User
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ViewUserDetails;