import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { time: '8 AM', orders: 12, sales: 150 },
  { time: '10 AM', orders: 25, sales: 300 },
  { time: '12 PM', orders: 45, sales: 600 },
  { time: '2 PM', orders: 30, sales: 400 },
  { time: '4 PM', orders: 15, sales: 200 },
  { time: '6 PM', orders: 60, sales: 800 },
  { time: '8 PM', orders: 50, sales: 700 },
];

const TodayChart = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-[#1F5E2A] mb-4">Today's Orders & Sales</h3>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" stroke="#888" fontSize={12} />
            <YAxis stroke="#888" fontSize={12} />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#A7D63B"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Orders"
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#9BC7D8"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Sales ($)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TodayChart;
