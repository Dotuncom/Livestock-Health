//src/components/StatusTable.jsx

  
  function StatusTable() {
    const data = [
        { id: 'Cow #001', temp: 0, heartRate: 0, motion: 0, location: 'Last seen: A field', status: 'Deceased' },
        { id: 'Cow #005', temp: 88, heartRate: 88, motion: 200, location: 'Barn C, GPS: 8.21', status: 'Healthy' },
        { id: 'Cow #004', temp: 88, heartRate: 88, motion: 200, location: 'Barn C, GPS: 8.21', status: 'Healthy' },
        { id: 'Cow #003', temp: 0, heartRate: 0, motion: 0, location: 'Last seen: A field', status: 'Deceased' },
        { id: 'Cow #006', temp: 88, heartRate: 88, motion: 200, location: 'Barn C, GPS: 8.21', status: 'Healthy' },
      ];
    return (
      <div className="overflow-x-auto p-4">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Animal ID</th>
              <th className="px-4 py-2 border">Temperature</th>
              <th className="px-4 py-2 border">Heart Rate (BPM)</th>
              <th className="px-4 py-2 border">Motion (Steps)</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cow, i) => (
              <tr key={i} className="text-center">
                <td className="border px-4 py-2">{cow.id}</td>
                <td className="border px-4 py-2">{cow.temp}</td>
                <td className="border px-4 py-2">{cow.heartRate}</td>
                <td className="border px-4 py-2">{cow.motion}</td>
                <td className="border px-4 py-2">{cow.location}</td>
                <td
                  className={`border px-4 py-2 font-semibold ${
                    cow.status === 'Deceased' ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {cow.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  export default StatusTable