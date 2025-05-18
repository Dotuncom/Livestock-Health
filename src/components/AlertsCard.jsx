// src/components/AlertCard.jsx
import React from "react";
import { Icon } from "@iconify/react";

// Mock alert data (from db.json or imported)
const mockAlerts = [
  {
    id: 1,
    animal: "Cow A",
    status: "High Temperature",
    timestamp: "2 mins ago",
  },
  {
    id: 2,
    animal: "Cow C",
    status: "Abnormal Heart Rate",
    timestamp: "10 mins ago",
  },
];

const AlertCard = () => {
  return (
    <div className="grid grid-cols-1 gap-4 h-[721px] w-[312px]">
      {mockAlerts.map((alert) => (
        <div
          key={alert.id}
          className="bg-black text-white p-4 rounded-lg shadow flex flex-col justify-between h-[332px]"
        >
          <div>
            <h3 className="text-xl font-bold mb-2">{alert.animal}</h3>
            <p className="text-base">{alert.status}</p>
          </div>
          <div className="text-sm text-gray-400">{alert.timestamp}</div>
        </div>
      ))}
    </div>
  );
};

export default AlertCard;
