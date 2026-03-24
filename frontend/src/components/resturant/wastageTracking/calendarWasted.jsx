import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays,
  parseISO
} from 'date-fns';
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';

// dummy data for calendar insights
const wastageDates = {
  "2026-03-15": { level: 'low', amount: '5kg' },
  "2026-03-20": { level: 'high', amount: '35kg' },
  "2026-03-22": { level: 'medium', amount: '15kg' },
  "2026-03-24": { level: 'low', amount: '2kg' },
  "2026-03-25": { level: 'high', amount: '42kg' },
};

const CalendarWasted = () => {
  const [currentDate, setCurrentDate] = useState(new Date("2026-03-24"));
  const [selectedDate, setSelectedDate] = useState(new Date("2026-03-24"));

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const onDateClick = (day) => setSelectedDate(day);

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#1F5E2A]">
          {format(currentDate, 'MMMM yyyy')}
        </h3>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition"><ChevronLeft size={20} /></button>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition"><ChevronRight size={20} /></button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEE";
    let startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center font-bold text-sm text-gray-400 py-2" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        
        const dateKey = format(day, 'yyyy-MM-dd');
        const hasWastage = wastageDates[dateKey];
        
        days.push(
          <div
            className={`relative p-3 text-center cursor-pointer transition-all border border-transparent
              ${!isSameMonth(day, monthStart) ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-50'}
              ${isSameDay(day, selectedDate) ? 'bg-[#A7D63B]/20 text-[#1F5E2A] font-bold border-[#A7D63B] rounded-xl z-10' : 'rounded-xl'}
            `}
            key={day}
            onClick={() => onDateClick(parseISO(cloneDay.toISOString()))}
          >
            <span className={isSameDay(day, new Date()) ? "w-7 h-7 flex items-center justify-center bg-[#1F5E2A] text-white rounded-full mx-auto" : ""}>
              {formattedDate}
            </span>

            {/* Indicators */}
            {hasWastage && (
               <div className="absolute top-1 right-1 flex space-x-0.5">
                 <div className={`w-2 h-2 rounded-full shadow-sm ${
                   hasWastage.level === 'high' ? 'bg-[#D67A5C]' : 
                   hasWastage.level === 'medium' ? 'bg-[#E9A38E]' : 'bg-[#C8E66A]'
                 }`}></div>
               </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="bg-white p-4">{rows}</div>;
  };

  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const selectedInfo = wastageDates[selectedDateStr];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#D8C3A5]/30 p-6">
      {renderHeader()}
      {renderDays()}
      {renderCells()}

      {/* Selected Day Info */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <h4 className="font-bold text-gray-800 mb-4 flex justify-between items-center">
            {format(selectedDate, 'MMMM d, yyyy')}
            {isSameDay(selectedDate, new Date()) && <span className="text-xs bg-[#1F5E2A] text-white px-2 py-0.5 rounded-md">Today</span>}
        </h4>
        
        {selectedInfo ? (
            <div className={`p-4 rounded-xl flex items-start gap-4 border ${
                selectedInfo.level === 'high' ? 'bg-red-50 border-red-100 text-red-800' : 
                'bg-green-50 border-green-100 text-green-800'
            }`}>
               {selectedInfo.level === 'high' ? <AlertTriangle className="text-red-500 mt-0.5" /> : <div className="w-2 h-2 mt-2 ml-2 rounded-full bg-green-500"></div>}
               <div>
                  <p className="font-bold">{selectedInfo.amount} Food Wasted</p>
                  <p className="text-sm opacity-80 mt-1">
                      {selectedInfo.level === 'high' ? 'Warning: High volume of waste recorded. View daily report for details.' : 'Within normal operational parameters.'}
                  </p>
               </div>
            </div>
        ) : (
            <div className="text-center py-6 text-gray-500 text-sm border-2 border-dashed border-gray-100 rounded-xl">
                No wastage recorded for this date.
            </div>
        )}
      </div>
    </div>
  );
};

export default CalendarWasted;
