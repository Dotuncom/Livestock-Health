import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";

export default function CattleHealthDashboard() {
  const [activeTab, setActiveTab] = useState("Temperature");

  const {
    data: livestockData,
    isLoading: livestockLoading,
    error: livestockError,
  } = useQuery({
    queryKey: ["livestock_analytics"],
    queryFn: async () => {
      const { data, error } = await supabase.from("livestock").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onError: (err) => {
      toast.error("Error fetching livestock analytics data: " + err.message);
    },
  });

  const {
    data: alertsData,
    isLoading: alertsLoading,
    error: alertsError,
  } = useQuery({
    queryKey: ["alerts_analytics"],
    queryFn: async () => {
      const { data, error } = await supabase.from("alerts").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onError: (err) => {
      toast.error("Error fetching alerts analytics data: " + err.message);
    },
  });

  const handleSuccess = () => {
    toast.success("Analytics data updated successfully!");
  };

  // Calculate analytics
  const calculateAnalytics = () => {
    if (!livestockData || !alertsData) return null;

    const totalLivestock = livestockData.length;
    const healthyLivestock = livestockData.filter(
      (item) => item.status === "healthy"
    ).length;
    const atRiskLivestock = livestockData.filter(
      (item) => item.status === "at_risk"
    ).length;
    const criticalLivestock = livestockData.filter(
      (item) => item.status === "critical"
    ).length;

    const totalAlerts = alertsData.length;
    const highSeverityAlerts = alertsData.filter(
      (alert) => alert.severity === "high"
    ).length;
    const mediumSeverityAlerts = alertsData.filter(
      (alert) => alert.severity === "medium"
    ).length;
    const lowSeverityAlerts = alertsData.filter(
      (alert) => alert.severity === "low"
    ).length;

    return {
      livestock: {
        total: totalLivestock,
        healthy: healthyLivestock,
        atRisk: atRiskLivestock,
        critical: criticalLivestock,
        healthPercentage: (healthyLivestock / totalLivestock) * 100,
      },
      alerts: {
        total: totalAlerts,
        high: highSeverityAlerts,
        medium: mediumSeverityAlerts,
        low: lowSeverityAlerts,
      },
    };
  };

  const analytics = calculateAnalytics();

  const chartDataMap = {
    "Heart rate": [
      { date: "Mon", value: 80 },
      { date: "Tue", value: 85 },
      { date: "Wed", value: 90 },
      { date: "Thu", value: 88 },
      { date: "Fri", value: 87 },
    ],
    "Motion rate": [
      { date: "Mon", value: 200 },
      { date: "Tue", value: 300 },
      { date: "Wed", value: 250 },
      { date: "Thu", value: 400 },
      { date: "Fri", value: 380 },
    ],
    Temperature: [
      { date: "Mon", value: 38.2 },
      { date: "Tue", value: 38.4 },
      { date: "Wed", value: 38.1 },
      { date: "Thu", value: 37.9 },
      { date: "Fri", value: 38.0 },
    ],
  };

  const renderChartTitle = () => {
    switch (activeTab) {
      case "Heart rate":
        return "Heart Rate Trend for 005";
      case "Motion rate":
        return "Motion Rate Trend for 005";
      default:
        return "Temperature Trend for 005";
    }
  };

  return (
    <div
      style={{ padding: "1rem", backgroundColor: "white", minHeight: "100vh" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1rem",
        }}
      >
        <style>
          {`
            @media (max-width: 768px) {
              div[style*='grid-template-columns'] {
                grid-template-columns: 1fr !important;
              }
            }
          `}
        </style>

        {/* Left Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Chart Container */}
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              padding: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "1rem",
                flexWrap: "wrap",
              }}
            >
              {["Heart rate", "Motion rate", "Temperature"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    padding: "0.25rem 1rem",
                    fontSize: "14px",
                    width: "100px",
                    height: "50px",
                    backgroundColor: activeTab === tab ? "#f3f4f6" : "white",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img
                src="https://via.placeholder.com/40"
                alt="Fav Cattles"
                style={{ borderRadius: "9999px" }}
              />
              <p style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                Fav Cattles
              </p>
            </div>

            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: "500",
                marginTop: "1rem",
              }}
            >
              {renderChartTitle()}
            </p>
            <div style={{ height: "250px", marginTop: "0.5rem" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartDataMap[activeTab]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Statistics Table */}
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              padding: "1rem",
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                fontWeight: "500",
                marginBottom: "0.5rem",
              }}
            >
              Recent statistics
            </p>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  fontSize: "0.875rem",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Temperature</th>
                    <th style={thStyle}>Heart Rate (BPM)</th>
                    <th style={thStyle}>Motion (Steps)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={tdStyle}>14/02/25</td>
                    <td style={tdStyle}>38.0 C</td>
                    <td style={tdStyle}>88</td>
                    <td style={tdStyle}>0</td>
                  </tr>
                  <tr>
                    <td style={tdStyle}>13/02/25</td>
                    <td style={tdStyle}>88</td>
                    <td style={tdStyle}>88</td>
                    <td style={tdStyle}>200</td>
                  </tr>
                  <tr>
                    <td style={tdStyle}>12/02/25</td>
                    <td style={tdStyle}>70</td>
                    <td style={tdStyle}>88</td>
                    <td style={tdStyle}>520</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>Cow 001</p>
          </div>
        </div>

        {/* Right Panel - Notes */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            height: "100%",
          }}
        >
          <p style={{ fontSize: "1rem", fontWeight: "500" }}>
            Note and Observation
          </p>
          <textarea
            style={{
              height: "8rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              padding: "0.5rem",
              height: "175px",
              resize: "vertical",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <label>
              <input type="checkbox" style={{ marginRight: "0.5rem" }} /> Health
              update
            </label>
            <label>
              <input type="checkbox" style={{ marginRight: "0.5rem" }} />{" "}
              Treatment Records
            </label>
            <label>
              <input type="checkbox" style={{ marginRight: "0.5rem" }} />{" "}
              Temperature
            </label>
            <label>
              <input type="checkbox" style={{ marginRight: "0.5rem" }} /> Farmer
              Feedback
            </label>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              style={{
                backgroundColor: "#16a34a",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                width: "130px",
              }}
            >
              Save
            </button>
            <button
              style={{
                border: "1px solid #d1d5db",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                width: "130px",
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {livestockLoading || alertsLoading ? (
        <p>Loading analytics data...</p>
      ) : livestockError || alertsError ? (
        <p>Error: {livestockError?.message || alertsError?.message}</p>
      ) : analytics ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Livestock Health Overview */}
          <div className="bg-[#f8f9fa] rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">
              Livestock Health Overview
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-sm text-gray-600">Total Livestock</h3>
                  <p className="text-2xl font-bold">
                    {analytics.livestock.total}
                  </p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-sm text-gray-600">Health Rate</h3>
                  <p className="text-2xl font-bold">
                    {analytics.livestock.healthPercentage.toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded shadow border-l-4 border-green-500">
                  <h3 className="text-sm text-gray-600">Healthy</h3>
                  <p className="text-xl font-bold text-green-700">
                    {analytics.livestock.healthy}
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded shadow border-l-4 border-yellow-500">
                  <h3 className="text-sm text-gray-600">At Risk</h3>
                  <p className="text-xl font-bold text-yellow-700">
                    {analytics.livestock.atRisk}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded shadow border-l-4 border-red-500">
                  <h3 className="text-sm text-gray-600">Critical</h3>
                  <p className="text-xl font-bold text-red-700">
                    {analytics.livestock.critical}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts Overview */}
          <div className="bg-[#f8f9fa] rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Alerts Overview</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-sm text-gray-600">Total Alerts</h3>
                <p className="text-2xl font-bold">{analytics.alerts.total}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-red-50 p-4 rounded shadow border-l-4 border-red-500">
                  <h3 className="text-sm text-gray-600">High Severity</h3>
                  <p className="text-xl font-bold text-red-700">
                    {analytics.alerts.high}
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded shadow border-l-4 border-yellow-500">
                  <h3 className="text-sm text-gray-600">Medium Severity</h3>
                  <p className="text-xl font-bold text-yellow-700">
                    {analytics.alerts.medium}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded shadow border-l-4 border-green-500">
                  <h3 className="text-sm text-gray-600">Low Severity</h3>
                  <p className="text-xl font-bold text-green-700">
                    {analytics.alerts.low}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <button
        onClick={handleSuccess}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
      >
        Refresh Analytics
      </button>
    </div>
  );
}

const thStyle = {
  border: "1px solid #d1d5db",
  padding: "0.25rem 0.5rem",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #d1d5db",
  padding: "0.25rem 0.5rem",
};
