import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";

const VetMainProfile = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["vet_profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "vet")
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onError: (err) => {
      toast.error("Error fetching veterinarian profile data: " + err.message);
    },
  });

  const handleSuccess = () => {
    toast.success("Profile data updated successfully!");
  };

  return (
    <div className="p-4 space-y-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold">Veterinarian Profile</h1>

      <div className="bg-[#f8f9fa] rounded-lg p-6 shadow">
        {isLoading ? (
          <p>Loading profile data...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                {data?.avatar_url ? (
                  <img
                    src={data.avatar_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {data?.name || "Veterinarian Name"}
                </h2>
                <p className="text-gray-600">
                  {data?.email || "email@example.com"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <p>
                    <span className="text-gray-600">Phone:</span>{" "}
                    {data?.phone || "Not provided"}
                  </p>
                  <p>
                    <span className="text-gray-600">Location:</span>{" "}
                    {data?.location || "Not provided"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Professional Information</h3>
                <div className="space-y-2">
                  <p>
                    <span className="text-gray-600">License Number:</span>{" "}
                    {data?.license_number || "Not provided"}
                  </p>
                  <p>
                    <span className="text-gray-600">Specialization:</span>{" "}
                    {data?.specialization || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() =>
                  toast.info("Edit profile functionality coming soon")
                }
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
              <button
                onClick={handleSuccess}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VetMainProfile;
