import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TotalFood from './totalFood';
import TodayOrders from './todayOrders';
import MoneyLost from './MoneyLost';
import TodayChart from './todayChart';

const MainContentRest = () => {
  const [summary, setSummary] = useState({
    totalFood: 0,
    todayOrders: 0,
    wastage: 0,
    loss: 0
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token');
        const summaryRes = await axios.get('http://localhost:5000/api/restaurants/dashboard-summary', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const todayLossRes = await axios.get('http://localhost:5000/api/financial-loss/today', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSummary({
          totalFood: summaryRes.data.totalFood,
          todayOrders: summaryRes.data.todayOrders,
          wastage: summaryRes.data.wastage,
          loss: todayLossRes.data.totalLoss || 0
        });
      } catch (err) {
        console.error('Error fetching dashboard summary:', err);
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <TotalFood data={summary.totalFood} />
        <TodayOrders data={summary.todayOrders} />
        <MoneyLost data={summary.loss} />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <TodayChart />
      </div>
    </div>
  );
};

export default MainContentRest;
