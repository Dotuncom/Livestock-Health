import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import VetSummaryCard from "../../components/VetSummaryCard";
import AppointmentList from "../../components/AppointmentList";
import NotificationList from "../../components/NotificationList";
import { format } from "date-fns";

const VetDashboard = () => {
  const queryClient = useQueryClient();

  // Fetch farmers count
  const {
    data: farmersData,
    isLoading: farmersLoading,
    error: farmersError,
  } = useQuery({
    queryKey: ["farmers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("role", "farmer");
      if (error) throw error;
      return data;
    },
  });

  // Fetch appointments count
  const {
    data: appointmentsData,
    isLoading: appointmentsLoading,
    error: appointmentsError,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("vet_id", user.id)
        .gte("appointment_date", new Date().toISOString().split("T")[0]);
      if (error) throw error;
      return data;
    },
  });

  // Fetch recent reports count
  const {
    data: reportsData,
    isLoading: reportsLoading,
    error: reportsError,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .eq("vet_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });

  // Fetch animals data
  const {
    data: animalsData,
    isLoading: animalsLoading,
    error: animalsError,
  } = useQuery({
    queryKey: ["animals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("animals")
        .select("*")
        .order("health_status", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Fetch alerts data
  const {
    data: alertsData,
    isLoading: alertsLoading,
    error: alertsError,
  } = useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .eq("vet_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });

  const handleRefresh = async () => {
    try {
      await Promise.all([
        queryClient.invalidateQueries(["farmers"]),
        queryClient.invalidateQueries(["appointments"]),
        queryClient.invalidateQueries(["reports"]),
        queryClient.invalidateQueries(["animals"]),
        queryClient.invalidateQueries(["alerts"]),
      ]);
      toast.success("Dashboard data refreshed successfully!");
    } catch (error) {
      toast.error("Error refreshing data: " + error.message);
    }
  };

  const summaryCards = [
    {
      title: "Total Farmers",
      count: farmersData?.length || 0,
      icon: "mdi:account-multiple",
      loading: farmersLoading,
      error: farmersError,
    },
    {
      title: "Upcoming Appointments",
      count: appointmentsData?.length || 0,
      icon: "mdi:calendar-check",
      loading: appointmentsLoading,
      error: appointmentsError,
    },
    {
      title: "Recent Reports",
      count: reportsData?.length || 0,
      icon: "mdi:chart-bar",
      loading: reportsLoading,
      error: reportsError,
    },
  ];

  return (
    <div className="px-4 md:px-8 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          Dashboard Overview
        </h1>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Icon icon="mdi:refresh" className="w-5 h-5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map((card, idx) => (
          <VetSummaryCard
            key={idx}
            label={card.title}
            value={
              card.loading ? "Loading..." : card.error ? "Error" : card.count
            }
            icon={card.icon}
          />
        ))}
      </div>

      {/* Appointments and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Upcoming Appointments
          </h3>
          {appointmentsLoading ? (
            <p className="text-gray-600">Loading appointments...</p>
          ) : appointmentsError ? (
            <p className="text-red-600">Error: {appointmentsError.message}</p>
          ) : appointmentsData?.length === 0 ? (
            <p className="text-gray-600">No upcoming appointments</p>
          ) : (
            <AppointmentList appointments={appointmentsData} />
          )}
        </div>

        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Notifications
          </h3>
          {alertsLoading ? (
            <p className="text-gray-600">Loading notifications...</p>
          ) : alertsError ? (
            <p className="text-red-600">Error: {alertsError.message}</p>
          ) : alertsData?.length === 0 ? (
            <p className="text-gray-600">No recent notifications</p>
          ) : (
            <NotificationList notifications={alertsData} />
          )}
        </div>
      </div>

      {/* Animals Overview */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Animals Overview
        </h2>
        {animalsLoading ? (
          <p className="text-gray-600">Loading animals data...</p>
        ) : animalsError ? (
          <p className="text-red-600">Error: {animalsError.message}</p>
        ) : animalsData?.length === 0 ? (
          <p className="text-gray-600">No animals data available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {animalsData.map((animal) => (
              <div
                key={animal.id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{animal.name}</h3>
                    <p className="text-sm text-gray-600">{animal.species}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      animal.health_status === "healthy"
                        ? "bg-green-100 text-green-800"
                        : animal.health_status === "sick"
                        ? "bg-red-100 text-red-800"
                        : animal.health_status === "under_treatment"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {animal.health_status
                      .replace("_", " ")
                      .charAt(0)
                      .toUpperCase() +
                      animal.health_status.slice(1).replace("_", " ")}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <p>Breed: {animal.breed || "N/A"}</p>
                  <p>Age: {animal.age || "N/A"}</p>
                  <p>
                    Last Updated:{" "}
                    {format(new Date(animal.updated_at), "MMM d, yyyy h:mm a")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Alerts
        </h2>
        {alertsLoading ? (
          <p className="text-gray-600">Loading alerts...</p>
        ) : alertsError ? (
          <p className="text-red-600">Error: {alertsError.message}</p>
        ) : alertsData?.length === 0 ? (
          <p className="text-gray-600">No recent alerts</p>
        ) : (
          <div className="space-y-4">
            {alertsData.map((alert) => (
              <div
                key={alert.id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{alert.message}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {format(new Date(alert.created_at), "MMM d, yyyy h:mm a")}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.severity === "high"
                        ? "bg-red-100 text-red-800"
                        : alert.severity === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {alert.severity.charAt(0).toUpperCase() +
                      alert.severity.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VetDashboard;
