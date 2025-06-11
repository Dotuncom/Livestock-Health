import React from "react";
import { format } from "date-fns";

const SensorDataTable = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No sensor data available
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "healthy":
        return "text-green-600";
      case "sick":
        return "text-red-600";
      case "under_treatment":
        return "text-yellow-600";
      case "recovered":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="w-full max-w-full bg-white shadow-md rounded-xl p-4">
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm text-left border border-gray-300">
          <thead className="bg-[#1d4719] text-white text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 border">Animal Name</th>
              <th className="px-4 py-3 border">Species</th>
              <th className="px-4 py-3 border">Breed</th>
              <th className="px-4 py-3 border">Age</th>
              <th className="px-4 py-3 border">Health Status</th>
              <th className="px-4 py-3 border">Last Updated</th>
            </tr>
          </thead>
          <tbody className="bg-[#E6E3E3] text-gray-800">
            {data.map((animal) => (
              <tr
                key={animal.id}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="px-4 py-2 border font-semibold">
                  {animal.name}
                </td>
                <td className="px-4 py-2 border">{animal.species}</td>
                <td className="px-4 py-2 border">{animal.breed || "N/A"}</td>
                <td className="px-4 py-2 border">{animal.age || "N/A"}</td>
                <td
                  className={`px-4 py-2 border font-medium ${getStatusColor(
                    animal.health_status
                  )}`}
                >
                  {animal.health_status
                    .replace("_", " ")
                    .charAt(0)
                    .toUpperCase() +
                    animal.health_status.slice(1).replace("_", " ")}
                </td>
                <td className="px-4 py-2 border text-gray-600">
                  {format(new Date(animal.updated_at), "MMM d, yyyy h:mm a")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SensorDataTable;
