import React, { useState } from 'react';
import { Eye, Edit2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ViewRequests({ requests = [], loading = false }) {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const openModal = (type, req) => {
    setSelectedRequest(req);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedRequest(null);
  };

  const handleEditSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      const foodTypeVal = document.getElementById('editFoodType')?.value;
      const quantityVal = document.getElementById('editQuantity')?.value;
      const descVal = document.getElementById('editDescription')?.value;

      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/food-requests/${selectedRequest._id || selectedRequest.id}`, {
        foodType: foodTypeVal,
        quantity: quantityVal,
        description: descVal
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // reload the page to fetch the newly updated list
      window.location.reload();
    } catch (error) {
      console.error('Failed to update request:', error);
      alert('Failed to update request.');
    }
    closeModal();
  };

  const handleCancelSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/food-requests/${selectedRequest._id || selectedRequest.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      window.location.reload();
    } catch (error) {
      console.error('Failed to cancel request:', error);
      alert('Failed to cancel request.');
    }
    closeModal();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#E9A38E';
      case 'Approved': return '#9BC7D8';
      case 'Rejected': return '#D67A5C';
      default: return '#D8C3A5';
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="py-12 text-center text-gray-500 bg-white rounded-2xl border border-dashed" style={{ borderColor: '#D8C3A5' }}>
            <p>Loading requests...</p>
          </div>
        ) : (
          requests.map(req => (
          <div 
            key={req._id || req.id} 
            className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            style={{ borderColor: '#D8C3A5' }}
          >
            {/* Info Section */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold" style={{ color: '#1F5E2A' }}>{req.foodType}</h3>
                <span 
                  className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: getStatusColor(req.status) }}
                >
                  {req.status}
                </span>
              </div>
              <p className="font-medium mb-1" style={{ color: '#D67A5C' }}>{req.quantity} portions requested</p>
              <p className="text-sm truncate max-w-md" style={{ color: '#9BC7D8' }}>"{req.description}"</p>
              <p className="text-xs font-medium mt-2 opacity-80" style={{ color: '#1F5E2A' }}>Requested on: {req.date}</p>
            </div>

            {/* Actions Section */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <Link
                to={`/receiver/requests/${req._id || req.id}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white transition-transform hover:scale-105 shadow-sm text-sm"
                style={{ backgroundColor: '#9BC7D8' }}
              >
                <Eye className="w-4 h-4" /> View Details
              </Link>
              
              {req.status === 'Pending' && (
                <>
                  <button
                    onClick={() => openModal('edit', req)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white transition-opacity hover:opacity-90 shadow-sm text-sm"
                    style={{ backgroundColor: '#E9A38E' }}
                  >
                    <Edit2 className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => openModal('cancel', req)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold border transition-colors hover:bg-gray-50 text-sm"
                    style={{ borderColor: '#D8C3A5', color: '#1F5E2A' }}
                  >
                    <XCircle className="w-4 h-4" /> Cancel
                  </button>
                </>
              )}
            </div>
          </div>
          ))
        )}

        {!loading && requests.length === 0 && (
          <div className="py-12 text-center text-gray-500 bg-white rounded-2xl border border-dashed" style={{ borderColor: '#D8C3A5' }}>
            <p>No donation requests found.</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {activeModal === 'edit' && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-scale">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold" style={{ color: '#1F5E2A' }}>Edit Request</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Food Type Needed</label>
                  <input type="text" id="editFoodType" defaultValue={selectedRequest.foodType} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#9BC7D8]" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Quantity</label>
                  <input type="number" id="editQuantity" defaultValue={selectedRequest.quantity} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#9BC7D8]" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea id="editDescription" defaultValue={selectedRequest.description} rows="3" className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#9BC7D8] resize-none" required></textarea>
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl font-bold" style={{ backgroundColor: '#D8C3A5', color: '#1F5E2A' }}>Cancel</button>
                  <button type="button" onClick={handleEditSubmit} className="flex-[2] py-3 rounded-xl font-bold text-white shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5" style={{ backgroundColor: '#9BC7D8' }}>Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {activeModal === 'cancel' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-fade-scale text-center p-8">
            <XCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#D67A5C' }} />
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#1F5E2A' }}>Cancel Request?</h2>
            <p className="text-gray-600 mb-8">Are you sure you want to cancel this request? This action cannot be undone.</p>
            <div className="flex gap-3">
               <button onClick={closeModal} className="flex-1 py-3 rounded-xl font-bold" style={{ backgroundColor: '#D8C3A5', color: '#1F5E2A' }}>No</button>
               <button onClick={handleCancelSubmit} className="flex-1 py-3 rounded-xl font-bold text-white shadow-md hover:opacity-90" style={{ backgroundColor: '#D67A5C' }}>Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}