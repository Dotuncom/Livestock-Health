import React from "react";
import profile1 from "../../assets/profile1.png";
import { Icon } from "@iconify/react";

function VetMainProfile() {
  const fields = [
    { label: "Name", type: "text", value: "Samson David", icon: "mdi:account" },
    { label: "My Address", type: "text", value: "Jos, Nigeria", icon: "mdi:map-marker" },
    { label: "Account", type: "email", value: "samson@example.com", icon: "mdi:email" },
    { label: "Password", type: "password", value: "••••••••", icon: "mdi:lock" },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl px-4 md:px-12 pt-4 pb-12">
        {/* Profile Header */}
        <div className="flex flex-col items-center md:gap-[150px] justify-between md:flex-row md:items-center md:justify-center mb-12 relative">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden relative">
            <img
              src={profile1}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-1 right-1 bg-green-700 rounded-full p-1 flex items-center justify-center">
              <Icon icon="mdi:camera" className="text-white w-4 h-4" />
            </span>
          </div>
          <div className="text-center mt-4 md:mt-0">
            <h2 className="text-4xl Nunito font-semibold">Samson David</h2>
            <p className="text-2xl text-gray-500 Nunito">Jos, Nigeria</p>
          </div>
        </div>

        {/* Profile Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
          {fields.map((field, i) => (
            <div
              key={i}
              className="w-full md:w-[345px] max-w-[310px] mx-auto md:mx-0"
            >
              <label className="block text-2xl Nunito font-medium mb-2">
                {field.label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Icon icon={field.icon} className="text-xl" />
                </span>
                <input
                  type={field.type}
                  defaultValue={field.value}
                  className="w-full h-[44px] pl-10 border border-gray-300 rounded-md text-2xl Nunito font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          ))}
        </form>

        {/* Sign out Button */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            className="w-full md:w-auto px-6 py-3 bg-[#1D4719] text-white text-2xl Nunito rounded-md hover:bg-green-800 transition duration-200"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default VetMainProfile;
