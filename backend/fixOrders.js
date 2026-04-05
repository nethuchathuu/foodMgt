const fs = require('fs');
const file = '../frontend/src/components/admin/orderMonitoring/orderMonitoring.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace imports and add useEffect
content = content.replace("import React, { useState, useMemo } from 'react';", "import React, { useState, useEffect, useMemo } from 'react';");

// Remove mockOrders block
content = content.replace(/const mockOrders = \[[^\]]*\];/g, '');

const fetchCode = `  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/orders', {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const stats`;

content = content.replace("  const stats", fetchCode);

const statsCode = `[
    { label: "Total Orders", value: orders.length, color: "#9BC7D8", bg: "#EAF6FB", icon: <Clock size={24}/> },
    { label: "Pending", value: orders.filter(o => o.status === 'Pending').length, color: "#E9A38E", bg: "#FFF4F0", icon: <AlertCircle size={24}/> },
    { label: "Completed", value: orders.filter(o => o.status === 'Completed').length, color: "#6FAFC4", bg: "#EBF4F7", icon: <CheckCircle2 size={24}/> },
    { label: "Cancelled", value: orders.filter(o => o.status === 'Cancelled').length, color: "#D67A5C", bg: "#FDECEA", icon: <XCircle size={24}/> }
  ];`;

// Replace existing stats array
content = content.replace(/\[\s*{\s*label:\s*"Total Orders"[^\]]*\];/, statsCode);

// Update mockOrders to orders
content = content.replace(/mockOrders\./g, 'orders.');

// Rename property accesses to match API response
content = content.replace(/order\.customer/g, '(order.customerName || "")');
content = content.replace(/order\.restaurant/g, '(order.restaurantName || "")');
content = content.replace(/order\.foodItem/g, '(order.foodName || "")');
content = content.replace(/order\.price/g, '(order.totalPrice || 0)');
content = content.replace(/order\.date/g, 'order.date'); // Date remains same or `createdAt`

fs.writeFileSync(file, content);
