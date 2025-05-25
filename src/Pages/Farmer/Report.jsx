//src/Pages/Farmer/Report.jsx
import TemperatureTrendChart from "../../components/TemperatureTrendChart";
import HealthStatusPieChart from "../../components/HealthStatusPieChart";
import HeartTrendChart from "../../components/HeartTrendChart";
import LivestockStatusTable from "../../components/LiveStockStatusTable";
const Report = () => {
  return (
    <div className="w-full md:w-[1194px] bg-white p-5">
      <div className="flex flex-col md:p-25 md:w-full md:gap-3 md:justify-center">
        <div className="w-full flex flex-col md:flex-row items-center gap-6 md:gap-[4rem] h-auto md:h-[300px]">
          <div className="">
            <TemperatureTrendChart />
          </div>
          
          <div className="">
            <HealthStatusPieChart />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:w-[497px] md:h-[300px] h-auto w-full mt-6">
          <HeartTrendChart />
        </div>
      </div>
      <div className="mt-6">
        <LivestockStatusTable />
      </div>
    </div>
  );
};

export default Report;
