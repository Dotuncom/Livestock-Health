import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, User, MapPin, Lock } from "lucide-react";
import logoo from "../../assets/logoo.png";
import authbg from "../../assets/authbg.png";
import { toast } from "react-toastify";
import { supabase } from "../../App";

export default function FarmerSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || "farmer";
  const [isLoading, setIsLoading] = useState(false);

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
      toast.error("Please fill in all fields");
      return false;
    }
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (signupData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;

    setIsLoading(true);
    try {
      // Sign up with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
      });

      if (authError) throw authError;

      // Create user profile in the users table
      const { error: profileError } = await supabase.from("users").insert([
        {
          id: authData.user.id,
          email: signupData.email,
          name: signupData.name,
          location: signupData.location,
          role: userType,
        },
      ]);

      if (profileError) throw profileError;

      toast.success(
        "Signup successful! Please check your email for verification."
      );
      navigate("/farmer-onboarding", {
        state: {
          signupData: {
            ...signupData,
            id: authData.user.id,
          },
          userType,
        },
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputContainerStyle =
    "flex items-center border rounded px-3 border-none md:h-[60px] h-[28px] bg-[#EFEEEE] md:w-[500px] w-[210px]";

  const iconStyle = "text-gray-400 md:w-6 md:h-6 w-4 h-4";

  const inputStyle =
    "flex-1 bg-transparent h-full w-full focus:outline-none pl-3 text-base md:text-2xl placeholder:text-sm md:placeholder:text-2xl";

  const buttonStyle =
    "md:w-[500px] w-[210px] md:h-[72px] h-[28px] bg-green-800 text-white rounded hover:bg-green-900 text-base md:text-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden">
      {/* Desktop Background */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${authbg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50 flex flex-col justify-center items-center">
          <p className="text-white text-sm md:text-lg"></p>
        </div>
      </div>

      {/* Mobile background + logo */}
      <div
        className="block md:hidden w-full h-full absolute bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${authbg})` }}
      >
        <div className="block md:hidden w-full p-4 flex justify-center">
          <img src={logoo} alt="Qiwo Farms" className="w-[165px] pt-7" />
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full Poppins md:w-1/2 flex items-center justify-center p-6 mt-60 md:mt-0">
        <div className="bg-white p-8 rounded-lg shadow-md md:w-full w-[300px]">
          <div className="md:ml-[6rem] md:mt-[1rem] md:mb-[5rem]">
            <h2 className="text-2xl md:text-5xl md:font-bold mb-2 text-center md:text-left">
              Create an Account
            </h2>
            <p className="text-sm md:text-[20px] md:text-gray-500 mb-6 text-center md:text-left">
              Register your account
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col items-center"
          >
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className={buttonStyle} disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Next"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
