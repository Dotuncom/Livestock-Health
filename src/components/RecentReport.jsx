//src/components/RecentReport.jsx
// src/components/RecentReports.jsx
import React from "react";

const reports = [
  { date: "April 28", animal: "Cow #102", issue: "High Temperature", status: "Critical" },
  { date: "April 27", animal: "Goat #12", issue: "Limping", status: "Moderate" },
  { date: "April 26", animal: "Sheep #42", issue: "Cough", status: "Resolved" },
];

const RecentReports = () => (
  <div className="bg-white shadow p-4 rounded-lg">
    <h2 className="font-bold text-lg mb-4">Recent Animal Reports</h2>
    <ul className="space-y-3">
      {reports.map((report, index) => (
        <li key={index} className="flex justify-between text-sm text-gray-700">
          <div>
            <p className="font-medium">{report.date}</p>
            <p>{report.animal} - {report.issue}</p>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              report.status === "Critical"
                ? "bg-red-100 text-red-600"
                : report.status === "Moderate"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {report.status}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentReports;
