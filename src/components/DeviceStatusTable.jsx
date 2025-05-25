//src/components/DeviceStatusTable.jsx
import React, { useEffect, useState } from "react";
import {
  FaBatteryFull,
  FaPlug,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const DeviceStatusTable = () => {
  const [data, setData] = useState([]);

  // Simulate fetching data (hardcoded for now)
  useEffect(() => {
    // Later: replace with actual API call
    const fetchData = async () => {
      const fakeData = [
        { no: 0.11, battery: 80, connected: false, neckStrap: false },
        { no: 0.15, battery: 90, connected: false, neckStrap: false },
        { no: 0.25, battery: 35, connected: true, neckStrap: true },
        { no: 0.21, battery: 15, connected: false, neckStrap: false },
        { no: 0.55, battery: 0, connected: false, neckStrap: false },
        { no: 0.45, battery: 49, connected: true, neckStrap: true },
        { no: 0.22, battery: 0, connected: false, neckStrap: false },
        { no: 0.35, battery: 29, connected: true, neckStrap: true },
        { no: 0.44, battery: 80, connected: true, neckStrap: true },
        { no: 0.20, battery: 20, connected: true, neckStrap: true },
      ];

      setData(fakeData);
    };

    fetchData();
  }, []);

  const getBatteryColor = (level) => {
    if (level >= 50) return "text-green-600";
    if (level >= 20) return "text-yellow-500";
    return "text-red-600";
  };

  const renderIcon = (status) =>
    status ? (
      <FaCheckCircle className="text-green-600 mx-auto" />
    ) : (
      <FaTimesCircle className="text-red-600 mx-auto" />
    );

  return (
    <div className="flex md:w-[px] mt-[10px] gap-8 p-10 bg-white rounded-lg shadow-md">
      {/* Sidebar */}
      <div className="flex flex-col gap-[40px] text-green-900 text-base mt-10">
        <div className="flex items-center gap-3">
          <FaBatteryFull className="text-2xl" />
          <span>Battery Level</span>
        </div>
        <div className="flex items-center gap-3">
          <FaPlug className="text-2xl" />
          <span>Connection Status</span>
        </div>
        <div className="flex items-center gap-3">
          <FaExclamationTriangle className="text-2xl" />
          <span>Neck Strap</span>
        </div>
      </div>

      {/* Table */}
      <table className="table-auto border-collapse  w-[443px] border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">N.O</th>
            <th className="border border-gray-300 px-4 py-2">
              <FaBatteryFull />
            </th>
            <th className="border border-gray-300 px-4 py-2">
              <FaPlug />
            </th>
            <th className="border border-gray-300 px-4 py-2">
              <FaExclamationTriangle />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{item.no}</td>
              <td className={`border px-4 py-2 font-semibold ${getBatteryColor(item.battery)}`}>
                {item.battery}%
              </td>
              <td className="border px-4 py-2">{renderIcon(item.connected)}</td>
              <td className="border px-4 py-2">{renderIcon(item.neckStrap)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceStatusTable;
