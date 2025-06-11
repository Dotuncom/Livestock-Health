//src/Pages/Farmer/Report.jsx
// import HeartTrendChart from '../../components/HeartTrendChart';
// import HealthPieChart from '../../components/HealthStatusPieChart';
// import SensorDataTable from '../../components/SensorDataTable';
// export default function Dashboard() {
//   const dummyData = [
//     { id: '005', temperature: 101.2, heartbeat: 72, steps: 2345, status: 'Healthy' },
//     { id: '006', temperature: 102.3, heartbeat: 89, steps: 2100, status: 'At Risk' },
//     { id: '007', temperature: 103.1, heartbeat: 95, steps: 1950, status: 'Critical' },
//   ];

//   return (
//     <div className="p-4 space-y-8 bg-white min-w-screen min-h-screen overflow-x-hidden">
//       <h1 className="text-2xl font-bold">LiveStock Health Report</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         <div className="bg-[#f8f9fa] h-[500px] w-full  rounded-lg p-4 shadow">
//           <h2 className="font-semibold text-xl mb-2">Health Distribution</h2>
//           <HealthPieChart/>
//         </div>

//         <div className="bg-[#f8f9fa] rounded-lg p-4 shadow">
//           <h2 className="font-semibold text-xl mb-5">Temperature Trend</h2>
//           <TemperatureTrendChart />
//         </div>

//         <div className="bg-[#f8f9fa] rounded-lg p-4 shadow">
//           <h2 className="font-semibold text-xl mb-2">Heartbeat Trend</h2>
//           <HeartTrendChart />
//         </div>
//       </div>
//       <div className="p-4 space-y-8 bg-white min-h-screen overflow-x-hidden">
//       <h1 className="text-2xl font-bold">Sensor Data Overview</h1>

//       <SensorDataTable data={dummyData} />
//     </div>
//     </div>
//   );
// }
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";
import TemperatureTrendChart from "../../components/TemperatureTrendChart";
import HeartTrendChart from "../../components/HeartTrendChart";
import HealthPieChart from "../../components/HealthStatusPieChart";
import SensorDataTable from "../../components/SensorDataTable";
import MetricTabs from "../../components/MetricsTab";
import RecentReports from "../../components/RecentReport";
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
  BarChart,
  Bar,
} from "recharts";

