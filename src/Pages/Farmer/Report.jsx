// import TemperatureTrendChart from '../../components/TemperatureTrendChart';
// import HeartTrendChart from '../../components/HeartTrendChart';
// import HealthPieChart from '../../components/HealthStatusPieChart';
// import SensorDataTable from '../../components/SensorDataTable';
// export default function Dashboard() {
//   const dummyData = [
//     { id: '005', temperature: 101.2, heartbeat: 72, steps: 2345, status: 'Healthy' },
//     { id: '006', temperature: 102.3, heartbeat: 89, steps: 2100, status: 'At Risk' },
//     { id: '007', temperature: 103.1, heartbeat: 95, steps: 1950, status: 'Critical' },
//   ];
  
//   return (
//     <div className="p-4 space-y-8 bg-white min-w-screen min-h-screen overflow-x-hidden">
//       <h1 className="text-2xl font-bold">LiveStock Health Report</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         <div className="bg-[#f8f9fa] h-[500px] w-full  rounded-lg p-4 shadow">
//           <h2 className="font-semibold text-xl mb-2">Health Distribution</h2>
//           <HealthPieChart/>
//         </div>

//         <div className="bg-[#f8f9fa] rounded-lg p-4 shadow">
//           <h2 className="font-semibold text-xl mb-5">Temperature Trend</h2>
//           <TemperatureTrendChart />
//         </div>

//         <div className="bg-[#f8f9fa] rounded-lg p-4 shadow">
//           <h2 className="font-semibold text-xl mb-2">Heartbeat Trend</h2>
//           <HeartTrendChart />
//         </div>
//       </div>
//       <div className="p-4 space-y-8 bg-white min-h-screen overflow-x-hidden">
//       <h1 className="text-2xl font-bold">Sensor Data Overview</h1>

//       <SensorDataTable data={dummyData} />
//     </div>
//     </div>
//   );
// }
import TemperatureTrendChart from '../../components/TemperatureTrendChart';
import HeartTrendChart from '../../components/HeartTrendChart';
import HealthPieChart from '../../components/HealthStatusPieChart';
import SensorDataTable from '../../components/SensorDataTable';

export default function Dashboard() {
  const dummyData = [
    { id: '005', temperature: 101.2, heartbeat: 72, steps: 2345, status: 'Healthy' },
    { id: '006', temperature: 102.3, heartbeat: 89, steps: 2100, status: 'At Risk' },
    { id: '007', temperature: 103.1, heartbeat: 95, steps: 1950, status: 'Critical' },
  ];

  return (
    <div className="p-2 md:p-6 space-y-6 bg-white min-h-screen overflow-x-hidden max-w-screen">
      <h1 className="text-xl md:text-2xl font-bold">LiveStock Health Report</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Health Distribution */}
        <div className="bg-[#f8f9fa] w-full rounded-lg p-4 shadow min-h-[300px] md:min-h-[350px] flex flex-col">
          <h2 className="font-semibold text-lg md:text-xl mb-3">Health Distribution</h2>
          <div className="flex-grow">
            <HealthPieChart width={300} height={280} />
          </div>
        </div>

        {/* Temperature Trend */}
        <div className="bg-[#f8f9fa] w-full rounded-lg p-4 shadow min-h-[300px] md:min-h-[350px] flex flex-col">
          <h2 className="font-semibold text-lg md:text-xl mb-3">Temperature Trend</h2>
          <div className="flex-grow">
            <TemperatureTrendChart width={300} height={280} />
          </div>
        </div>

        {/* Heartbeat Trend */}
        <div className="bg-[#f8f9fa] w-full rounded-lg p-4 shadow min-h-[300px] md:min-h-[350px] flex flex-col">
          <h2 className="font-semibold text-lg md:text-xl mb-3">Heartbeat Trend</h2>
          <div className="flex-grow">
            <HeartTrendChart width={300} height={280} />
          </div>
        </div>
      </div>

      <div className="p-2 md:p-6 space-y-6 bg-white">
        <h1 className="text-xl md:text-2xl font-bold">Sensor Data Overview</h1>
        <SensorDataTable data={dummyData} />
      </div>
    </div>
  );
}
