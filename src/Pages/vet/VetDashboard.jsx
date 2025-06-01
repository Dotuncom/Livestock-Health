import React from "react";
import FarmerSummaryCard from "../../components/FarmerSummaryCard";
import AppointmentList from "../../components/AppointmentList";
import NotificationList from "../../components/NotificationList";
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
    <div className="px-[70px] space-y-6">
      <h1 className=" md:text-4xl font-bold">Dashboard Overview</h1>
      {/* Summary Cards */}
      <div className="grid grid-cols-1  md:grid-cols-3 gap-10 mb-8">
        {summaryCards.map((card, idx) => (
          <FarmerSummaryCard
            key={idx}
            title={card.title}
            count={card.count}
            icon={card.icon}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 md:gap-[62px]">
        <div>
          <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-3">
            Notifications
          </h3>

          <AppointmentList />
        </div>
        <div>
          <h3 className="text-lg Poppins font-semibold text-gray-800 mb-3">
            Appointment
          </h3>
          <NotificationList />
        </div>
      </div>
    </div>
  );
};

export default VetDashboard;
