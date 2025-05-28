import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const DeviceStatusTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
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
    };

    fetchData();
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
      <div className="flex items-center justify-center gap-2 text-base sm:text-lg font-semibold">
        {connected ? (
          <>
            <Icon icon="mdi:check-circle" className="text-green-600" width={24} height={24} />
            <span className="text-green-700">Connected</span>
          </>
        ) : (
          <>
            <Icon icon="mdi:close-circle" className="text-red-600" width={24} height={24} />
            <span className="text-red-700">Disconnected</span>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Device Status</h1>

      <table className="w-full border border-gray-300 border-collapse text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-3 text-lg font-semibold text-gray-700">
              Animal ID
            </th>
            <th className="border border-gray-300 px-4 py-3 text-lg font-semibold text-gray-700 flex justify-center items-center gap-1">
              <BatteryIcon />
              Battery %
            </th>
            <th className="border border-gray-300 px-4 py-3 text-lg font-semibold text-gray-700">
              Connection
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ no, battery, connected }, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-none"
            >
              <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800 text-base sm:text-lg whitespace-nowrap">
                {no}
              </td>
              <td
                className={`border border-gray-300 px-4 py-3 font-semibold text-base sm:text-lg flex justify-center items-center gap-1 whitespace-nowrap ${getBatteryColor(
                  battery
                )}`}
              >
                <BatteryIcon />
                {battery}%
              </td>
              <td className="border border-gray-300 px-4 py-3">
                <ConnectedStatus connected={connected} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceStatusTable;
