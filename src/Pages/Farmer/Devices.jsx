import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function Devices() {
  const [timeRange, setTimeRange] = useState("24h"); // 24h, 7d, 30d
  const [selectedMetric, setSelectedMetric] = useState("temperature");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const navigate = useNavigate();

  // Fetch devices data
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
      const { data, error } = await supabase.from("devices").select("*");
      if (error) throw error;
      return data;
    },
  });

  // Fetch health data
  const { data: healthData, isLoading: healthLoading } = useQuery({
    queryKey: ["health-data-devices", timeRange, selectedDevice],
    queryFn: async () => {
      const now = new Date();
      let startTime;
      switch (timeRange) {
        case "24h":
          startTime = new Date(now - 24 * 60 * 60 * 1000);
          break;
        case "7d":
          startTime = new Date(now - 7 * 24 * 60 * 60 * 1000);
          break;
        case "30d":
          startTime = new Date(now - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          startTime = new Date(now - 24 * 60 * 60 * 1000);
      }

      console.log("Current time:", now.toISOString());
      console.log("Calculated start time:", startTime.toISOString());

      let query = supabase.from("healthdata").select("*");

      if (selectedDevice) {
        query = query.eq("device_id", selectedDevice);
      }

      console.log("Query parameters:", {
        timeRange,
        selectedDevice,
        startTime: startTime.toISOString(),
        currentTime: now.toISOString(),
      });

      try {
        const { data, error } = await supabase.from("healthdata").select("*");

        if (error) {
          console.error("Supabase query error:", error);
          throw error;
        }

        console.log("Query response:", {
          dataLength: data?.length,
          firstRecord: data?.[0],
          lastRecord: data?.[data?.length - 1],
        });

        return data;
      } catch (err) {
        console.error("Error executing query:", err);
        throw err;
      }
    },
  });

  // Calculate statistics
  const calculateStats = (data, metric) => {
    if (!data || data.length === 0) return null;
    const values = data.map((d) => d[metric]).filter((v) => v != null);
    if (values.length === 0) return null;

    return {
      min: Math.min(...values),
      max: Math.max(...values),
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      latest: values[values.length - 1],
    };
  };

  // Format data for charts
  const formatChartData = (data) => {
    if (!data) return [];

    // Group data by date for daily averages
    const dailyData = data.reduce((acc, reading) => {
      const date = new Date(reading.timestamp).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = {
          date,
          heartrate: [],
          blood_oxygen: [],
          temperature: [],
          step_count: [],
        };
      }
      acc[date].heartrate.push(reading.heartrate);
      acc[date].blood_oxygen.push(reading.blood_oxygen);
      acc[date].temperature.push(reading.temperature);
      acc[date].step_count.push(reading.step_count);
      return acc;
    }, {});

    // Calculate daily averages
    return Object.values(dailyData).map((day) => ({
      date: day.date,
      heartrate:
        day.heartrate.reduce((a, b) => a + b, 0) / day.heartrate.length,
      blood_oxygen:
        day.blood_oxygen.reduce((a, b) => a + b, 0) / day.blood_oxygen.length,
      temperature:
        day.temperature.reduce((a, b) => a + b, 0) / day.temperature.length,
      step_count:
        day.step_count.reduce((a, b) => a + b, 0) / day.step_count.length,
    }));
  };

  const stats = {
    heartrate: calculateStats(healthData, "heartrate"),
    blood_oxygen: calculateStats(healthData, "blood_oxygen"),
    temperature: calculateStats(healthData, "temperature"),
    step_count: calculateStats(healthData, "step_count"),
  };

  const chartData = formatChartData(healthData);

  if (devicesLoading || healthLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800"></div>
      </div>
    );
  }

  if (devicesError) {
    return (
      <div className="p-4 text-red-600">
        <p className="font-semibold">Error loading devices:</p>
        <p>{devicesError.message}</p>
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
        <h1 className="text-2xl font-bold text-gray-800">Device Status</h1>
        <div className="flex gap-4">
          <select
            value={selectedDevice || ""}
            onChange={(e) => setSelectedDevice(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">All Devices</option>
            {devicesData?.map((device) => (
              <option key={device.id} value={device.id}>
                {device.name} ({device.status})
              </option>
            ))}
          </select>
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
            <option value="temperature">Temperature</option>
            <option value="heartrate">Heart Rate</option>
            <option value="blood_oxygen">Blood Oxygen</option>
            <option value="step_count">Step Count</option>
          </select>
        </div>
      </div>

      {/* Device Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Devices
            </h3>
            <Icon icon="mdi:devices" className="text-2xl text-gray-600" />
          </div>
          <p className="text-3xl font-bold">{devicesData?.length || 0}</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-3 rounded">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-xl font-semibold text-green-600">
                {devicesData?.filter((d) => d.status === "active").length || 0}
              </p>
            </div>
            <div className="bg-yellow-50 p-3 rounded">
              <p className="text-sm text-gray-600">Inactive</p>
              <p className="text-xl font-semibold text-yellow-600">
                {devicesData?.filter((d) => d.status === "inactive").length ||
                  0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Battery Status
            </h3>
            <Icon icon="mdi:battery" className="text-2xl text-gray-600" />
          </div>
          <div className="space-y-4">
            {devicesData?.map((device) => (
              <div
                key={device.id}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-gray-600">{device.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        device.battery_level > 20
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${device.battery_level}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">
                    {device.battery_level}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Last Update</h3>
            <Icon icon="mdi:clock-outline" className="text-2xl text-gray-600" />
          </div>
          <div className="space-y-4">
            {devicesData?.map((device) => (
              <div
                key={device.id}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-gray-600">{device.name}</span>
                <span className="text-sm font-medium">
                  {new Date(device.last_updated).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(stats).map(([metric, data]) => {
          if (!data) return null;
          const metricInfo = {
            heartrate: {
              label: "Heart Rate",
              unit: "bpm",
              icon: "mdi:heart-pulse",
              color: "text-red-500",
            },
            blood_oxygen: {
              label: "Blood Oxygen",
              unit: "%",
              icon: "mdi:lungs",
              color: "text-blue-500",
            },
            temperature: {
              label: "Temperature",
              unit: "°C",
              icon: "mdi:thermometer",
              color: "text-orange-500",
            },
            step_count: {
              label: "Step Count",
              unit: "steps",
              icon: "mdi:walk",
              color: "text-green-500",
            },
          }[metric];

          return (
            <div key={metric} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  {metricInfo.label}
                </h3>
                <Icon
                  icon={metricInfo.icon}
                  className={`${metricInfo.color} text-2xl`}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Current</p>
                  <p className="text-xl font-semibold">
                    {data.latest.toFixed(1)} {metricInfo.unit}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Average</p>
                  <p className="text-xl font-semibold">
                    {data.avg.toFixed(1)} {metricInfo.unit}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Health Data Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Trends */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Daily Trends</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey={selectedMetric}
                  fill={
                    selectedMetric === "heartrate"
                      ? "#ef4444"
                      : selectedMetric === "blood_oxygen"
                      ? "#3b82f6"
                      : selectedMetric === "temperature"
                      ? "#f97316"
                      : "#22c55e"
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Timeline */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Real-time Timeline</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={healthData?.map((d) => ({
                  timestamp: new Date(d.timestamp).toLocaleTimeString(),
                  [selectedMetric]: d[selectedMetric],
                }))}
              >
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
      </div>

      {/* Device List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Device Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Battery Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {devicesData?.map((device) => (
                <tr key={device.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Icon
                        icon="mdi:devices"
                        className="h-5 w-5 text-gray-400 mr-2"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {device.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        device.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                        <div
                          className={`h-full ${
                            device.battery_level > 20
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${device.battery_level}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">
                        {device.battery_level}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(device.last_updated).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {device.latitude && device.longitude
                      ? `${device.latitude.toFixed(
                          4
                        )}, ${device.longitude.toFixed(4)}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => navigate("/devices/health")}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                      View Health Data
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Health Data Card */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Health Data Details</h2>
          <div className="flex gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <select
              value={selectedDevice || ""}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">All Devices</option>
              {devicesData?.map((device) => (
                <option key={device.id} value={device.id}>
                  {device.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {healthLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-800"></div>
          </div>
        ) : !healthData || healthData.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No health data available for the selected period.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Temperature (°C)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Heart Rate (bpm)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Oxygen (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Step Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Battery (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {healthData.map((record, index) => {
                  const device = devicesData?.find(
                    (d) => d.id === record.device_id
                  );
                  return (
                    <tr key={record.id || index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(record.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {device?.name || "Unknown Device"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.temperature?.toFixed(1) || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.heartrate?.toFixed(0) || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.blood_oxygen?.toFixed(1) || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.step_count?.toLocaleString() || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                            <div
                              className={`h-full ${
                                record.battery_percentage > 20
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${record.battery_percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">
                            {record.battery_percentage?.toFixed(0) || "N/A"}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.latitude && record.longitude
                          ? `${record.latitude.toFixed(
                              4
                            )}, ${record.longitude.toFixed(4)}`
                          : "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
