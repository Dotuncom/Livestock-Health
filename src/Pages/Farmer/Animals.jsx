// import React from "react";
// import TemperatureTrendChart from "../../components/TemperatureTrendChart";
// import HealthStatusPieChart from "../../components/HealthStatusPieChart";
// import HeartTrendChart from "../../components/HeartTrendChart";
// import LivestockStatusTable from "../../components/LiveStockStatusTable";

// const Animals = () => {
//   return (
//     <div className="md:w-[1194px] bg-white p-5">
//       <div className="  flex flex-col md:p-30 md:w-full md:gap-3 md:justify-center">
//         <div className="w-full h-[300px] gap-[6rem] flex  md:flex-row items-center">
//           <TemperatureTrendChart/>
//           <HealthStatusPieChart/>
//         </div>

//         <div className="flex w-[497px] h-[300px] gap-[2rem]  items-center">
//           <HeartTrendChart/>
//         </div>
//       </div>
//       <LivestockStatusTable/>

//     </div>
//   );
// };

// export default Animals;
import React from "react";
import TemperatureTrendChart from "../../components/TemperatureTrendChart";
import HealthStatusPieChart from "../../components/HealthStatusPieChart";
import HeartTrendChart from "../../components/HeartTrendChart";
import LivestockStatusTable from "../../components/LiveStockStatusTable";

const Animals = () => {
  return (
    <div className="w-full md:w-[1194px] bg-white p-5">
      <div className="flex flex-col md:p-30 md:w-full md:gap-3 md:justify-center">
        <div className="w-full flex flex-col md:flex-row items-center gap-6 md:gap-[6rem] h-auto md:h-[300px]">
          <div className="w-full">
            <TemperatureTrendChart />
          </div>
          <div className="w-full">
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

export default Animals;
