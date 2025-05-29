import React, { useState, useRef } from "react";
import signupbg from "../../assets/signupbg.svg";
import logoo from "../../assets/logoo.png";
import { useNavigate, useLocation } from "react-router-dom";

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userType } = location.state || {};

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter a 6-digit OTP.");
      return;
    }

    alert(`OTP Verified for ${userType || "user"}! Proceeding...`);

    if (userType === "farmer") {
      navigate("/farmer-dashboard");
    } else if (userType === "vet") {
      navigate("/vet-dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat flex justify-center items-center relative"
      style={{ backgroundImage: `url(${signupbg})` }}
    >
      <div
        className="md:hidden h-[165px] w-[95px] absolute top-[80px] left-[106px] bg-contain bg-no-repeat z-10"
        style={{ backgroundImage: `url(${logoo})` }}
      ></div>

      <div className="w-full max-w-[500px] md:h-[400px] h-[420px] absolute md:relative bottom-0 md:pt-[37px] bg-stone-900/70 rounded-t-[30px] md:rounded-[30px] flex flex-col items-center justify-center text-white px-6 md:px-10 shadow-lg">
        <h2 className="text-2xl md:text-[50px] font-semibold text-center mb-4 leading-tight">
          Verify  Your Account
        </h2>
        <p className="text-2xl text-center text-neutral-300 mb-6 leading-relaxed">
          Please enter the 6-digit code sent to your registered{" "}
          {userType === "vet"
            ? "email or phone for Vet account."
            : "email or phone for Farmer account."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full max-w-[350px]"
        >
          <div className="flex gap-2 md:gap-4 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-[40px] h-[50px] md:w-[50px] md:h-[60px] text-center text-black text-xl md:text-2xl bg-white rounded-lg outline-none border border-gray-300 focus:border-green-600"
              />
            ))}
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full h-[58px]  bg-[#1D4719] hover:bg-green-800 text-white rounded-2xl font-semibold text-xl transition-all"
          >
            Verify OTP
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default OTPVerification;
