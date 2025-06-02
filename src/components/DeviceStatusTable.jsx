import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const DeviceStatusTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fakeData = [
      { no: "0.11", battery: 80, connected: false },
      { no: "0.15", battery: 90, connected: false },
      { no: "0.25", battery: 35, connected: true },
      { no: "0.21", battery: 15, connected: false },
      { no: "0.55", battery: 0, connected: false },
      { no: "0.45", battery: 49, connected: true },
      { no: "0.22", battery: 0, connected: false },
      { no: "0.35", battery: 29, connected: true },
      { no: "0.44", battery: 80, connected: true },
      { no: "0.20", battery: 20, connected: true },
    ];
    setData(fakeData);
  }, []);

  const getBatteryColor = (level) => {
    if (level >= 50) return "text-green-600";
    if (level >= 20) return "text-yellow-500";
    return "text-red-600";
  };

  const BatteryIcon = () => (
    <Icon icon="mdi:battery" width={20} height={20} className="inline-block mr-1" />
  );

  const ConnectedStatus = ({ connected }) => {
    return (
      <div className={`flex items-center gap-1 font-semibold ${connected ? "text-green-600" : "text-red-600"}`}>
        <Icon
          icon={connected ? "mdi:check-circle" : "mdi:close-circle"}
          width={20}
          height={20}
        />
        <span>{connected ? "Connected" : "Disconnected"}</span>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Device Status</h1>

      {/* Responsive table wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[320px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2 text-left text-sm sm:text-base font-semibold text-gray-700">
                Animal ID
              </th>
              <th className="border px-3 py-2 text-left text-sm sm:text-base font-semibold text-gray-700 flex items-center gap-1">
                <BatteryIcon />
                Battery %
              </th>
              <th className="border px-3 py-2 text-left text-sm sm:text-base font-semibold text-gray-700">
                Connection
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ no, battery, connected }, idx) => (
              <tr
                key={idx}
                className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <td className="border px-3 py-2 text-gray-800 text-sm sm:text-base whitespace-nowrap">
                  {no}
                </td>
                <td
                  className={`border px-3 py-2 font-semibold text-sm sm:text-base flex items-center gap-1 whitespace-nowrap ${getBatteryColor(
                    battery
                  )}`}
                >
                  <BatteryIcon />
                  {battery}%
                </td>
                <td className="border px-3 py-2">
                  <ConnectedStatus connected={connected} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeviceStatusTable;
