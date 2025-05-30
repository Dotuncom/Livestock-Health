import React from "react";
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
    {
      title: "Farmers",
      count:5,
      icon: "mdi:account-group",
    },
  ];

  return (
    <div className="p-6  min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {summaryCards.map((card, idx) => (
          <FarmerSummaryCard
            key={idx}
            title={card.title}
            count={card.count}
            icon={card.icon}
          />
        ))}
      </div>

      {/* More components like FarmerList will go here */}
    </div>
  );
};

export default VetDashboard;
