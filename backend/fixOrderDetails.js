const fs = require('fs');
const file = '../frontend/src/components/admin/orderMonitoring/viewOrderDetails.jsx';
let content = fs.readFileSync(file, 'utf8');

// replace imports
content = content.replace("import React from 'react';", "import React, { useState, useEffect } from 'react';");

// remove mock order block
content = content.replace(/\/\/ Mock specific order data based on parameter\s*const order = {[\s\S]*?\]\s*};\s*const statusColors/m, "const statusColors");

const hookCode = `  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(\`http://localhost:5000/api/admin/orders/\${id}\`, {
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
`;

content = content.replace(/  const statusColors[\s\S]*?const currentStatusStyle[^;]*;/m, `  const statusColors = {
    Pending: { bg: '#FFF4F0', text: '#E9A38E' },
    Completed: { bg: '#EAF6FB', text: '#9BC7D8' },
    Cancelled: { bg: '#FDECEA', text: '#D67A5C' }
  };\n\n${hookCode}`);

fs.writeFileSync(file, content);
