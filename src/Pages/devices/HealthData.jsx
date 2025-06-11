import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function HealthData() {
  const [timeRange, setTimeRange] = useState("24h"); // 24h, 7d, 30d
  const [selectedMetric, setSelectedMetric] = useState("heartrate"); // heartrate, blood_oxygen, step_count, temperature

  // Fetch health data
  const {
    data: healthData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["health-data", timeRange],
    queryFn: async () => {
      console.log("Fetching health data...");

      // Calculate the start time based on the selected range
      const now = new Date();
      let startTime;
      switch (timeRange) {
        case "24h":
          startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case "7d":
          startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "30d":
          startTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      }

      const { data, error } = await supabase
        .from("healthdata")
        .select("*")
        .gte("timestamp", startTime.toISOString())
        .order("timestamp", { ascending: true });

      if (error) {
        console.error("Error fetching health data:", error);
        throw error;
      }

      console.log("Fetched health data:", data?.length || 0, "records");
      return data;
    },
  });

  // Get latest readings for the summary cards
  const latestReadings = healthData?.[healthData.length - 1];

  // Format data for the chart
  const chartData = healthData?.map((reading) => ({
    timestamp: new Date(reading.timestamp).toLocaleTimeString(),
    heartrate: reading.heartrate,
    blood_oxygen: reading.blood_oxygen,
    temperature: reading.temperature,
    step_count: reading.step_count,
    battery_percentage: reading.battery_percentage,
  }));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        <p className="font-semibold">Error loading health data:</p>
        <p>{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Device Health Data</h1>
        <div className="flex gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="heartrate">Heart Rate</option>
            <option value="blood_oxygen">Blood Oxygen</option>
            <option value="temperature">Temperature</option>
            <option value="step_count">Step Count</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Heart Rate</p>
              <p className="text-2xl font-semibold">
                {latestReadings?.heartrate || "N/A"} bpm
              </p>
            </div>
            <Icon icon="mdi:heart-pulse" className="text-red-500 text-2xl" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Blood Oxygen</p>
              <p className="text-2xl font-semibold">
                {latestReadings?.blood_oxygen || "N/A"}%
              </p>
            </div>
            <Icon icon="mdi:lungs" className="text-blue-500 text-2xl" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Temperature</p>
              <p className="text-2xl font-semibold">
                {latestReadings?.temperature || "N/A"}°C
              </p>
            </div>
            <Icon icon="mdi:thermometer" className="text-orange-500 text-2xl" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Battery</p>
              <p className="text-2xl font-semibold">
                {latestReadings?.battery_percentage || "N/A"}%
              </p>
            </div>
            <Icon
              icon="mdi:battery"
              className={`text-2xl ${
                latestReadings?.battery_percentage > 20
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">
          {selectedMetric === "heartrate"
            ? "Heart Rate"
            : selectedMetric === "blood_oxygen"
            ? "Blood Oxygen"
            : selectedMetric === "temperature"
            ? "Temperature"
            : "Step Count"}{" "}
          Over Time
        </h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke={
                  selectedMetric === "heartrate"
                    ? "#ef4444"
                    : selectedMetric === "blood_oxygen"
                    ? "#3b82f6"
                    : selectedMetric === "temperature"
                    ? "#f97316"
                    : "#22c55e"
                }
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Location Data */}
      {latestReadings?.latitude && latestReadings?.longitude && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Last Known Location</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <Icon icon="mdi:map-marker" className="text-xl" />
            <p>
              Latitude: {latestReadings.latitude.toFixed(6)}, Longitude:{" "}
              {latestReadings.longitude.toFixed(6)}
            </p>
          </div>
          {/* You can add a map component here if needed */}
        </div>
      )}
    </div>
  );
}
