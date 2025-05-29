import { Link } from "react-router-dom";
function Hero() {
  const xml = (
    <div className="w-full flex justify-center items-center opacity-90 bg-gradient-to-l from-black/80 via-zinc-800/70 to-neutral-700/80 hero h-[90rem] relative max-lg:h-[64.2rem]">
      <div className="w-full h-full absolute top-0 left-0 pt-[calc(15.1rem)] pl-[clamp(1rem,7.222222222222222vw,10.4rem)] max-lg:px-0 max-lg:pt-[10.3rem] ">
        <div className="">
          <h1 className="font-[Poppins] font-semibold text-[6.4rem] leading-[141%] text-white mb-[1.9rem] max-lg:text-center max-lg:text-[2.8rem] max-lg:leading-[3.8rem] max-lg:mb-[2.3rem]">
            <span className="max-lg:hidden">
              Connect and Track <br />
              Real-time Health Insights
              <br />
              for your Animals
            </span>
            <span className="hidden max-lg:block">
              Connect Your Device
              <br /> and Get Real-Time <br />
              Health ALerts
            </span>
          </h1>
          <p className="font-[Poppins] text-[2.8rem] leading-[4.2rem] text-white mb-[6.5rem] max-lg:text-[1.6rem] max-lg:leading-[2.4rem] max-lg:text-center max-lg:mb-[2.3rem]">
            No more guesswork - just accurate animal <br />
            health insights
          </p>
          <Link
            to="/role-selection"
            className="block text-center w-[24.1rem] h-[7.1rem] leading-[7.1rem] rounded-[1rem] Inter font-[500] text-[2.4rem] text-[#FFF9F9] text-shadow-[3px_3px_4px_rgba(0,0,0,0.37)] bg-[#1D4719] max-lg:mx-auto max-lg:w-[16.9rem] max-lg:h-[4rem] max-lg:bg-[#1D4719] max-lg:leading-[4rem] max-lg:text-[1.6rem]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
  return xml;
}

export default Hero;
