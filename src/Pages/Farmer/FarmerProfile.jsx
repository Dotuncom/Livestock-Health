import profile1 from "../../assets/profile1.png";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";

import React from "react";
// import FarmRegistrationWizard from 'src/components/FarmRegistrationWizard'
function FarmerProfile() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["farmer"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "farmer");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onError: (err) => {
      toast.error("Error fetching farmer (user) data: " + err.message);
    },
  });

  const handleSuccess = () => {
    toast.success("Farmer (user) data updated successfully!");
  };

  return (
    <div className="h-full bg-white h">
      <div className="bg-white max-w-7xl mx-auto px-12 rounded-2xl pt-[2rem] shadow-sm">
        {/* Profile Header */}
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-start gap-6 mb-12">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
            <img
              src={profile1}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-4xl Nunito font-semibold">Samson James</h2>
            <p className="text-2xl text-gray-500 Nunito">Jos, Nigeria</p>
          </div>
        </div>

        {/* Profile Form */}
        <form className="grid grid-cols-1 md:grid-cols-2  gap-x-10 gap-y-8 justify-between">
          {[
            { label: "Full Name", type: "text", value: "Samson James" },
            { label: "Location", type: "text", value: "Jos, Nigeria" },
            { label: "Phone Number", type: "tel", value: "+2348012345678" },
          ].map((field, i) => (
            <div
              key={i}
              className="w-full md:w-[345px] max-w-[310px] mx-auto md:mx-0"
            >
              <label className="block text-2xl Nunito font-medium mb-1 h-[40px]">
                {field.label}
              </label>
              <input
                type={field.type}
                defaultValue={field.value}
                className="w-full h-[40px] border border-gray-300 rounded-md px-3 text-2xl Nunito font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          ))}

          {/* Farm Type */}
          <div className="w-full md:w-[345px] max-w-[310px] mx-auto md:mx-0">
            <label className="block text-2xl Nunito font-medium mb-1 h-[40px]">
              Farm Type
            </label>
            <input
              type="text"
              defaultValue="Dairy"
              className="w-full h-[40px] border border-gray-300 rounded-md px-3 text-2xl Nunito font-medium"
            />
          </div>
        </form>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-end gap-4 mt-12 items-center md:items-end">
          <button
            type="button"
            className="px-6 py-2 border border-gray-400 text-gray-700 text-2xl Nunito rounded-md hover:bg-gray-100 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#1D4719] text-white text-2xl Nunito rounded-md hover:bg-green-700 transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default FarmerProfile;
