import StatCard from "../../cards/StatsCard";
import RegAni from "../../assets/register.png";
import Abnormal from "../../assets/abnormalvital.png";
import attention from "../../assets/attention.png";
import speaker from "../../assets/speaker.png";
import HealthStatusPieChart from "../../components/HealthStatusPieChart";
import DeviceStatus from "../../components/DeviceStatus";

import LivestockTracker from "../../components/LivestockTracker";
import SensorDataTable from "../../components/SensorDataTable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";
import FarmerSummaryCard from "../../components/FarmerSummaryCard";
import AppointmentList from "../../components/AppointmentList";
import NotificationList from "../../components/NotificationList";

function Dashboard() {
  const summaryCards = [
    {
      title: "Total Animals",
      count: 0,
      icon: "mdi:cow",
    },
    {
      title: "Active Devices",
      count: 0,
      icon: "mdi:devices",
    },
    {
      title: "Recent Alerts",
      count: 0,
      icon: "mdi:bell-alert",
    },
  ];

  const {
    data: livestockData,
    isLoading: livestockLoading,
    error: livestockError,
  } = useQuery({
    queryKey: ["livestock"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("livestock")
        .select("*")
        .eq("farmer_id", user.id);

      if (error) throw error;
      return data;
    },
    onError: (err) => {
      toast.error("Error fetching livestock data: " + err.message);
    },
  });

  const {
    data: devicesData,
    isLoading: devicesLoading,
    error: devicesError,
  } = useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("devices")
        .select("*")
        .eq("farmer_id", user.id);

      if (error) throw error;
      return data;
    },
    onError: (err) => {
      toast.error("Error fetching devices data: " + err.message);
    },
  });

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
        .eq("farmer_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
    onError: (err) => {
      toast.error("Error fetching alerts data: " + err.message);
    },
  });

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
        .select(
          `
          *,
          vet:vet_id (
            email,
            raw_user_meta_data
          )
        `
        )
        .eq("farmer_id", user.id)
        .gte("appointment_date", new Date().toISOString())
        .order("appointment_date", { ascending: true })
        .limit(5);

      if (error) throw error;
      return data;
    },
    onError: (err) => {
      toast.error("Error fetching appointments data: " + err.message);
    },
  });

  if (livestockData) {
    summaryCards[0].count = livestockData.length;
  }
  if (devicesData) {
    summaryCards[1].count = devicesData.filter(
      (d) => d.status === "active"
    ).length;
  }
  if (alertsData) {
    summaryCards[2].count = alertsData.length;
  }

  return (
    <div className="px-[40px] space-y-6">
      <h1 className="md:text-4xl font-bold">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
        {summaryCards.map((card, idx) => (
          <FarmerSummaryCard
            key={idx}
            title={card.title}
            count={card.count}
            icon={card.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-[62px]">
        {/* Upcoming Appointments */}
        <div>
          <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-3">
            Upcoming Appointments
          </h3>
          {appointmentsLoading ? (
            <p>Loading appointments...</p>
          ) : appointmentsError ? (
            <p>Error: {appointmentsError.message}</p>
          ) : appointmentsData?.length === 0 ? (
            <p className="text-gray-600 italic">No upcoming appointments.</p>
          ) : (
            <div className="bg-white pt-[48px] px-[28px] shadow-md rounded-lg p-4">
              <ul className="space-y-4">
                {appointmentsData?.map((appt) => {
                  const vetName =
                    appt.vet?.raw_user_meta_data?.full_name ||
                    appt.vet?.email ||
                    "Unknown Vet";
                  return (
                    <li
                      key={appt.id}
                      className="flex justify-between items-center text-sm font-inter text-gray-700"
                    >
                      <div>
                        <div className="text-[20px] Nunito font-semibold">
                          {new Date(appt.appointment_date).toLocaleDateString()}
                        </div>
                        <div className="text-gray-600">
                          {vetName} - {appt.time_slot}
                        </div>
                        <div className="text-sm">
                          <span
                            className={`font-semibold ${
                              appt.status === "pending"
                                ? "text-yellow-600"
                                : appt.status === "accepted"
                                ? "text-green-600"
                                : appt.status === "rescheduled"
                                ? "text-blue-600"
                                : "text-gray-600"
                            }`}
                          >
                            {appt.status.charAt(0).toUpperCase() +
                              appt.status.slice(1)}
                          </span>
                          {appt.status === "rescheduled" &&
                            appt.rescheduled_date && (
                              <span className="text-blue-600 ml-2">
                                →{" "}
                                {new Date(
                                  appt.rescheduled_date
                                ).toLocaleDateString()}{" "}
                                ({appt.rescheduled_time_slot})
                              </span>
                            )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {appt.animal_type}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Recent Alerts */}
        <div>
          <h3 className="text-lg Poppins font-semibold text-gray-800 mb-3">
            Recent Alerts
          </h3>
          {alertsLoading ? (
            <p>Loading alerts...</p>
          ) : alertsError ? (
            <p>Error: {alertsError.message}</p>
          ) : alertsData?.length === 0 ? (
            <p className="text-gray-600 italic">No recent alerts.</p>
          ) : (
            <NotificationList alerts={alertsData} />
          )}
        </div>
      </div>

      {/* Livestock Overview */}
      <div className="bg-[#f8f9fa] rounded-lg p-4 shadow">
        <h2 className="font-semibold text-xl mb-4">Livestock Overview</h2>
        {livestockLoading ? (
          <p>Loading livestock data...</p>
        ) : livestockError ? (
          <p>Error: {livestockError.message}</p>
        ) : livestockData?.length === 0 ? (
          <p className="text-gray-600 italic">No livestock registered yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {livestockData?.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded shadow">
                <h3 className="font-medium">{item.name}</h3>
                <p>Status: {item.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
