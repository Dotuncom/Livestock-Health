//src/Pages/Farmer/Report.jsx
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
import TemperatureTrendChart from "../../components/TemperatureTrendChart";
import HeartTrendChart from "../../components/HeartTrendChart";
import HealthPieChart from "../../components/HealthStatusPieChart";
import SensorDataTable from "../../components/SensorDataTable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["livestock"],
    queryFn: async () => {
      const { data, error } = await supabase.from("livestock").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onError: (err) => {
      toast.error("Error fetching livestock (report) data: " + err.message);
    },
  });

  const handleSuccess = () => {
    toast.success("Report data updated successfully!");
  };

  const dummyData = [
    {
      id: "005",
      temperature: 101.2,
      heartbeat: 72,
      steps: 2345,
      status: "Healthy",
    },
    {
      id: "006",
      temperature: 102.3,
      heartbeat: 89,
      steps: 2100,
      status: "At Risk",
    },
    {
      id: "007",
      temperature: 103.1,
      heartbeat: 95,
      steps: 1950,
      status: "Critical",
    },
  ];

  return (
    <div className="px-8 md:p-6 space-y-6 bg-white min-h-screen overflow-x-hidden max-w-screen">
      <h1 className="text-xl md:text-2xl font-bold">LiveStock Health Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-9 md:gap-6">
        {/* Health Distribution */}
        <div className="bg-[#f8f9fa] w-full rounded-lg p-4 shadow flex flex-col space-y-2">
          <h2 className="font-semibold text-lg md:text-xl">
            Health Distribution
          </h2>
          <div className="w-full h-[250px] md:h-[300px]">
            <HealthPieChart />
          </div>
        </div>

        {/* Temperature Trend */}
        <div className="bg-[#f8f9fa] w-full rounded-lg p-4 shadow flex flex-col space-y-2">
          <h2 className="font-semibold text-lg md:text-xl">
            Temperature Trend
          </h2>
          <div className="w-full h-[250px] md:h-[300px]">
            <TemperatureTrendChart />
          </div>
        </div>

        {/* Heartbeat Trend */}
        <div className="bg-[#f8f9fa] w-full rounded-lg p-4 shadow flex flex-col space-y-2">
          <h2 className="font-semibold text-lg md:text-xl">Heartbeat Trend</h2>
          <div className="w-full h-[250px] md:h-[300px]">
            <HeartTrendChart />
          </div>
        </div>
      </div>

      {/* Sensor Data */}
      <div className="p-2 md:p-6 space-y-6 bg-white">
        <h1 className="text-xl md:text-2xl font-bold">Sensor Data Overview</h1>
        {isLoading ? (
          <p>Loading livestock (report) data…</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <ul>
            {data &&
              data.map((item) => (
                <li key={item.id}>
                  {item.name} (Status: {item.status})
                </li>
              ))}
          </ul>
        )}
        <button onClick={handleSuccess}>Simulate Update</button>
        <SensorDataTable data={dummyData} />
      </div>
    </div>
  );
}
