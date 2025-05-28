// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import logoo from "../../assets/logoo.png";
// import signupbg from "../../assets/signupbg.svg";

// export default function FarmerSignup() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const userType = location.state?.userType || "farmer";

//   const [signupData, setSignupData] = useState({
//     email: "",
//     name: "",
//     location: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSignupData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateSignup = () => {
//     if (
//       !signupData.email ||
//       !signupData.name ||
//       !signupData.location ||
//       !signupData.password ||
//       !signupData.confirmPassword
//     ) {
//       alert("Please fill in all fields");
//       return false;
//     }
//     if (signupData.password !== signupData.confirmPassword) {
//       alert("Passwords do not match");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateSignup()) {
//       navigate("/farmer-onboarding", { state: { signupData, userType } });
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden">
//       {/* Desktop Image Section */}
//       <div
//         className="hidden md:block md:w-1/2 bg-cover bg-center relative"
//         style={{ backgroundImage: `url(${signupbg})` }}
//       >
//         <div className="absolute inset-0 bg-black opacity-50 flex flex-col justify-center items-center">
//           <p className="text-white text-sm md:text-lg">
//             Your partner in livestock health
//           </p>
//         </div>
//       </div>

//       {/* Mobile background + logo */}
//       <div
//         className="block md:hidden w-full h-full absolute bg-cover bg-center -z-10"
//         style={{ backgroundImage: `url(${signupbg})` }}
//       >
//         <div className="block md:hidden w-full p-4 flex justify-center">
//           <img src={logoo} alt="Qiwo Farms" className="w-[165px] pt-7" />
//         </div>
//       </div>

//       {/* Form Section */}
//       <div className="w-full md:w-1/2 flex items-center justify-center p-6 mt-60 md:mt-0">
//         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[223px] md:max-w-[538px]">
//           <h2 className="text-2xl md:text-4xl md:font-bold mb-2 text-center md:text-left">
//             Create an Account
//           </h2>
//           <p className="text-sm md:text-lg md:text-gray-500 mb-6 text-center md:text-left">
//             Register your account
//           </p>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter Email"
//               value={signupData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded text-base md:text-2xl"
//             />
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={signupData.name}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded text-base md:text-2xl"
//             />
//             <input
//               type="text"
//               name="location"
//               placeholder="Location"
//               value={signupData.location}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded text-base md:text-2xl"
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={signupData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded text-base md:text-2xl"
//             />
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               value={signupData.confirmPassword}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded text-base md:text-2xl"
//             />
//             <button
//               type="submit"
//               className="w-full bg-green-800 text-white py-3 rounded hover:bg-green-900 text-lg md:text-4xl"
//             >
//               Next
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, User, MapPin, Lock } from "lucide-react";
import logoo from "../../assets/logoo.png";
import signupbg from "../../assets/signupbg.svg";

export default function FarmerSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || "farmer";

  const [signupData, setSignupData] = useState({
    email: "",
    name: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const validateSignup = () => {
    if (
      !signupData.email ||
      !signupData.name ||
      !signupData.location ||
      !signupData.password ||
      !signupData.confirmPassword
    ) {
      alert("Please fill in all fields");
      return false;
    }
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateSignup()) {
      navigate("/farmer-onboarding", { state: { signupData, userType } });
    }
  };

  const inputContainerStyle =
    "flex items-center border rounded px-3 border-none  md:h-[72px] h-[28px] bg-[#EFEEEE] md:w-[500px] w-[210px]";

  const iconStyle = "text-gray-400 md:w-6 md:h-6 w-4 h-4";

  const inputStyle =
    "flex-1 bg-transparent focus:outline-none pl-3 text-base md:text-2xl placeholder:text-sm md:placeholder:text-2xl";

  const buttonStyle =
    "md:w-[500px] w-[210px] md:h-[72px] h-[28px] bg-green-800 text-white rounded hover:bg-green-900 text-base md:text-2xl font-semibold";

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden">
      {/* Desktop Background */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${signupbg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50 flex flex-col justify-center items-center">
          <p className="text-white text-sm md:text-lg">
            Your partner in livestock health
          </p>
        </div>
      </div>

      {/* Mobile background + logo */}
      <div
        className="block md:hidden w-full h-full absolute bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${signupbg})` }}
      >
        <div className="block md:hidden w-full p-4 flex justify-center">
          <img src={logoo} alt="Qiwo Farms" className="w-[165px] pt-7" />
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 mt-60 md:mt-0">
        <div className="bg-white p-8 rounded-lg shadow-md  md:w-full  w-[300px]">
          <h2 className="  text-2xl md:text-5xl md:font-bold mb-2 text-center md:text-left">
            Create an Account
          </h2>
          <p className="text-sm md:text-lg md:text-gray-500 mb-6 text-center md:text-left">
            Register your account
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
            {/* Email */}
            <div className={inputContainerStyle}>
              <Mail className={iconStyle} />
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={signupData.email}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* Name */}
            <div className={inputContainerStyle}>
              <User className={iconStyle} />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={signupData.name}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* Location */}
            <div className={inputContainerStyle}>
              <MapPin className={iconStyle} />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={signupData.location}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* Password */}
            <div className={inputContainerStyle}>
              <Lock className={iconStyle} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* Confirm Password */}
            <div className={inputContainerStyle}>
              <Lock className={iconStyle} />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={signupData.confirmPassword}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className={buttonStyle}>
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
