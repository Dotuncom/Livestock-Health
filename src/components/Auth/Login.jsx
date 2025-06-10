import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import logoo from "../../assets/logoo.png";
import signupbg from "../../assets/signupbg.svg";
import { toast } from "react-toastify";
import { supabase } from "../../App";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || "farmer";

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const validateLogin = () => {
    if (!loginData.email || !loginData.password) {
      toast.error("Please enter both email and password.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setIsLoading(true);
    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) throw error;

      // Get user role from the users table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (userError) throw userError;

      // Verify user role matches the selected login type
      if (userData.role !== userType) {
        throw new Error(`This account is not registered as a ${userType}`);
      }

      toast.success("Login successful!");

      // Navigate based on user role
      if (userData.role === "vet") {
        navigate("/vet-dashboard");
      } else {
        navigate("/farmer-dashboard");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const switchUserType = () => {
    const newType = userType === "vet" ? "farmer" : "vet";
    navigate("/login", { state: { userType: newType } });
  };

  const inputContainerStyle =
    "flex items-center border rounded px-3 border-none md:h-[72px] h-[28px] bg-[#EFEEEE] md:w-[500px] w-[210px]";

  const iconStyle = "text-gray-400 md:w-6 md:h-6 w-4 h-4";

  const inputStyle =
    "flex-1 bg-transparent focus:outline-none pl-3 text-base md:text-2xl placeholder:text-sm md:placeholder:text-2xl";

  const buttonStyle =
    "md:w-[500px] w-[210px] md:h-[72px] h-[28px] bg-green-800 text-white rounded hover:bg-green-900 text-base md:text-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden">
      {/* Desktop Background */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${signupbg})` }}
      >
        <div className="absolute flex flex-col justify-center items-center"></div>
      </div>

      {/* Mobile background + logo */}
      <div
        className="block md:hidden w-full h-full absolute bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${signupbg})` }}
      />
      <div className="block md:hidden w-full p-4 flex justify-center">
        <img src={logoo} alt="Qiwo Farms" className="w-[165px] pt-7" />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 mt-60 md:mt-0">
        <div className="pl-[4rem]">
          <h2 className="text-2xl font-bold md:text-5xl md:font-bold mb-2 text-center md:text-left">
            {userType === "vet" ? "Vet Login" : "Farmer Login"}
          </h2>
          <p className="text-xl md:text-2xl md:text-gray-500 mb-6 text-center md:text-left">
            Enter your credentials
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
              value={loginData.email}
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
              value={loginData.password}
              onChange={handleChange}
              className={inputStyle}
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className={buttonStyle} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {/* Switch Login */}
          <p className="text-xl md:text-xl text-gray-500 mt-2">
            Not a {userType}?{" "}
            <button
              type="button"
              onClick={switchUserType}
              className="text-[#1D4719] underline"
              disabled={isLoading}
            >
              Switch to {userType === "vet" ? "Farmer" : "Vet"} Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
