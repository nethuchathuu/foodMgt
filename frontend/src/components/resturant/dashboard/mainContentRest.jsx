import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TotalFood from './totalFood';
import TodayOrders from './todayOrders';
import TotalFoodWastage from './totalFoodWastage';
import RequestedDonations from './requestedDonations';
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
        const res = await axios.get('http://localhost:5000/api/restaurants/dashboard-summary', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSummary(res.data);
      } catch (err) {
        console.error('Error fetching dashboard summary:', err);
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        <TotalFood data={summary.totalFood} />
        <TodayOrders data={summary.todayOrders} />
        <TotalFoodWastage data={summary.wastage} />
        <RequestedDonations />
        <MoneyLost data={summary.loss} />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <TodayChart />
      </div>
    </div>
  );
};

export default MainContentRest;