export default function Report() {
  const [selectedMetric, setSelectedMetric] = useState("temperature");
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [timeRange, setTimeRange] = useState("7d"); // 24h, 7d, 30d

  // Add sorting state
  const [sortConfig, setSortConfig] = useState({
    key: "timestamp",
    direction: "desc",
  });

  // Fetch animals data
  const {
    data: animalsData,
    isLoading: animalsLoading,
    error: animalsError,
  } = useQuery({
    queryKey: ["animals"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("animals")
        .select("*")
        .eq("user_id", user.id);
      if (error) throw error;
      return data;
    },
    onError: (err) => {
      toast.error("Error fetching animals data: " + err.message);
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

  // Fetch health data
  const {
    data: healthData,
    isLoading: healthLoading,
    error: healthError,
  } = useQuery({
    queryKey: ["healthdata", timeRange],
    queryFn: async () => {
      console.log("Fetching health data for timeRange:", timeRange);
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
          startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      }
      console.log("Fetching data from:", startTime.toISOString());

      const { data, error } = await supabase
        .from("healthdata")
        .select("*")
        .gte("timestamp", startTime.toISOString())
        .order("timestamp", { ascending: true });

      if (error) {
        console.error("Error fetching health data:", error);
        throw error;
      }
      console.log("Fetched health data:", data?.length, "records");
      return data;
    },
  });

  // Calculate health distribution
  const healthDistribution = animalsData
    ? {
        healthy: animalsData.filter((a) => a.health_status === "healthy")
          .length,
        sick: animalsData.filter((a) => a.health_status === "sick").length,
        under_treatment: animalsData.filter(
          (a) => a.health_status === "under_treatment"
        ).length,
        recovered: animalsData.filter((a) => a.health_status === "recovered")
          .length,
      }
    : null;

  // Calculate device status
  const deviceStatus = devicesData
    ? {
        active: devicesData.filter((d) => d.status === "active").length,
        inactive: devicesData.filter((d) => d.status === "inactive").length,
        maintenance: devicesData.filter((d) => d.status === "maintenance")
          .length,
      }
    : null;

  // Calculate statistics
  const stats = React.useMemo(() => {
    if (!healthData || healthData.length === 0) return null;
    const values = healthData
      .map((d) => d[selectedMetric])
      .filter((v) => v != null);
    if (values.length === 0) return null;
    return {
      min: Math.min(...values),
      max: Math.max(...values),
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      latest: values[values.length - 1],
    };
  }, [healthData, selectedMetric]);

  // Format data for chart
  const chartData = healthData?.map((d) => ({
    timestamp: new Date(d.timestamp).toLocaleString(),
    value: d[selectedMetric],
  }));

  // Sort and filter health data
  const sortedHealthData = useMemo(() => {
    if (!healthData) return [];

    let sortedData = [...healthData];
    if (sortConfig.key) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedData;
  }, [healthData, sortConfig]);

  // Request sort function
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  if (healthLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800"></div>
      </div>
    );
  }

  return (
    <div className="px-8 md:p-6 space-y-6 bg-white min-h-screen overflow-x-hidden max-w-screen">
      <h1 className="text-xl md:text-2xl font-bold">Livestock Health Report</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#f8f9fa] rounded-lg p-4 shadow">
          <h3 className="text-sm text-gray-600">Total Animals</h3>
          <p className="text-2xl font-bold">{animalsData?.length || 0}</p>
        </div>
        <div className="bg-[#f8f9fa] rounded-lg p-4 shadow">
          <h3 className="text-sm text-gray-600">Active Devices</h3>
          <p className="text-2xl font-bold">{deviceStatus?.active || 0}</p>
        </div>
        <div className="bg-[#f8f9fa] rounded-lg p-4 shadow">
          <h3 className="text-sm text-gray-600">Recent Alerts</h3>
          <p className="text-2xl font-bold">{alertsData?.length || 0}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Health Distribution */}
        <div className="bg-[#f8f9fa] w-full rounded-lg p-4 shadow flex flex-col space-y-2">
          <h2 className="font-semibold text-lg md:text-xl">
            Health Distribution
          </h2>
          <div className="w-full h-[250px] md:h-[300px]">
            <HealthPieChart data={healthDistribution} />
          </div>
        </div>

        {/* Temperature Trend */}
        <div className="bg-[#f8f9fa] w-full rounded-lg p-4 shadow flex flex-col space-y-2">
          <h2 className="font-semibold text-lg md:text-xl">
            Temperature Trend
          </h2>
          <div className="w-full h-[250px] md:h-[300px]">
            <TemperatureTrendChart animalId={selectedAnimal} />
          </div>
        </div>

        {/* Heartbeat Trend */}
        <div className="bg-[#f8f9fa] w-full rounded-lg p-4 shadow flex flex-col space-y-2">
          <h2 className="font-semibold text-lg md:text-xl">Heartbeat Trend</h2>
          <div className="w-full h-[250px] md:h-[300px]">
            <HeartTrendChart animalId={selectedAnimal} />
          </div>
        </div>
      </div>

      {/* Animal Selection and Metrics */}
      <div className="bg-[#f8f9fa] rounded-lg p-4 shadow">
        <h2 className="font-semibold text-lg md:text-xl mb-4">
          Animal Metrics
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Animal
          </label>
          <select
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
            value={selectedAnimal || ""}
            onChange={(e) => setSelectedAnimal(e.target.value)}
          >
            <option value="">All Animals</option>
            {animalsData?.map((animal) => (
              <option key={animal.id} value={animal.id}>
                {animal.name} ({animal.species})
              </option>
            ))}
          </select>
        </div>
        <MetricTabs
          options={["Temperature", "Heart Rate", "Motion"]}
          selected={selectedMetric}
          onSelect={setSelectedMetric}
        />
      </div>

      {/* Recent Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#f8f9fa] rounded-lg p-4 shadow">
          <h2 className="font-semibold text-lg md:text-xl mb-4">
            Recent Alerts
          </h2>
          {alertsLoading ? (
            <p>Loading alerts...</p>
          ) : alertsError ? (
            <p>Error: {alertsError.message}</p>
          ) : alertsData?.length === 0 ? (
            <p className="text-gray-600 italic">No recent alerts.</p>
          ) : (
            <RecentReports alerts={alertsData} />
          )}
        </div>

        {/* Device Status */}
        <div className="bg-[#f8f9fa] rounded-lg p-4 shadow">
          <h2 className="font-semibold text-lg md:text-xl mb-4">
            Device Status
          </h2>
          {devicesLoading ? (
            <p>Loading devices...</p>
          ) : devicesError ? (
            <p>Error: {devicesError.message}</p>
          ) : devicesData?.length === 0 ? (
            <p className="text-gray-600 italic">No devices registered.</p>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded shadow border-l-4 border-green-500">
                  <h3 className="text-sm text-gray-600">Active</h3>
                  <p className="text-xl font-bold text-green-700">
                    {deviceStatus?.active || 0}
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded shadow border-l-4 border-yellow-500">
                  <h3 className="text-sm text-gray-600">Inactive</h3>
                  <p className="text-xl font-bold text-yellow-700">
                    {deviceStatus?.inactive || 0}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded shadow border-l-4 border-red-500">
                  <h3 className="text-sm text-gray-600">Maintenance</h3>
                  <p className="text-xl font-bold text-red-700">
                    {deviceStatus?.maintenance || 0}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sensor Data Table */}
      <div className="bg-[#f8f9fa] rounded-lg p-4 shadow">
        <h2 className="font-semibold text-lg md:text-xl mb-4">
          Sensor Data Overview
        </h2>
        {animalsLoading ? (
          <p>Loading sensor data...</p>
        ) : animalsError ? (
          <p>Error: {animalsError.message}</p>
        ) : animalsData?.length === 0 ? (
          <p className="text-gray-600 italic">No sensor data available.</p>
        ) : (
          <SensorDataTable data={animalsData} />
        )}
      </div>

      {/* Health Data Table */}
      <div className="bg-[#f8f9fa] rounded-lg p-4 shadow mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg md:text-xl">
            Health Data Overview
          </h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
        {healthLoading ? (
          <p>Loading health data...</p>
        ) : healthError ? (
          <p>Error: {healthError.message}</p>
        ) : !healthData || healthData.length === 0 ? (
          <p className="text-gray-600 italic">No health data available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
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
                {healthData.map((record, index) => (
                  <tr key={record.id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(record.timestamp).toLocaleString()}
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Health Data Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <h2 className="text-xl font-bold text-gray-800">
            Device Health Data
          </h2>
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
              <option value="temperature">Temperature</option>
              <option value="heartrate">Heart Rate</option>
              <option value="blood_oxygen">Blood Oxygen</option>
              <option value="step_count">Step Count</option>
            </select>
          </div>
        </div>
        {healthLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-800"></div>
          </div>
        ) : healthError ? (
          <div className="text-red-600">
            Error loading health data: {healthError.message}
          </div>
        ) : !healthData || healthData.length === 0 ? (
          <div className="text-gray-500">
            No health data available for this period.
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="mb-4 flex flex-wrap gap-6">
              <div className="bg-green-50 p-4 rounded shadow min-w-[180px]">
                <p className="text-sm text-gray-600">Average</p>
                <p className="text-2xl font-bold">{stats?.avg?.toFixed(1)}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded shadow min-w-[180px]">
                <p className="text-sm text-gray-600">Latest</p>
                <p className="text-2xl font-bold">{stats?.latest}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded shadow min-w-[180px]">
                <p className="text-sm text-gray-600">Min</p>
                <p className="text-2xl font-bold">{stats?.min}</p>
              </div>
              <div className="bg-red-50 p-4 rounded shadow min-w-[180px]">
                <p className="text-sm text-gray-600">Max</p>
                <p className="text-2xl font-bold">{stats?.max}</p>
              </div>
            </div>

            {/* Chart */}
            <div className="h-[350px] mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#22c55e"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Health Data Table */}
            <div className="mt-8 border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-800">
                  Detailed Health Data
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Showing {sortedHealthData.length} records
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("timestamp")}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Timestamp</span>
                          {sortConfig.key === "timestamp" && (
                            <Icon
                              icon={
                                sortConfig.direction === "asc"
                                  ? "mdi:chevron-up"
                                  : "mdi:chevron-down"
                              }
                              className="w-4 h-4"
                            />
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("temperature")}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Temperature (°C)</span>
                          {sortConfig.key === "temperature" && (
                            <Icon
                              icon={
                                sortConfig.direction === "asc"
                                  ? "mdi:chevron-up"
                                  : "mdi:chevron-down"
                              }
                              className="w-4 h-4"
                            />
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("heartrate")}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Heart Rate (bpm)</span>
                          {sortConfig.key === "heartrate" && (
                            <Icon
                              icon={
                                sortConfig.direction === "asc"
                                  ? "mdi:chevron-up"
                                  : "mdi:chevron-down"
                              }
                              className="w-4 h-4"
                            />
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("blood_oxygen")}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Blood Oxygen (%)</span>
                          {sortConfig.key === "blood_oxygen" && (
                            <Icon
                              icon={
                                sortConfig.direction === "asc"
                                  ? "mdi:chevron-up"
                                  : "mdi:chevron-down"
                              }
                              className="w-4 h-4"
                            />
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("step_count")}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Step Count</span>
                          {sortConfig.key === "step_count" && (
                            <Icon
                              icon={
                                sortConfig.direction === "asc"
                                  ? "mdi:chevron-up"
                                  : "mdi:chevron-down"
                              }
                              className="w-4 h-4"
                            />
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("battery_percentage")}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Battery (%)</span>
                          {sortConfig.key === "battery_percentage" && (
                            <Icon
                              icon={
                                sortConfig.direction === "asc"
                                  ? "mdi:chevron-up"
                                  : "mdi:chevron-down"
                              }
                              className="w-4 h-4"
                            />
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedHealthData.map((record, index) => (
                      <tr key={record.id || index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(record.timestamp).toLocaleString()}
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
                                style={{
                                  width: `${record.battery_percentage}%`,
                                }}
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
                    ))}
                  </tbody>
                </table>
              </div>
              {sortedHealthData.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No health data available for the selected period.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
