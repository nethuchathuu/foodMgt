import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ArrowLeft, Building, Utensils, Package, Clock, Zap, CheckCircle2, XCircle, FileText, Activity, Hash, History } from 'lucide-react';

const ViewDonationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/admin/donations/${id}`, { headers: { Authorization: '\u0042earer ' + token }});
        setRequest(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDonation();
  }, [id]);

  if (loading) return <div className="p-10">Loading donation...</div>;
  if (!request) return <div className="p-10 text-red-500">Donation not found!</div>;

  // Adapt backend data to frontend mock shape
  const requestFormatted = {
    id: request.id || request._id,
    status: request.status || 'Pending',
    dateRaw: request.dateRaw || request.createdAt,
    date: new Date(request.dateRaw || request.createdAt).toLocaleDateString(),
    time: request.time || new Date(request.dateRaw || request.createdAt).toLocaleTimeString(),
    isUrgent: request.isUrgent || false,
    organization: {
      name: request.organization?.name || request.organization || 'Unknown',
      type: request.organization?.type || 'NPO',
      contact: request.organization?.contact || 'Not Provided',
      phone: request.organization?.phone || 'Not Provided'
    },
    requestDetails: {
      food: request.requestDetails?.food || request.requestedFood || 'Unknown',
      quantity: request.requestDetails?.quantity || request.quantity || 0,
      reason: request.requestDetails?.reason || request.purpose || 'No reason provided',
      dietaryMatches: request.requestDetails?.dietaryMatches || []
    },
    statusDetails: {
      approvalTime: request.statusDetails?.approvalTime || '--:--',
      notes: request.statusDetails?.notes || 'Awaiting admin review.',
      reviewer: request.statusDetails?.reviewer || 'Admin'
    },
    timeline: request.timeline || [
      { time: new Date(request.dateRaw || request.createdAt).toLocaleTimeString(), title: 'Request Submitted', desc: 'Organization created the donation request.', completed: true },
      { time: '--:--', title: 'Admin Review', desc: 'Pending administrator decision.', completed: request.status !== 'Pending' }
    ]
  };
const statusColors = {
    Pending: { bg: '#FFF4F0', text: '#E9A38E' },
    Approved: { bg: '#EAF6FB', text: '#9BC7D8' },
    Rejected: { bg: '#FDECEA', text: '#D67A5C' }
  };
  const currentStatusStyle = statusColors[requestFormatted.status] || { bg: '#f1f5f9', text: '#475569' };

  return (
    <div className="p-6 font-['Poppins'] min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/donations')}
            className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-50 transition-colors text-slate-600 border border-slate-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">Donation Request Details</h1>
              <span 
                className="px-3 py-1 rounded-full text-xs font-bold shadow-sm"
                style={{ backgroundColor: currentStatusStyle.bg, color: currentStatusStyle.text }}
              >
                {requestFormatted.status}
              </span>
              {requestFormatted.isUrgent && (
                <span className="flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-bold shadow-sm border border-yellow-100">
                  <Zap size={12} className="fill-current" /> Urgent
                </span>
              )}
            </div>
            <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
              <Hash size={14}/> {requestFormatted.id}
            </p>
          </div>
        </div>

        {/* Action Buttons for Admin */}
        {requestFormatted.status === 'Pending' && (
          <div className="flex gap-3 ml-12 md:ml-0">
            <button className="px-5 py-2.5 bg-white border border-rose-200 text-rose-500 hover:bg-rose-50 rounded-xl font-semibold shadow-sm transition-colors flex items-center gap-2">
              <XCircle size={18} /> Reject
            </button>
            <button className="px-5 py-2.5 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2" style={{ backgroundColor: '#9BC7D8' }}>
              <CheckCircle2 size={18} /> Approve
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Spans 2): Request Info & Org Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Request Information Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100 relative overflow-hidden">
            {requestFormatted.isUrgent && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 to-yellow-500"></div>}
            
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
              <Package className="text-[#9BC7D8]" size={20} />
              Request Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1 flex items-center gap-1.5"><Utensils size={14}/> Food Requested</p>
                <p className="text-lg font-bold text-slate-800">{requestFormatted.requestDetails.food}</p>
                <div className="flex gap-2 mt-2">
                  {requestFormatted.requestDetails.dietaryMatches.map((diet, i) => (
                    <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-600">{diet}</span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-center">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1 flex items-center gap-1.5">Quantity Needed</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-slate-800 leading-none">{requestFormatted.requestDetails.quantity}</span>
                  <span className="text-slate-500 font-medium mb-1">units</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <FileText size={14}/> Reason / Notes
              </p>
              <p className="text-slate-700 text-sm leading-relaxed">{requestFormatted.requestDetails.reason}</p>
            </div>
          </div>

          {/* Organization Info Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-5 flex items-center gap-2">
              <Building className="text-[#9BC7D8]" size={20} />
              Organization Details
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Name</p>
                  <p className="font-semibold text-slate-800 text-lg">{requestFormatted.organization.name}</p>
                  <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md mt-1">
                    {requestFormatted.organization.type}
                  </span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                 <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Contact Email</p>
                  <p className="font-medium text-slate-700">{requestFormatted.organization.contact}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Phone</p>
                  <p className="font-medium text-slate-700">{requestFormatted.organization.phone}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Status Details & Timeline */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-4 flex items-center gap-2">
              <Activity className="text-[#9BC7D8]" size={20} />
              Status Details
            </h2>
            
            <div className="space-y-4">
               <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Current Status</p>
                  <span className="px-3 py-1 rounded-full text-sm font-bold inline-block" style={{ backgroundColor: currentStatusStyle.bg, color: currentStatusStyle.text }}>
                    {requestFormatted.status}
                  </span>
               </div>
               <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Approval Time</p>
                  <p className="font-medium text-slate-700">{requestFormatted.statusDetails.approvalTime}</p>
               </div>
               <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Admin Notes</p>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-snug">
                    {requestFormatted.statusDetails.notes}
                  </p>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
              <History className="text-[#9BC7D8]" size={20} />
              Request Timeline
            </h2>
            
            <div className="bg-slate-50 rounded-xl p-4 mb-8 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">Status</p>
                <p className="font-bold text-slate-800">{requestFormatted.status}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 font-medium mb-1">Date Created</p>
                <p className="font-bold text-slate-800 text-sm">
                  {requestFormatted.date} {requestFormatted.time}
                </p>
              </div>
            </div>

            <div className="relative pl-3">
              <div className="absolute left-4 top-2 bottom-6 w-0.5 bg-slate-200 rounded-full"></div>
              
              {requestFormatted.timeline.map((event, idx) => (
                <div key={idx} className="relative mb-6 last:mb-0">
                  <div className={`absolute -left-1.5 p-1 rounded-full bg-white ${event.completed ? 'text-[#9BC7D8]' : 'text-slate-300'}`}>
                    {event.completed ? <CheckCircle2 size={18} className="fill-current text-white" /> : <Clock size={18} />}
                  </div>
                  
                  <div className="ml-7">
                    <div className="flex justify-between items-start mb-0.5">
                      <p className={`text-sm font-bold ${event.completed ? 'text-slate-800' : 'text-slate-400'}`}>
                        {event.title}
                      </p>
                    </div>
                    <p className="text-xs font-semibold text-slate-400 mb-1 bg-slate-100 px-2 py-0.5 rounded-md inline-block mt-1">{event.time}</p>
                    <p className="text-xs text-slate-500 leading-snug mt-1">
                      {event.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewDonationDetails;
