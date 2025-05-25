import TemperatureTrendChart from "../..//components/TemperatureTrendChart";
import HealthStatusPieChart from "../../components/HealthStatusPieChart";
import HeartTrendChart from "../../components/HeartTrendChart";
import LivestockStatusTable from "../../components/LiveStockStatusTable";

const Report = () => {
  return (
    <div className="w-full md:w-[1194px] bg-white p-4 md:p-5 mx-auto">
      <div className="flex flex-col gap-6 md:gap-3 md:justify-center">

        {/* Top Charts Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-[4rem] w-full h-auto md:h-[300px]">
          <div className="w-full md:w-auto">
            <TemperatureTrendChart />
          </div>
          <div className="w-full md:w-auto">
            <HealthStatusPieChart />
          </div>
        </div>

        {/* Heart Chart */}
        <div className="w-full md:w-[497px] md:h-[300px] mt-6">
          <HeartTrendChart />
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-6">
        <LivestockStatusTable />
      </div>
    </div>
  );
};

export default Report;
