import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, User, Stethoscope, Lock } from "lucide-react";
import logoo from "../../assets/logoo.png";
import authbg from "../../assets/authbg.png";
import { toast } from "react-toastify";
import { supabase } from "../../App";

export default function VetForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || "vet";
  const [isLoading, setIsLoading] = useState(false);

  const [signupData, setSignupData] = useState({
    email: "",
    full_name: "",
    specialization: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const validateSignup = () => {
    const { email, full_name, specialization, password, confirmPassword } =
      signupData;
    if (
      !email ||
      !full_name ||
      !specialization ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (password.length < 6) {
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
      // Sign up with Supabase, including role in metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            role: "vet", // Explicitly set role as 'vet'
            full_name: signupData.full_name,
          },
        },
      });

      if (authError) throw authError;

      // Create initial user profile with only essential data
      const { error: profileError } = await supabase.from("users").insert({
        id: authData.user.id,
        email: signupData.email,
        full_name: signupData.full_name,
        role: "vet", // Explicitly set role as 'vet'
        created_at: new Date().toISOString(),
      });

      if (profileError) throw profileError;

      // Verify the user profile was created correctly
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", authData.user.id)
        .single();

      if (userError) throw userError;
      if (userData.role !== "vet") {
        throw new Error("Failed to set user role correctly");
      }

      toast.success(
        "Account created successfully! Please complete your profile."
      );
      navigate("/vet-onboarding", {
        state: {
          signupData: {
            ...signupData,
            id: authData.user.id,
          },
          userType: "vet", // Explicitly set userType as 'vet'
        },
      });
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const inputContainerStyle =
    "flex items-center border-none rounded px-3 bg-[#EFEEEE] md:h-[72px] h-[28px] md:w-[538px] w-[210px]";

  const iconStyle = "text-gray-400 md:w-6 md:h-6 w-4 h-4";

  const inputStyle =
    "flex-1 bg-transparent focus:outline-none pl-3 text-base md:text-2xl placeholder:text-sm md:placeholder:text-2xl";

  const buttonStyle =
    "md:w-[538px] w-[210px] md:h-[72px] h-[28px] bg-green-800 text-white rounded hover:bg-green-900 text-base md:text-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden">
      {/* Desktop Background */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${authbg})` }}
      >
        <div className="absolute flex flex-col justify-center items-center"></div>
      </div>

      {/* Mobile background + logo */}
      <div
        className="block md:hidden w-full h-full absolute bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${authbg})` }}
      />
      <div className="block md:hidden w-full p-4 flex justify-center">
        <img src={logoo} alt="Qiwo Farms" className="w-[165px] pt-7" />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center Poppins justify-center p-6 mt-40 md:mt-0">
        <div className="md:ml-[4.5rem] md:mb-[3rem]">
          <h2 className="text-2xl font-bold md:text-4xl md:font-bold mb-2 text-center md:text-left">
            Create an Account
          </h2>
          <p className="text-[xl] md:text-2xl md:text-gray-500 mb-6 text-center md:text-left">
            Register as a Vet
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
              name="full_name"
              placeholder="Full Name"
              value={signupData.full_name}
              onChange={handleChange}
              className={inputStyle}
              disabled={isLoading}
            />
          </div>

          {/* Specialization */}
          <div className={inputContainerStyle}>
            <Stethoscope className={iconStyle} />
            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={signupData.specialization}
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
  );
}
