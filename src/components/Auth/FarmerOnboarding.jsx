import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoo from "../../assets/logoo.png";
import authbg from "../../assets/authbg.png";

export default function FarmerOnboarding() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signupData, userType } = location.state || {};

  useEffect(() => {
    if (!signupData) navigate("/farmer-signup");
  }, [signupData, navigate]);

  const [onboardingData, setOnboardingData] = useState({
    numberOfAnimals: "",
    farmSize: "",
    livestockTypes: [],
    breed: "",
    vaccinationStatus: "",
    feedingType: "",
    waterSource: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setOnboardingData((prev) => {
        const updatedTypes = checked
          ? [...prev.livestockTypes, value]
          : prev.livestockTypes.filter((type) => type !== value);
        return { ...prev, livestockTypes: updatedTypes };
      });
    } else {
      setOnboardingData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/otp", { state: { signupData, onboardingData, userType } });
  };

  const inputStyle =
    "w-[210px] md:w-[538px] h-[28px] md:h-[60px] border-none  px-4 rounded bg-[#EFEEEE]  placeholder:text-sm md:placeholder:text-2xl text-base md:text-2xl";

  const buttonStyle =
    "w-[210px] md:w-[538px] h-[28px] md:h-[72px] bg-green-800 text-white rounded hover:bg-green-900 text-base md:text-2xl font-semibold";

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden">
      {/* Desktop background */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${authbg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50 flex flex-col justify-center items-center">
          <p className="text-white text-sm md:text-lg">
          
          </p>
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

      {/* Form section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 mt-60 md:mt-0">
        <div className="bg-white p-8 rounded-lg shadow-md w-[300px] md:w-full max-w-[538px] flex flex-col items-center">
          <h2 className="text-2xl md:text-4xl md:font-bold mb-2  md:text-left">
            Onboarding Details
          </h2>
          <p className="text-sm md:text-[18px] md:text-gray-500 mb-6  md:text-left">
            Tell us about your farm
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
            <input
              type="number"
              name="numberOfAnimals"
              placeholder="Number of Animals"
              value={onboardingData.numberOfAnimals}
              onChange={handleChange}
              className={inputStyle}
            />
            <input
              type="text"
              name="farmSize"
              placeholder="Farm Size"
              value={onboardingData.farmSize}
              onChange={handleChange}
              className={inputStyle}
            />
            <div className="w-[210px] md:w-[538px]">
              <label className="block font-semibold text-base md:text-2xl mb-2">
                Livestock Types:
              </label>
              <div className="flex space-x-4">
                {["Cattle", "Goats", "Sheep"].map((type) => (
                  <label key={type} className="inline-flex items-center text-sm md:text-xl">
                    <input
                      type="checkbox"
                      name="livestockTypes"
                      value={type}
                      checked={onboardingData.livestockTypes.includes(type)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
            <input
              type="text"
              name="breed"
              placeholder="Breed"
              value={onboardingData.breed}
              onChange={handleChange}
              className={inputStyle}
            />
            <input
              type="text"
              name="vaccinationStatus"
              placeholder="Vaccination Status"
              value={onboardingData.vaccinationStatus}
              onChange={handleChange}
              className={inputStyle}
            />
            <input
              type="text"
              name="feedingType"
              placeholder="Feeding Type"
              value={onboardingData.feedingType}
              onChange={handleChange}
              className={inputStyle}
            />
            <input
              type="text"
              name="waterSource"
              placeholder="Water Source"
              value={onboardingData.waterSource}
              onChange={handleChange}
              className={inputStyle}
            />
            <button type="submit" className={buttonStyle}>
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
