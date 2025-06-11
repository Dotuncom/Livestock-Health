import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { format } from "date-fns";

export default function FarmerPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  // Fetch farmers with their farm details
  const {
    data: farmers,
    isLoading: farmersLoading,
    error: farmersError,
  } = useQuery({
    queryKey: ["farmers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select(
          `
          *,
          farmers (
            number_of_animals,
            farm_size,
            livestock_types,
            breed,
            vaccination_status,
            feeding_type,
            water_source
          )
        `
        )
        .eq("role", "farmer")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Fetch animals for all farmers
  const {
    data: animalsData,
    isLoading: animalsLoading,
    error: animalsError,
  } = useQuery({
    queryKey: ["animals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("animals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Fetch appointments for selected farmer
  const { data: appointments } = useQuery({
    queryKey: ["farmer-appointments", selectedFarmer?.id],
    queryFn: async () => {
      if (!selectedFarmer) return [];
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("farmer_id", selectedFarmer.id)
        .order("appointment_date", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!selectedFarmer,
  });

  // Handle appointment status update
  const updateAppointmentMutation = useMutation({
    mutationFn: async ({ appointmentId, status }) => {
      const { error } = await supabase
        .from("appointments")
        .update({ status })
        .eq("id", appointmentId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["farmer-appointments"]);
      toast.success("Appointment status updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update appointment: " + error.message);
    },
  });

  const filteredFarmers = farmers?.filter(
    (farmer) =>
      farmer.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get animals for the selected farmer
  const selectedFarmerAnimals = selectedFarmer
    ? animalsData?.filter((animal) => animal.farmer_id === selectedFarmer.id)
    : [];

  const handleAppointmentAction = (appointmentId, status) => {
    updateAppointmentMutation.mutate({ appointmentId, status });
  };

  if (farmersLoading || animalsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800"></div>
      </div>
    );
  }

  if (farmersError || animalsError) {
    return (
      <div className="p-4 text-red-600">
        Error loading data: {farmersError?.message || animalsError?.message}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Farmers Management</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search farmers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <Icon
            icon="mdi:magnify"
            className="absolute left-3 top-2.5 text-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Farmers List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Farmers List</h2>
          <div className="space-y-3">
            {filteredFarmers?.map((farmer) => (
              <div
                key={farmer.id}
                onClick={() => setSelectedFarmer(farmer)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedFarmer?.id === farmer.id
                    ? "bg-green-50 border border-green-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Icon
                      icon="mdi:account"
                      className="w-6 h-6 text-gray-500"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{farmer.full_name}</h3>
                    <p className="text-sm text-gray-500">{farmer.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Farmer Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedFarmer ? (
            <>
              {/* Farm Details */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Farm Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Farm Size</p>
                    <p className="font-medium">
                      {selectedFarmer.farmers?.[0]?.farm_size ||
                        "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Number of Animals</p>
                    <p className="font-medium">
                      {selectedFarmer.farmers?.[0]?.number_of_animals || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Livestock Types</p>
                    <p className="font-medium">
                      {selectedFarmer.farmers?.[0]?.livestock_types?.join(
                        ", "
                      ) || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Breed</p>
                    <p className="font-medium">
                      {selectedFarmer.farmers?.[0]?.breed || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Animals Overview */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Animals Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedFarmerAnimals?.map((animal) => (
                    <div
                      key={animal.id}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{animal.name}</h3>
                          <p className="text-sm text-gray-500">
                            {animal.species} - {animal.breed}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            animal.health_status === "Healthy"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {animal.health_status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Last Checkup:{" "}
                        {animal.last_checkup_date
                          ? format(
                              new Date(animal.last_checkup_date),
                              "MMM d, yyyy"
                            )
                          : "Never"}
                      </p>
                    </div>
                  ))}
                  {(!selectedFarmerAnimals ||
                    selectedFarmerAnimals.length === 0) && (
                    <p className="text-gray-500 text-center py-4 col-span-2">
                      No animals found for this farmer
                    </p>
                  )}
                </div>
              </div>

              {/* Appointments */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Recent Appointments
                </h2>
                <div className="space-y-4">
                  {appointments?.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="border rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">
                          {format(
                            new Date(appointment.appointment_date),
                            "MMM d, yyyy"
                          )}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.reason || "No reason provided"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Urgency: {appointment.urgency}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {appointment.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleAppointmentAction(
                                  appointment.id,
                                  "accepted"
                                )
                              }
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleAppointmentAction(
                                  appointment.id,
                                  "declined"
                                )
                              }
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              Decline
                            </button>
                          </>
                        )}
                        {appointment.status !== "pending" && (
                          <span
                            className={`px-3 py-1 rounded ${
                              appointment.status === "accepted"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {appointment.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {(!appointments || appointments.length === 0) && (
                    <p className="text-gray-500 text-center py-4">
                      No appointments found
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Select a farmer to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
