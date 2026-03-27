import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, FileText, MapPin, Phone, Mail, User, Download, Eye, Building2, Calendar } from 'lucide-react';

const ViewOrgDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // Mock data fetching based on ID
  const organization = {
    id: id || 1,
    name: 'Hope Foundation',
    regId: 'ORG-2024-089',
    type: 'NGO',
    status: 'Pending',
    contactPerson: 'Jane Doe',
    email: 'jane.doe@hopefoundation.org',
    phone: '+1 (555) 123-4567',
    address: '123 Charity Lane, New York, NY 10001',
    description: 'A non-profit organization dedicated to providing meals to families in need across the metropolitan area. We partner with local shelters and community centers.',
    yearsOfOperation: 5,
    documents: [
      { name: 'Registration Proof', type: 'PDF', size: '2.4 MB' },
      { name: 'Tax Exemption Certificate', type: 'PDF', size: '1.1 MB' },
      { name: 'Organization Structure', type: 'DOCX', size: '0.8 MB' }
    ]
  };

  const handleApprove = () => {
    // API logic to approve
    alert(`Organization ${organization.name} Approved! They now have donation request access.`);
    navigate('/admin/organizations');
  };

  const handleRejectSubmit = () => {
    if(!rejectReason.trim()) return;
    // API logic to reject with reason
    alert(`Organization Rejected. Reason: ${rejectReason}`);
    setShowRejectModal(false);
    navigate('/admin/organizations');
  };

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
              <span>Registration ID: {organization.regId}</span>
              <span>•</span>
              <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-xs">
                <Building2 size={12} /> {organization.type}
              </span>
            </p>
          </div>
        </div>
        
        {/* Action Buttons */}
        {organization.status === 'Pending' && (
          <div className="flex gap-3">
            <button 
              onClick={() => setShowRejectModal(true)}
              className="flex items-center gap-2 px-4 py-2 font-medium bg-white border rounded-xl transition-colors shadow-sm"
              style={{ color: '#D67A5C', borderColor: '#fadad1' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FDECEA'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
            >
              <XCircle size={18} />
              Reject
            </button>
            <button 
              onClick={handleApprove}
              className="flex items-center gap-2 px-4 py-2 font-medium text-white rounded-xl shadow-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#9BC7D8' }} 
            >
              <CheckCircle size={18} />
              Approve Application
            </button>
          </div>
        )}
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
                      <p className="text-sm font-medium text-slate-800">{organization.contactPerson}</p>
                      <p className="text-xs text-slate-500">Primary Contact</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{organization.email}</p>
                      <p className="text-xs text-slate-500">Email Address</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{organization.phone}</p>
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
                      <p className="text-sm font-medium text-slate-800">{organization.address}</p>
                      <p className="text-xs text-slate-500">Registered Address</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{organization.yearsOfOperation} Years</p>
                      <p className="text-xs text-slate-500">Years of Operation</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100/50">
                    <p className="text-sm text-slate-700 italic">"{organization.description}"</p>
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
              {organization.documents.map((doc, index) => (
                <div key={index} className="p-3 border border-slate-100 rounded-xl flex items-center justify-between hover:border-[#9BC7D8] hover:bg-[#EAF6FB]/50 transition-colors group">
                  <div className="flex items-center gap-3 w-full overflow-hidden">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-500 group-hover:text-[#9BC7D8] group-hover:bg-white transition-colors flex-shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium text-slate-800 truncate">{doc.name}</p>
                      <p className="text-xs text-slate-400">{doc.type} • {doc.size}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2">
                    <button className="p-1.5 text-slate-400 hover:text-[#9BC7D8] rounded" title="Preview">
                      <Eye size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-[#9BC7D8] rounded" title="Download">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
                style={{ focusRing: '#D67A5C' }}
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
                onMouseEnter={(e) => { if (rejectReason.trim()) e.currentTarget.style.backgroundColor = '#C4684D'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#D67A5C'; }}
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