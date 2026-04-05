import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Leaf, Trash2, FileText } from 'lucide-react';
import axios from 'axios';
import AddWasted from './addWasted';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const WastageTracking = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchTodayWastage = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/wastage/today', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLogs(res.data || []);
      } catch (err) {
        console.error('Failed to fetch today wastage:', err);
      }
    };
    fetchTodayWastage();
  }, []);

  const handleAddLog = (newLog) => {
    setLogs([{ ...newLog }, ...logs]);
  };

  const groupedLogs = logs.reduce((acc, log) => {
    if (!acc[log.foodName]) {
      acc[log.foodName] = { 
        items: [], 
        total: 0, 
        unit: log.unit 
      };
    }
    acc[log.foodName].items.push(log);
    acc[log.foodName].total += Number(log.quantity);
    return acc;
  }, {});

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear all wastage records for today?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:5000/api/wastage/today', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLogs([]);
    } catch (err) {
      console.error('Failed to clear today wastage:', err);
      alert('Failed to clear wastage');
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this wastage record?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/wastage/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLogs(logs.filter(log => log._id !== id));
    } catch (err) {
      console.error('Failed to delete wastage record:', err);
      alert('Failed to delete record');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(31, 94, 42); 
    doc.text("Daily Wastage Report", 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 30);

    const tableColumn = ["Food Name", "Reason", "Quantity", "Loss Amount (Rs.)"];
    const tableRows = [];

    logs.forEach(item => {
      tableRows.push([
        item.foodName,
        item.reason,
        `${item.quantity} ${item.unit}`,
        item.totalLoss ? item.totalLoss.toLocaleString() : '0'
      ]);
    });

    autoTable(doc, {
      startY: 40,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: {
        fillColor: [31, 94, 42],
        textColor: 255,
        fontStyle: 'bold'
      },
      styles: {
        font: 'helvetica',
        fontSize: 10,
        cellPadding: 5
      }
    });

    doc.save(`wastage-report-${new Date().toISOString().slice(0,10)}.pdf`);
  };

  return (
    <div className="bg-[#F8F8F6] min-h-screen p-6 font-sans pb-24 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 mb-8 pt-4"
        >
          <div>
            <h1 className="text-3xl font-extrabold text-[#1F5E2A] flex items-center gap-2">
              Today's Wastage ♻️
            </h1>
            <p className="text-gray-500 mt-1">Track and reduce daily food waste</p>
          </div>
          
          <div className="flex flex-row overflow-x-auto gap-2 pb-2 scrollbar-hide">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generatePDF}
              disabled={logs.length === 0}
              className="bg-white text-[#1F5E2A] border border-[#1F5E2A] px-4 py-3 rounded-2xl font-bold shadow-sm hover:bg-[#F0F8EC] transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileText size={18} /> <span className="hidden sm:inline">PDF Report</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearAll}
              disabled={logs.length === 0}
              className="bg-red-100 text-red-600 px-4 py-3 rounded-2xl font-bold shadow-sm hover:bg-red-200 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={18} /> <span className="hidden sm:inline">Clear All</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#D67A5C] text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-[#E9A38E] transition flex items-center gap-2"
            >
              <PlusCircle size={20} /> <span className="hidden sm:inline">Add Wastage</span>
            </motion.button>
          </div>
        </motion.div>

        {/* List Content */}
        {logs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-gray-400 mt-16 p-10 bg-white/50 rounded-3xl border border-dashed border-[#D8C3A5]"
          >
            <Leaf size={48} className="mx-auto mb-4 text-[#A7D63B] opacity-50" />
            <p className="text-xl font-semibold text-[#1F5E2A]">No wastage recorded today 🌿</p>
            <p className="text-md mt-2">Great job! Keep reducing food waste.</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {Object.entries(groupedLogs).map(([foodName, group]) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={foodName}
                  className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition group"
                >
                  <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-3">
                    <h2 className="text-xl font-bold text-[#1F5E2A] flex items-center gap-2">
                       {foodName}
                    </h2>
                    <div className="text-sm font-semibold text-[#D67A5C] bg-[#D67A5C]/10 px-3 py-1 rounded-lg">
                      Total: {group.total} {group.unit}
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    {group.items.map((item, idx) => (
                      <motion.div 
                        key={item._id || idx}
                        whileHover={{ x: 4 }}
                        className="flex justify-between items-center bg-[#F8F8F6] px-4 py-3 rounded-xl group/item"
                      >
                        <span className="text-sm text-gray-600 font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#A7D63B]"></span>
                          {item.reason}
                        </span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold text-[#1F5E2A]">
                            {item.quantity} {item.unit}
                          </span>
                          <button 
                            onClick={() => handleDeleteItem(item._id)}
                            className="text-red-400 hover:text-red-600 p-1.5 bg-red-50 rounded-lg transition-colors hover:bg-red-100"
                            title="Delete this wastage record"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isAddModalOpen && (
          <AddWasted 
            isOpen={isAddModalOpen} 
            onClose={() => setIsAddModalOpen(false)} 
            onSave={handleAddLog}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WastageTracking;
