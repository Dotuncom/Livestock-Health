// //src/components/LiveStockStatusTable.jsx
// import React from "react";

// const livestockData = [
//   {
//     id: "Cow #001",
//     temperature: 0,
//     heartRate: 0,
//     motion: 0,
//     location: "Last seen: A field",
//     status: "Deceased",
//   },
//   {
//     id: "Cow #005",
//     temperature: 88,
//     heartRate: 88,
//     motion: 200,
//     location: "Barn C, GPS: &.21",
//     status: "Healthy",
//   },
//   {
//     id: "Cow #009",
//     temperature: 88,
//     heartRate: 70,
//     motion: 520,
//     location: "Barn C, GPS: &.21",
//     status: "At Risk",
//   },
// ];

// const LivestockStatusTable = () => {
//   return (
//     <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
//       <table className="min-w-[1101px]  table-auto text-sm text-left border border-gray-200">
//         <thead className="bg-gray-100 text-gray-700">
//           <tr>
//             <th className=" border">Animal ID</th>
//             <th className="px-4 py-2 border">Temperature</th>
//             <th className="px-4 py-2 border">Heart Rate (BPM)</th>
//             <th className="px-4 py-2 border">Motion (Steps)</th>
//             <th className="px-4 py-2 border">Location</th>
//             <th className="px-4 py-2 border">Status</th>
//           </tr>
//         </thead>
//         <tbody className="text-gray-800 bg-[#E6E3E3] w-[20px]">
//           {livestockData.map((animal, index) => (
//             <tr key={index} className="hover:bg-gray-50 ">
//               <td className="px-4 py-2 border">{animal.id}</td>
//               <td className="px-4 py-2 border">{animal.temperature}</td>
//               <td className="px-4 py-2 border">{animal.heartRate}</td>
//               <td className="px-4 py-2 border">{animal.motion}</td>
//               <td className="px-4 py-2 border">{animal.location}</td>
//               <td className="px-4 py-2 border font-semibold">{animal.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LivestockStat
const livestockData = [
  {
    id: "Cow #001",
    heartRate: 0,
    bloodOxygen: "0%",
    steps: 0,
    temperature: 0,
    time: "2025-05-28 09:00",
  },
  {
    id: "Cow #005",
    heartRate: 88,
    bloodOxygen: "97%",
    steps: 1230,
    temperature: 101.2,
    time: "2025-05-28 09:05",
  },
  {
    id: "Cow #009",
    heartRate: 75,
    bloodOxygen: "91%",
    steps: 985,
    temperature: 102.4,
    time: "2025-05-28 09:06",
  },
];

const LivestockStatusTable = () => {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-xl shadow p-4">
      <table className="min-w-[750px] md:min-w-full table-auto text-sm text-left border border-gray-200">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 border">Animal ID</th>
            <th className="px-4 py-2 border">Heart Rate (BPM)</th>
            <th className="px-4 py-2 border">Blood Oxygen (SpO₂)</th>
            <th className="px-4 py-2 border">Step Count</th>
            <th className="px-4 py-2 border">Temperature (°F)</th>
            <th className="px-4 py-2 border">Time</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 bg-[#E6E3E3]">
          {livestockData.map((animal, index) => (
            <tr key={inex} className="hover:bg-gray-50">
              <td className="px-4 py-2 border font-semibold">{animal.id}</td>
              <td className="px-4 py-2 border">{animal.heartRate}</td>
              <td className="px-4 py-2 border">{animal.bloodOxygen}</td>
              <td className="px-4 py-2 border">{animal.steps}</td>
              <td className="px-4 py-2 border">{animal.temperature}</td>
              <td className="px-4 py-2 border text-gray-600">{animal.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LivestockStatusTable;
