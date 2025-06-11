// src/pages/vets-page.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";

const Vet = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["vets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "vet");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onError: (err) => {
      toast.error("Error fetching veterinarian data: " + err.message);
    },
  });

  const handleSuccess = () => {
    toast.success("Veterinarian data updated successfully!");
  };

  return (
    <div className="p-4 space-y-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold">Available Veterinarians</h1>

      <div className="bg-[#f8f9fa] rounded-lg p-6 shadow">
        {isLoading ? (
          <p>Loading veterinarian data...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data &&
              data.map((vet) => (
                <div key={vet.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                      {vet.avatar_url ? (
                        <img
                          src={vet.avatar_url}
                          alt={vet.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{vet.name}</h2>
                      <p className="text-gray-600">
                        {vet.specialization || "General Veterinarian"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm">
                      <span className="text-gray-600">Location:</span>{" "}
                      {vet.location || "Not provided"}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-600">License:</span>{" "}
                      {vet.license_number || "Not provided"}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-600">Experience:</span>{" "}
                      {vet.experience || "Not provided"}
                    </p>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() =>
                        toast.info(
                          "Schedule appointment functionality coming soon"
                        )
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      Schedule Appointment
                    </button>
                    <button
                      onClick={() =>
                        toast.info("Contact functionality coming soon")
                      }
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSuccess}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
      >
        Refresh List
      </button>
    </div>
  );
};

export default Vet;
