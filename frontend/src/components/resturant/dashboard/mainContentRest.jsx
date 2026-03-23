import React from 'react';
import TotalFood from './totalFood';
import TodayOrders from './todayOrders';
import TotalFoodWastage from './totalFoodWastage';
import RequestedDonations from './requestedDonations';
import MoneyLost from './MoneyLost';
import TodayChart from './todayChart';

const MainContentRest = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        <TotalFood />
        <TodayOrders />
        <TotalFoodWastage />
        <RequestedDonations />
        <MoneyLost />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <TodayChart />
      </div>
    </div>
  );
};

export default MainContentRest;
