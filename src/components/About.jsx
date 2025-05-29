// //src/components/About.jsx
// import AboutContainer from "../utils/AboutContainer";
import AboutImg from "../assets/AboutImage.png";
import React from "react";

const About = () => {
  return (
    <div className="">
      <h1 className="  flex items-center justify-center md:text-[43px] h-[100px] text-center  text-2xl Poppins font-bold bg-[#EFEEEE]">
        About us
      </h1>
      <div className="flex flex-col md:flex-row md:h-[600px] ">
        <div
          className=" h-[218px] md:w-full md:min-w-[570px]   md:h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${AboutImg})` }}
        ></div>
        <div className="text-center  text-[13px] md:text-left Inter bg-[#1D4719] md:w-full md:text-[20px]  text-white pl-[43px] md:pr-[100px] ">
          <div className="w-[300px] pt-[35px] md:w-full  md:text-xl space-y-[2rem] px-[10px] leading-[20px] md:space-y-[1rem] md:pt-[100px] md:space-y-[53px] md:leading-[32px] ">
            <h1 className=" text-[13px] md:text-[14px] md:[62px] leading-loose  font-bold">
              At Qiwo Cares, we’re transforming livestock farming with the power
              of smart technology
            </h1>
            <p className="">
              Our mission is simple: to help farmers protect their animals,
              reduce losses, and make faster, data-driven decisions. We’ve built
              an intelligent health monitoring system that combines a
              user-friendly web app with a powerful device that tracks your
              animals' condition in real time. With Qiwo, you get early alerts,
              health reports, and insights all in one place, accessible anytime,
              anywhere. Whether you manage a small herd or a large-scale
              operation, Qiwo gives you the tools to stay ahead of disease and
              care for your animals like never before.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
