import React from "react";
import battery from "../assets/battery.png";
import neckstrap from "../assets/neckstrap.png";
import status from "../assets/status.png";

const DeviceStatus = () => {
  return (
    <div className="flex flex-col justify-center space-y-6 p-6 bg-[#EFEEEE] rounded-xl shadow-md w-full max-w-md mx-auto sm:max-w-full sm:px-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
        <img className="w-[60px] h-[40px]" src={battery} alt="Battery Icon" />
        <span className="font-bold text-base sm:text-lg">Battery Level</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
        <img className="w-[60px] h-[40px]" src={status} alt="Connection Icon" />
        <span className="font-bold text-base sm:text-lg">Connection Status</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
        <img className="w-[60px] h-[40px]" src={neckstrap} alt="Neck Strap Icon" />
        <span className="font-bold text-base sm:text-lg">Neck Strap</span>
      </div>
    </div>
  );
};

export default DeviceStatus;
