
import StatCard from "../../cards/StatsCard";
import RegAni from "../../assets/register.png";
import Abnormal from "../../assets/abnormalvital.png";
import attention from '../../assets/attention.png';
import speaker from '../../assets/speaker.png';
import HealthStatusPieChart from "../../components/HealthStatusPieChart";
import DeviceStatus from '../../components/DeviceStatus';

import LivestockTracker from "../../components/LivestockTracker";
import SensorDataTable from "../../components/SensorDataTable";
function Dashboard() {
  return (

    <div className="p-2 md:p-4 bg-white">
      <h1>Dashboard Overview</h1>
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={RegAni} value={"32"} title={"Register Animal"} />
        <StatCard icon={Abnormal} value={"6"} title={"Animal with Abnormal Vitals"} />
        <StatCard icon={attention} value={"6"} title={"Animal 002 needs Attention"} />
        <StatCard icon={speaker} value={"6"} title={"Upcoming Reminder"} />
      </div>

      {/* Location & Pie Chart */}
<div className="mt-10 flex flex-col gap-6 md:flex-row">
  {/* Animal Location */}
  <div className="w-full md:w-7/12">
    <h1 className="text-xl md:text-2xl font-bold Nunito mb-4">Animal Location</h1>
    <div className="flex justify-center md:block">
      <div className="w-[300px] h-[300px] md:w-full md:h-[400px]">
        <LivestockTracker />
      </div>
    </div>
  </div>

  {/* Recent Statistics */}
  <div className="w-full md:w-5/12">
    <h1 className="text-xl md:text-2xl font-bold Nunito mb-4">Recent Statistics</h1>
    <div className="w-full  md:h-[400px] overflow-x-auto">
      <HealthStatusPieChart />
    </div>
  </div>
</div>


      {/* Status Table & Device Status */}
      <div className="mt-10 flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-7/12">
          <h1 className="text-xl md:text-2xl font-bold Nunito mb-4">Recent Statistics</h1>
          <SensorDataTable/>
        </div>
        <div className="w-full md:w-5/12">
          <h1 className="text-xl md:text-2xl font-bold Nunito mb-4">Device Status</h1>
          <DeviceStatus />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
