import React from "react";
import FarmerSummaryCard from "../../components/FarmerSummaryCard";
import AppointmentList from "../../components/AppointmentList";
import NotificationList from "../../components/NotificationList";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";

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

  const {
    data: livestockData,
    isLoading: livestockLoading,
    error: livestockError,
  } = useQuery({
    queryKey: ["livestock"],
    queryFn: async () => {
      const { data, error } = await supabase.from("livestock").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onError: (err) => {
      toast.error("Error fetching livestock data: " + err.message);
    },
  });

  const {
    data: alertsData,
    isLoading: alertsLoading,
    error: alertsError,
  } = useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("alerts").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onError: (err) => {
      toast.error("Error fetching alerts data: " + err.message);
    },
  });

  const handleSuccess = () => {
    toast.success("Dashboard data updated successfully!");
  };

  return (
    <div className="px-[40px] space-y-6">
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
      {/* Livestock Overview */}
      <div className="bg-[#f8f9fa] rounded-lg p-4 shadow">
        <h2 className="font-semibold text-xl mb-4">Livestock Overview</h2>
        {livestockLoading ? (
          <p>Loading livestock data...</p>
        ) : livestockError ? (
          <p>Error: {livestockError.message}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {livestockData &&
              livestockData.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded shadow">
                  <h3 className="font-medium">{item.name}</h3>
                  <p>Status: {item.status}</p>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Alerts Overview */}
      <div className="bg-[#f8f9fa] rounded-lg p-4 shadow">
        <h2 className="font-semibold text-xl mb-4">Recent Alerts</h2>
        {alertsLoading ? (
          <p>Loading alerts data...</p>
        ) : alertsError ? (
          <p>Error: {alertsError.message}</p>
        ) : (
          <div className="space-y-2">
            {alertsData &&
              alertsData.map((alert) => (
                <div key={alert.id} className="bg-white p-4 rounded shadow">
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-sm text-gray-600">
                    Severity: {alert.severity}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSuccess}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
      >
        Refresh Data
      </button>
    </div>
  );
};

export default VetDashboard;
