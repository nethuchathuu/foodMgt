const fs = require('fs');
let content = fs.readFileSync('e:/foodMgt/frontend/src/components/admin/donation/viewDonation.jsx', 'utf8');

if (!content.includes('import axios')) {
  content = content.replace(/import { useParams, useNavigate } from 'react-router-dom';/, "import { useParams, useNavigate } from 'react-router-dom';\nimport axios from 'axios';\nimport { useEffect, useState } from 'react';");
}

let newComponentStart = `const ViewDonationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(\`http://localhost:5000/api/admin/donations/\${id}\`, { headers: { Authorization: '\\u0042earer ' + token }});
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
  const adaptedRequest = {
    id: request._id,
    status: request.status,
    dateRaw: request.createdAt,
    date: new Date(request.createdAt).toLocaleDateString(),
    time: new Date(request.createdAt).toLocaleTimeString(),
    isUrgent: request.isUrgent,
    organization: {
      name: request.organization,
      type: 'NPO', 
      contact: 'Unknown Admin Data',
      phone: ''
    },
    requestDetails: {
      food: request.requestedFood,
      quantity: request.quantity,
      reason: request.reason || 'No reason provided',
      dietaryMatches: request.dietaryDetails || []
    },
    statusDetails: {
      approvalTime: '--:--',
      notes: request.adminNotes || 'Awaiting admin review.',
      reviewer: 'Pending Review'
    },
    timeline: [
      { time: new Date(request.createdAt).toLocaleTimeString(), title: 'Request Submitted', desc: 'Organization created the donation request.', completed: true },
      { time: '--:--', title: 'Admin Review', desc: 'Pending administrator decision.', completed: request.status !== 'Pending' }
    ]
  };
`;

content = content.replace(/const ViewDonationDetails = \(\) => \{[\s\S]*?const statusColors = \{/, newComponentStart + '\n  const statusColors = {');
// Swap references in the component from 'request' to 'adaptedRequest'
content = content.replace(/request\./g, 'adaptedRequest.');

fs.writeFileSync('e:/foodMgt/frontend/src/components/admin/donation/viewDonation.jsx', content);
