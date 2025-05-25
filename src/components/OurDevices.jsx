import React from "react";
import deviceback  from '../assets/deviceback.png'
import ourdevice from '../assets/ourdeviceimage.png'

const OurDevices = () => {
  return (
    <div className="flex flex-col md:flex-row md:h-[600px]">
      <div className="text-base space-y-3 px-4 md:w-1/2 md:p-[100px] md:space-y-[4rem]">
        <h1 className="font-bold md:text-5xl">Introduction to Our Device</h1>
        <p className="md:text-[20px] md:leading-[30px] ">
          QiwoFarms is a durable device designed to monitor your livestock’s
          vital health signs — specifically body temperature, motion, heart
          rate, and location in real time. By closely tracking these critical
          indicators, QiwoFarms helps farmers detect early signs of illness
          symptoms and stress long before visible symptoms appear. Our device
          operates continuously and Real-time, storing data securely even
          without internet, and delivers instant alerts through the Qiwo app
          when health readings fall outside safe ranges. With QiwoFarms, farmers
          can act faster, treat diseases earlier, and protect their livestock’s
          health with confidence, no matter where they are.
        </p>
      </div>
      <div className="p-[20px] md:w-1/2 h-[375px] bg-center bg-cover md:flex bg-blur items-center justify-center md:h-full" style={{backgroundImage:`url(${deviceback})`}}>
        <img 
        className=" bg-center md:min-w[412px]  md:h-[400px] md:w-[400px] h-[300px] w-[300px]"
        src={ourdevice} alt="" />
      </div>
    </div>
  );
};

export default OurDevices;
