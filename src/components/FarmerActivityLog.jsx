// src/components/FarmerActivityLog.jsx
import React from "react";

const logs = [
  { date: "April 28", name: "Emma Stocks", action: "Health Check", status: "Completed" },
  { date: "April 27", name: "Josh Dave", action: "Vaccination", status: "Completed" },
  { date: "April 27", name: "Dan Stocks", action: "Follow-up Visit", status: "Pending" },
];

const FarmerActivityLog = () => (
  <div className="bg-white shadow p-4 rounded-lg">
    <h2 className="font-bold text-lg mb-4">Farmer Activity Log</h2>
    <ul className="space-y-3">
      {logs.map((log, index) => (
        <li key={index} className="flex justify-between text-sm text-gray-700">
          <div>
            <p className="font-medium">{log.date}</p>
            <p>{log.name} - {log.action}</p>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              log.status === "Completed"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {log.status}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default FarmerActivityLog;
