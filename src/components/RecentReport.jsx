//src/components/RecentReport.jsx
// src/components/RecentReports.jsx
import React from "react";
import { format } from "date-fns";

const RecentReports = ({ alerts }) => {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">No recent alerts</div>
    );
  }

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-600";
      case "medium":
        return "bg-yellow-100 text-yellow-600";
      case "low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <ul className="divide-y divide-gray-200">
        {alerts.map((alert, index) => (
          <li key={alert.id} className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {alert.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {format(new Date(alert.created_at), "MMM d, yyyy h:mm a")}
                </p>
              </div>
              <span
                className={`ml-2 px-2 py-1 text-xs rounded-full ${getSeverityColor(
                  alert.severity
                )}`}
              >
                {alert.severity}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentReports;
