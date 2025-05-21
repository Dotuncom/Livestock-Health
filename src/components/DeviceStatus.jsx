//src/components/DeviceStatus.jsx
import React from "react";
import battery from '../assets/battery.png'
import neckstrap from '../assets/neckstrap.png'
import status from '../assets/status.png'
const DeviceStatus = () => {
  return (
    <div className=" flex flex-col md:w-[340px] md:h-[240px] justify-center p-9 bg-[#EFEEEE]">
      
      <div className="flex items-center space-x-3">
        <img 
        className="w-[60px] h-[40px] "
        src={battery} alt="" />
         <span className="font-bold">Battery Level</span>
      </div>

      <div className="flex items-center space-x-3">
        <img 
        className="w-[60px] h-[40px] "
        src={status} alt="" />
         <span className="font-bold">Connection Status</span>
      </div>

      <div className="flex items-center space-x-3">
        <img 
        className="w-[60px] h-[40px] "
        src={neckstrap} alt="" />
         <span className="font-bold">Neck Strap</span>
      </div>
     
    </div>
  );
};

export default DeviceStatus;
