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

const SensorDataTable = () => {
  return (
    <div className="w-full max-w-full bg-white shadow-md rounded-xl p-4">
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm text-left border border-gray-300">
          <thead className="bg-[#1d4719] text-white text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 border">Animal ID</th>
              <th className="px-4 py-3 border">Heart Rate (BPM)</th>
              <th className="px-4 py-3 border">Blood Oxygen (SpO₂)</th>
              <th className="px-4 py-3 border">Step Count</th>
              <th className="px-4 py-3 border">Temperature (°F)</th>
              <th className="px-4 py-3 border">Time</th>
            </tr>
          </thead>
          <tbody className="bg-[#E6E3E3] text-gray-800">
            {livestockData.map((animal, index) => (
              <tr key={index} className="hover:bg-gray-100 transition-colors">
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
    </div>
  );
};

export default SensorDataTable;
