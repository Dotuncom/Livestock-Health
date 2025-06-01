import React from "react";
import RecentReports from "../../components/RecentReport";
import FarmerActivityLog from "../../components/FarmerActivityLog";
import FarmerSummaryCard from '../../components/FarmerSummaryCard'
const VetDashboard = () => {
  
  const summaryCards = [
    {
      title: "Total Farmers",
      count: 13,
      icon: "mdi:account-multiple",
    },
    {
      title: "Appointment",
      count: 4,
      icon: "mdi:calendar-check",
    },
    {
      title: "Recent Report",
      count: 4,
      icon: "mdi:chart-bar",
    },
    
  ];

  return (
    <div className="p-6  min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1  md:grid-cols-3 gap-4 mb-8">
        {summaryCards.map((card, idx) => (
          <FarmerSummaryCard
            key={idx}
            title={card.title}
            count={card.count}
            icon={card.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FarmerActivityLog />
        <RecentReports />
      </div>
    </div>
  );
};

export default VetDashboard;
