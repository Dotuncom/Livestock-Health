//VitalTables.jsx
import React from "react";

const mockVitals = [
  {
    id: 1,
    animal: "Cow A",
    temperature: 39.5,
    heartRate: 75,
    motion: "Active",
    location: "Pasture 3",
  },
  {
    id: 2,
    animal: "Cow B",
    temperature: 38.8,
    heartRate: 80,
    motion: "Idle",
    location: "Barn",
  },
  {
    id: 3,
    animal: "Cow C",
    temperature: 41.2,
    heartRate: 95,
    motion: "Restless",
    location: "Field 1",
  },
];

const VitalsTable = () => {
  return (
    <div className="bg-[#535252] text-white rounded-lg shadow w-[721px] h-[272px] overflow-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-900">
          <tr>
            <th className="p-3">Animal</th>
            <th className="p-3 bg-[#262626]" >Temperature</th>
            <th className="p-3">Heart Rate</th>
            <th className="p-3">Motion</th>
            <th className="p-3">Location</th>
          </tr>
        </thead>
        <tbody>
          {mockVitals.map((vital) => (
            <tr key={vital.id} className=" even:bg-gray-700">
              <td className="p-3 font-medium">{vital.animal}</td>
              <td className="p-3">{vital.temperature} °C</td>
              <td className="p-3">{vital.heartRate} bpm</td>
              <td className="p-3">{vital.motion}</td>
              <td className="p-3">{vital.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VitalsTable;
