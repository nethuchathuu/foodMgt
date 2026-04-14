import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, FileText, MapPin, Phone, Mail, User, Download, Eye, Building2, Calendar } from 'lucide-react';
import axios from 'axios';

const ViewOrgDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  
  const [alertModal, setAlertModal] = useState({ show: false, type: '', message: '' });
  
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/admin/organizations/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrganization(response.data);
      } catch (err) {
        console.error('Error fetching organization details', err);
        setError(err.response?.data?.message || 'Failed to load details');
      } finally {
        setLoading(false);
      }
    };
    fetchOrganizationDetails();
  }, [id]);

  const handleApprove = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/admin/approve-org/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAlertModal({ show: true, type: 'success', message: `Organization ${organization.name} Approved! They now have donation request access.` });
      setOrganization(prev => ({ ...prev, status: 'Approved' }));
    } catch (err) {
      console.error(err);
      setAlertModal({ show: true, type: 'error', message: 'Failed to approve organization' });
    }
  };

  const handleRejectSubmit = async () => {
    if(!rejectReason.trim()) return;
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/admin/reject-org/${id}`, { reason: rejectReason }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAlertModal({ show: true, type: 'success', message: `Organization ${organization.name} Rejected.` });
      setShowRejectModal(false);
      setOrganization(prev => ({ ...prev, status: 'Rejected' }));
    } catch (err) {
      console.error(err);
      setAlertModal({ show: true, type: 'error', message: 'Failed to reject organization' });
    }
  };

  if (loading) {
    return <div className="p-6 font-['Poppins'] min-h-screen text-center" style={{ backgroundColor: '#F8FAFC' }}>Loading...</div>;
  }

  if (error || !organization) {
    return <div className="p-6 font-['Poppins'] min-h-screen text-center text-red-500" style={{ backgroundColor: '#F8FAFC' }}>{error || 'Organization not found'}</div>;
  }

  return (
    <div className="p-6 font-['Poppins'] min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      
      {/* Header & Back Button */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-50 transition-colors text-slate-600"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              {organization.name}
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                organization.status === 'Pending' ? 'bg-[#FFF4F0] text-[#E9A38E]' : 
                organization.status === 'Approved' ? 'bg-[#EAF6FB] text-[#9BC7D8]' : 
                'bg-[#FDECEA] text-[#D67A5C]'
              }`}>
                {organization.status}
              </span>
            </h1>
            <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
              <span>Registration ID: {organization.regId || 'N/A'}</span>
              <span>•</span>
              <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-xs">
                <Building2 size={12} /> {organization.type || 'Organization'}
              </span>
            </p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={() => setShowRejectModal(true)}
            disabled={organization.status !== 'Pending'}
            className={`flex items-center gap-2 px-4 py-2 font-medium bg-white border rounded-xl transition-colors shadow-sm ${
              organization.status === 'Pending' ? '' : 'opacity-50 cursor-not-allowed'
            }`}
            style={{ color: '#D67A5C', borderColor: '#fadad1' }}
            onMouseEnter={(e) => { if(organization.status === 'Pending') e.currentTarget.style.backgroundColor = '#FDECEA' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF' }}
          >
            <XCircle size={18} />
            Reject
          </button>
          <button 
            onClick={handleApprove}
            disabled={organization.status !== 'Pending'}
            className={`flex items-center gap-2 px-4 py-2 font-medium text-white rounded-xl shadow-sm transition-opacity ${
              organization.status === 'Pending' ? 'hover:opacity-90' : 'opacity-50 cursor-not-allowed'
            }`}
            style={{ backgroundColor: '#9BC7D8' }} 
          >
            <CheckCircle size={18} />
            Approve Application
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Application Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-4 uppercase tracking-wider">Contact Info</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User size={18} className="text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{organization.contactPerson || 'N/A'}</p>
                      <p className="text-xs text-slate-500">Primary Contact</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{organization.email || 'N/A'}</p>
                      <p className="text-xs text-slate-500">Email Address</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{organization.phone || 'N/A'}</p>
                      <p className="text-xs text-slate-500">Phone</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-500 mb-4 uppercase tracking-wider">Location & Details</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{organization.address || 'N/A'}</p>
                      <p className="text-xs text-slate-500">Registered Address</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{organization.yearsOfOperation || 'N/A'} Years</p>
                      <p className="text-xs text-slate-500">Years of Operation</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100/50">
                    <p className="text-sm text-slate-700 italic">"{organization.description || 'No description provided.'}"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Documents */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Verification Info</h2>
            
            <div className="space-y-3">
              {organization.documents && organization.documents.length > 0 ? organization.documents.map((doc, index) => (
                <div key={index} className="p-3 border border-slate-100 rounded-xl flex items-center justify-between hover:border-[#9BC7D8] hover:bg-[#EAF6FB]/50 transition-colors group">
                  <div className="flex items-center gap-3 w-full overflow-hidden">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-500 group-hover:text-[#9BC7D8] group-hover:bg-white transition-colors flex-shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium text-slate-800 truncate">{doc.fileName || doc.name || 'Document'}</p>
                      <p className="text-xs text-slate-400">{doc.fileType || doc.type || 'Unknown'}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2">
                    {doc.fileUrl && (
                      <>
                        <a href={`http://localhost:5000${doc.fileUrl}`} target="_blank" rel="noopener noreferrer" className="p-1.5 text-slate-400 hover:text-[#9BC7D8] rounded" title="Preview">
                          <Eye size={16} />
                        </a>
                        <a href={`http://localhost:5000${doc.fileUrl}`} download className="p-1.5 text-slate-400 hover:text-[#9BC7D8] rounded" title="Download">
                          <Download size={16} />
                        </a>
                      </>
                    )}
                  </div>
                </div>
              )) : (
                <p className="text-sm text-slate-500">No documents submitted.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Alert Modal */}
      {alertModal.show && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${
                alertModal.type === 'success' ? 'bg-[#EAF6FB] text-[#9BC7D8]' : 'bg-[#FDECEA] text-[#D67A5C]'
              } mb-4`}>
                {alertModal.type === 'success' ? <CheckCircle size={32} /> : <XCircle size={32} />}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {alertModal.type === 'success' ? 'Success' : 'Error'}
              </h3>
              <p className="text-slate-600">
                {alertModal.message}
              </p>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-center">
              <button 
                onClick={() => setAlertModal({ show: false, type: '', message: '' })}
                className="w-full px-4 py-2.5 font-medium text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center" style={{ backgroundColor: '#FDECEA' }}>
              <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: '#D67A5C' }}>
                <XCircle />
                Reject Organization
              </h3>
              <button onClick={() => setShowRejectModal(false)} className="text-slate-500 hover:text-slate-800">
                <XCircle size={20} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-600 mb-4">
                Please provide a reason for rejecting <span className="font-semibold text-slate-800">{organization.name}'s</span> application. This will be emailed to them.
              </p>
              <textarea 
                className="w-full h-32 p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 resize-none text-sm"
                style={{ outlineColor: '#D67A5C' }}
                placeholder="Enter rejection reason..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              ></textarea>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleRejectSubmit}
                disabled={!rejectReason.trim()}
                className="px-4 py-2 font-medium text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#D67A5C' }}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ViewOrgDetails;