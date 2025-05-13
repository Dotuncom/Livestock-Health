import { useRef, useState } from "react";

const OTPInput = ({ length = 6, onComplete }) => {
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // only keep last digit if multiple entered
    setOtp(newOtp);

    // Move to next input if current is filled
    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    // Call onComplete if all filled
    if (newOtp.every((digit) => digit !== "") && onComplete) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className='flex justify-center  gap-3 mt-6 mb-4'>
      {otp.map((digit, index) => (
        <input
          key={index}
          type='text'
          inputMode='numeric'
          maxLength='1'
          className='w-12 lg:w-30 h-12 lg:h-30 text-2xl text-center border border-white/80 rounded focus:outline-none bg-transparent text-white'
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputsRef.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
