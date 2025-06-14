import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../../App";
import logoo from "../../assets/logoo.png";
import authbg from "../../assets/authbg.png";

export default function VetOnboarding() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signupData, userType } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!signupData) navigate("/vet-form");
  }, [signupData, navigate]);

  const [onboardingData, setOnboardingData] = useState({
    yearsOfExperience: "",
    clinicName: "",
    licenseNumber: "",
    preferredAnimals: [],
    location: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setOnboardingData((prev) => {
        const updated = checked
          ? [...prev.preferredAnimals, value]
          : prev.preferredAnimals.filter((a) => a !== value);
        return { ...prev, preferredAnimals: updated };
      });
    } else {
      setOnboardingData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateOnboarding = () => {
    const {
      yearsOfExperience,
      clinicName,
      licenseNumber,
      preferredAnimals,
      location,
      phone,
    } = onboardingData;
    if (
      !yearsOfExperience ||
      !clinicName ||
      !licenseNumber ||
      !location ||
      !phone
    ) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (preferredAnimals.length === 0) {
      toast.error("Please select at least one preferred animal");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateOnboarding()) return;

    setIsLoading(true);
    try {
      // Insert vet profile data into vets table
      const { error: vetError } = await supabase.from("vets").insert({
        id: signupData.id,
        user_id: signupData.id,
        years_of_experience: parseInt(onboardingData.yearsOfExperience),
        clinic_name: onboardingData.clinicName,
        license_number: onboardingData.licenseNumber,
        preferred_animals: onboardingData.preferredAnimals,
        location: onboardingData.location,
        phone: onboardingData.phone,
        onboarding_completed: true,
      });

      if (vetError) throw vetError;

      toast.success("Vet profile completed successfully!");
      navigate("/vet-dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputContainerStyle =
    "flex items-center border-none rounded px-3 bg-[#EFEEEE] md:h-[60px] h-[28px] md:w-[538px] w-[210px]";

  const inputStyle =
    "flex-1 bg-transparent focus:outline-none pl-3 text-base md:text-2xl placeholder:text-sm md:placeholder:text-2xl";

  const buttonStyle =
    "md:w-[538px] w-[210px] md:h-[60px] h-[28px] bg-green-800 text-white rounded hover:bg-green-900 text-base md:text-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden">
      {/* Desktop Background */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${authbg})` }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center"></div>
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
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 mt-60 md:mt-0">
        <div className="bg-white p-8 rounded-lg shadow-md md:w-full w-[300px]">
          <div className="md:pl-[4.5rem] md:mb-[3rem]">
            <h2 className="text-2xl md:text-4xl md:font-bold mb-2 text-center md:text-left">
              Onboarding Details
            </h2>
            <p className="text-sm md:text-lg md:text-gray-500 mb-6 text-center md:text-left">
              Tell us about your veterinary practice
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col items-center"
          >
            {/* Years of Experience */}
            <div className={inputContainerStyle}>
              <input
                type="number"
                name="yearsOfExperience"
                placeholder="Years of Experience"
                value={onboardingData.yearsOfExperience}
                onChange={handleChange}
                className={inputStyle}
                disabled={isLoading}
              />
            </div>

            {/* Clinic Name */}
            <div className={inputContainerStyle}>
              <input
                type="text"
                name="clinicName"
                placeholder="Clinic Name"
                value={onboardingData.clinicName}
                onChange={handleChange}
                className={inputStyle}
                disabled={isLoading}
              />
            </div>

            {/* License Number */}
            <div className={inputContainerStyle}>
              <input
                type="text"
                name="licenseNumber"
                placeholder="License Number"
                value={onboardingData.licenseNumber}
                onChange={handleChange}
                className={inputStyle}
                disabled={isLoading}
              />
            </div>

            {/* Location */}
            <div className={inputContainerStyle}>
              <input
                type="text"
                name="location"
                placeholder="Clinic Location"
                value={onboardingData.location}
                onChange={handleChange}
                className={inputStyle}
                disabled={isLoading}
              />
            </div>

            {/* Phone */}
            <div className={inputContainerStyle}>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={onboardingData.phone}
                onChange={handleChange}
                className={inputStyle}
                disabled={isLoading}
              />
            </div>

            {/* Preferred Animals */}
            <div className="text-sm md:text-xl font-semibold md:w-[538px] w-[210px]">
              <label className="mb-2 block">Preferred Animals:</label>
              <div className="flex space-x-4">
                {["Cattle", "Goats", "Sheep"].map((animal) => (
                  <label key={animal} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="preferredAnimals"
                      value={animal}
                      checked={onboardingData.preferredAnimals.includes(animal)}
                      onChange={handleChange}
                      className="mr-1"
                      disabled={isLoading}
                    />
                    {animal}
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className={buttonStyle} disabled={isLoading}>
              {isLoading ? "Saving..." : "Complete Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
