import StatCard from "../../cards/StatsCard";
import RegAni from "../../assets/register.png";
import Abnormal from "../../assets/abnormalvital.png";
import attention from '../../assets/attention.png'
import speaker from '../../assets/speaker.png'
import HealthStatusPieChart from "../../components/HealthStatusPieChart";
import DeviceStatus from  '../../components/DeviceStatus'
import StatusTable from '../../components/StatusTable'
import LivestockTracker from "../../components/LivestockTracker";

 function Dashboard() {
  return (
    <div className=" p-[2rem] bg-white">
      <div className="grid   grid-cols-[repeat(auto-fit,minmax(256px,1fr))]  md:grid-cols-2  lg:grid-cols-4  gap-[30px]">
        <StatCard icon={RegAni} value={"32"} title={"Register Animal"} />
        <StatCard
          icon={Abnormal}
          value={"6"}
          title={"Animal with Abnormal Vitals"}
        />
        <StatCard
          icon={attention}
          value={"6"}
          title={"Animal 002 needs Attention"}
        />
        <StatCard icon={speaker} value={"6"} title={"Upcoming Reminder"} />
      </div>
      <div className="flex flex-col md:mt-[58px] px-[36px]">
        <div className="flex gap-[38px] w-full">
          <div className=" min-w-[741px]">
          <h1 className="text-2xl Nunito font-bold">Animal Location</h1>
          <LivestockTracker/>
          </div>
          <div>
            <h1 className="text-2xl Nunito font-bold">Recent Statics</h1>
          <HealthStatusPieChart/>
          </div>
        </div>
        <div className="flex mt-[2rem] gap-[38px]">
          <div className=" min-w-[741px]" >
          <h1 className="text-2xl Nunito font-bold">Recent Statics</h1>
            <StatusTable/>
          </div>
          <div>
          <h1 assName="text-2xl Nunito font-bold">Device Status</h1>
          <DeviceStatus/>
          </div>
        </div>
    </div>
    </div>
  );
}
export default Dashboard;