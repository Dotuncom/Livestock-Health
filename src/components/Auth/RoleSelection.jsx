import React from "react";
import authbg from "../../assets/authbg.png"
import logoo from "../../assets/logoo.png";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat bg-black/70 relative flex justify-center items-center relative"
      style={{ backgroundImage: `url(${authbg})` }}
    >
      {/* Logo (only mobile view) */}
      <div
        className="md:hidden h-[165px] w-[95px] absolute top-[80px] left-[110px] bg-contain bg-no-repeat z-10"
        style={{ backgroundImage: `url(${logoo})` }}
      ></div>

      {/* Main Card */}
      <div className="w-full max-w-[500px] md:h-[500px] h-[503px] absolute md:relative bottom-0 bg-stone-900/70 rounded-t-[30px] md:rounded-[30px] flex flex-col items-center justify-center text-white px-6 md:px-10 shadow-lg">
        {/* Title */}
        <h2 className="text-[32px] md:text-[50px]  font-semibold text-center mb-2 leading-tight">
          Are you a Farmer <br /> or a Vet?
        </h2>

        {/* Subtitle */}
        <p className="text-[13px] md:text-[20px] text-center text-neutral-300 mb-6 leading-relaxed">
          Choose your role to get started <br /> with Qiwo farm.
        </p>

        {/* Buttons */}
        <button
          onClick={() => navigate("/farmer-form", { state: { userType: "farmer" } })}
          className="w-[247px] md:w-full md:max-w-[409px]  h-[45px] md:h-[58px] text-[16px] md:text-2xl py-2 mb-4 bg-[#1d4719] hover:bg-green-800 text-white rounded-2xl font-semibold transition-all"
        >
          I'm a Farmer
        </button>

        <button
          onClick={() => navigate("/vet-form", { state: { userType: "vet" } })}
          className="w-[247px] md:w-full md:max-w-[409px] h-[45px] md:h-[58px] text-[16px] md:text-2xl py-2 bg-transparent rounded-2xl outline outline-1 outline-white hover:bg-white hover:text-black text-white font-semibold transition-all"
        >
          I'm a Vet
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
