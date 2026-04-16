import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, MapPin, Phone, MessageSquare, Utensils, CreditCard, Hash, Package, Clock, CheckCircle2, History } from 'lucide-react';

const ViewOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const statusColors = {
    Pending: { bg: '#FFF4F0', text: '#E9A38E' },
    Accepted: { bg: '#EAF6FB', text: '#5C9DB5' },
    Completed: { bg: '#EAF6FB', text: '#9BC7D8' },
    Cancelled: { bg: '#FDECEA', text: '#D67A5C' }
  };

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/orders/${id}`, {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (!response.ok) throw new Error('Order not found');
      const data = await response.json();
      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center font-['Poppins']">Loading order details...</div>;
  if (error || !order) return <div className="p-10 text-center text-red-500 font-['Poppins']">Error: {error || 'Not found'}</div>;

  const currentStatusStyle = statusColors[order.status] || { bg: '#f1f5f9', text: '#475569' };


  return (
    <div className="p-6 font-['Poppins'] min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/orders')}
            className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-50 transition-colors text-slate-600 border border-slate-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">Order Details</h1>
              <span 
                className="px-3 py-1 rounded-full text-xs font-bold shadow-sm"
                style={{ backgroundColor: currentStatusStyle.bg, color: currentStatusStyle.text }}
              >
                {order.status === 'Accepted' ? 'Approved' : order.status}
              </span>
            </div>
            <p className="text-slate-500 text-sm flex items-center gap-2 mt-1">
              <Hash size={14}/> {order.id}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Spans 2): Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Items & Pricing Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-4 flex items-center gap-2">
              <Utensils className="text-[#9BC7D8]" size={20} />
              Order Items
            </h2>
            
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-slate-700">
                      x{item.quantity}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{item.name}</p>
                      <span className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-100 mt-1 inline-block">
                        {item.dietary}
                      </span>
                    </div>
                  </div>
                  <p className="font-bold text-slate-800">Rs. {Number(item.price).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="flex justify-between text-sm text-slate-500 mb-2">
                <span>Subtotal</span>
                <span>Rs. {Number(order.financials.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500 mb-4">
                <span>Tax</span>
                <span>Rs. {Number(order.financials.tax).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="flex items-center gap-2"><CreditCard size={20} className="text-[#9BC7D8]"/> Total Due</span>
                <span style={{ color: '#9BC7D8' }}>Rs. {Number(order.financials.total).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Info Card */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-5 flex items-center gap-2">
                <User className="text-[#9BC7D8]" size={20} />
                Customer Info
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Name</p>
                  <p className="font-medium text-slate-800">{order.customer.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Contact</p>
                  <p className="font-medium text-slate-800 flex items-center gap-2">
                    <Phone size={14} className="text-slate-400" /> {order.customer.phone}
                  </p>
                </div>
                {order.customer.notes && (
                  <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                    <p className="text-xs text-orange-600 font-medium uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <MessageSquare size={12} /> Notes from customer
                    </p>
                    <p className="text-sm text-slate-700 italic">"{order.customer.notes}"</p>
                  </div>
                )}
              </div>
            </div>

            {/* Restaurant Info Card */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-5 flex items-center gap-2">
                <Package className="text-[#9BC7D8]" size={20} />
                Restaurant Info
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Name</p>
                  <p className="font-medium text-slate-800">{order.restaurant.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Location</p>
                  <p className="text-sm font-medium text-slate-800 flex items-start gap-2">
                    <MapPin size={16} className="text-slate-400 mt-0.5 flex-shrink-0" /> {order.restaurant.location}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Contact</p>
                  <p className="font-medium text-slate-800 flex items-center gap-2">
                    <Phone size={14} className="text-slate-400" /> {order.restaurant.contact}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Status & Timeline */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100 h-fit">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <History className="text-[#9BC7D8]" size={22} />
            Order Timeline
          </h2>
          
          <div className="bg-slate-50 rounded-xl p-4 mb-8 border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">Method</p>
              <p className="font-bold text-slate-800">{order.deliveryMethod}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 font-medium mb-1">Date Created</p>
              <p className="font-bold text-slate-800 text-sm">
                {new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
          </div>

          <div className="relative pl-3">
            {/* Vertical Line */}
            <div className="absolute left-4 top-2 bottom-6 w-0.5 bg-slate-200 rounded-full"></div>
            
            {order.timeline.map((event, idx) => (
              <div key={idx} className="relative mb-8 last:mb-0">
                {/* Node marker */}
                <div className={`absolute -left-1.5 p-1 rounded-full bg-white ${event.completed ? 'text-[#9BC7D8]' : 'text-slate-300'}`}>
                  {event.completed ? <CheckCircle2 size={20} className="fill-current text-white" /> : <Clock size={20} />}
                </div>
                
                <div className="ml-8">
                  <div className="flex justify-between items-start mb-1">
                    <p className={`font-bold ${event.completed ? 'text-slate-800' : 'text-slate-400'}`}>
                      {event.status}
                    </p>
                    <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                      {event.time === '--:--' && event.status === 'Preparing Order' && order.status === 'Accepted' && order.acceptedAt ? new Date(order.acceptedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : event.time === '--:--' && event.status === 'Completed' && order.status === 'Completed' && order.completedAt ? new Date(order.completedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : event.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 leading-snug">
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default ViewOrderDetails;