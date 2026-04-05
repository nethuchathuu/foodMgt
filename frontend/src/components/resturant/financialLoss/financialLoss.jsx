import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import WastedLoss from './wastedLoss';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Trash2, FileText } from 'lucide-react';

const FinancialLoss = () => {
  const [wastedData, setWastedData] = useState([]);
  const [totalLoss, setTotalLoss] = useState(0);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [listRes, totalsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/wastage/today', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:5000/api/financial-loss/today', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      const data = listRes.data.map(item => ({
        id: item._id,
        foodName: item.foodName,
        quantity: item.quantity,
        unit: item.unit,
        loss: item.totalLoss,
        reason: item.reason
      })) || [];
      setWastedData(data);
      
      const calculatedTotal = data.reduce((sum, item) => sum + item.loss, 0);
      setTotalLoss(totalsRes.data?.totalLoss || calculatedTotal);
    } catch (err) {
      console.error('Error fetching financial loss data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClearAll = () => {
    setIsConfirmOpen(true);
  };

  const confirmClearAll = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:5000/api/restaurants/clear-financial-loss', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsConfirmOpen(false);
      fetchData();
    } catch (err) {
      console.error('Error clearing data:', err);
      alert('Failed to clear data.');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const totalWasted = wastedData.reduce((sum, item) => sum + item.loss, 0);

    // Title & Logo Setup
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(31, 94, 42); // #1F5E2A (Title green)
    doc.text("Financial Loss Report", 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 30);

    // Summary Box
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(248, 248, 246);
    doc.roundedRect(14, 38, 182, 28, 3, 3, "FD");

    doc.setFontSize(12);
    doc.setTextColor(120, 120, 120);
    doc.text("Total Wasted Loss", 20, 48);
    
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(214, 122, 92); // #D67A5C (Loss text color)
    doc.text(`Rs. ${totalWasted.toLocaleString()}`, 20, 58);

    // Table Content
    const tableColumn = ["Item Name", "Quantity", "Loss Amount (Rs.)"];
    const tableRows = [];

    wastedData.forEach(item => {
      const itemData = [
        item.foodName,
        `${item.quantity} ${item.unit}`,
        item.loss.toLocaleString()
      ];
      tableRows.push(itemData);
    });

    autoTable(doc, {
      startY: 75,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: {
        fillColor: [31, 94, 42],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [250, 250, 250]
      },
      styles: {
        font: 'helvetica',
        fontSize: 10,
        cellPadding: 5
      }
    });

    doc.save(`financial-loss-report-${new Date().toISOString().slice(0,10)}.pdf`);
  };

  return (
    <div className="bg-[#F8F8F6] min-h-screen p-4 sm:p-8 font-sans pb-24 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F5E2A] flex items-center gap-3">
                Financial Loss Analysis 💸
              </h1>
              <p className="text-gray-500 mt-2 text-lg">Track where your money is being lost due to food left behind.</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3">
              <button 
                onClick={generatePDF}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-[#1F5E2A] text-[#1F5E2A] rounded-xl hover:bg-[#F0F8EC] transition shadow-sm font-semibold"
              >
                <FileText size={18} />
                Get Report PDF
              </button>
              <button 
                onClick={handleClearAll}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition shadow-sm font-semibold"
              >
                <Trash2 size={18} />
                Clear All
              </button>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center gap-2 bg-gradient-to-r from-white to-[#F8F8F6]">
            <p className="text-sm font-bold text-gray-500 tracking-wider uppercase">Total Financial Loss</p>
            <p className="text-4xl sm:text-5xl font-black text-[#D67A5C] tracking-tight">Rs. {totalLoss.toLocaleString()}</p>
          </div>
        </motion.div>
        <div className="mt-6">
          <WastedLoss data={wastedData} />
        </div>

      </div>

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Trash2 className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Restart Tracking?</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Are you sure you want to clear your current progress and restart the daily tracking? This action cannot be undone.
            </p>
            <div className="flex gap-4 w-full">
              <button 
                onClick={() => setIsConfirmOpen(false)}
                className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmClearAll}
                className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all active:scale-95"
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialLoss;
