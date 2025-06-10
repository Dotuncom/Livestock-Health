import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";

const SensorDataTable = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["sensor_data"],
    queryFn: async () => {
      const { data, error } = await supabase.from("sensor_data").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onError: (err) => {
      toast.error("Error fetching sensor data: " + err.message);
    },
  });

  const handleSuccess = () => {
    toast.success("Sensor data updated successfully!");
  };

  // Helper function to determine status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "healthy":
        return "text-green-600 bg-green-50";
      case "at risk":
        return "text-yellow-600 bg-yellow-50";
      case "critical":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Sensor Data Overview</h2>
      </div>

      {isLoading ? (
        <div className="p-4 text-center">Loading sensor data...</div>
      ) : error ? (
        <div className="p-4 text-center text-red-600">
          Error: {error.message}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Temperature
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Heartbeat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Steps
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data &&
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.temperature}°C
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.heartbeat} BPM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.steps}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.updated_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleSuccess}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default SensorDataTable;
