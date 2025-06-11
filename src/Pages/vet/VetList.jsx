import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function VetList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVet, setSelectedVet] = useState(null);
  const [activeTab, setActiveTab] = useState("all"); // all, available, busy

  // Debug query to check database structure
  const { data: dbStructure } = useQuery({
    queryKey: ["db-structure"],
    queryFn: async () => {
      console.log("Checking database structure...");
      // Check users table
      const { data: usersData, error: usersError } = await supabase
        .from("users")
        .select("*")
        .limit(1);

      if (usersError) {
        console.error("Error checking users table:", usersError);
      } else {
        console.log(
          "Users table structure:",
          usersData?.[0] ? Object.keys(usersData[0]) : "No users found"
        );
      }

      // Check vets table
      const { data: vetsData, error: vetsError } = await supabase
        .from("vets")
        .select("*")
        .limit(1);

      if (vetsError) {
        console.error("Error checking vets table:", vetsError);
      } else {
        console.log(
          "Vets table structure:",
          vetsData?.[0] ? Object.keys(vetsData[0]) : "No vets found"
        );
      }

      return { usersData, vetsData };
    },
  });

  // Modified vets query with step-by-step debugging
  const {
    data: vets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vets"],
    queryFn: async () => {
      console.log("Starting vet fetch process...");

      // Step 1: Check users table directly
      const { data: usersData, error: usersError } = await supabase
        .from("users")
        .select("id, email, role")
        .eq("role", "vet");

      console.log("Step 1 - Users with role 'vet':", {
        count: usersData?.length || 0,
        data: usersData,
        error: usersError,
      });

      if (usersError) {
        console.error("Error fetching users:", usersError);
      }

      // Step 2: Check vets table directly
      const { data: vetsData, error: vetsError } = await supabase
        .from("vets")
        .select("id, user_id");

      console.log("Step 2 - All vets:", {
        count: vetsData?.length || 0,
        data: vetsData,
        error: vetsError,
      });

      if (vetsError) {
        console.error("Error fetching vets:", vetsError);
      }

      // Step 3: Try a basic join without any conditions
      const { data: basicJoin, error: basicJoinError } = await supabase
        .from("users")
        .select("id, email, role, vets(id)");

      console.log("Step 3 - Basic join without conditions:", {
        count: basicJoin?.length || 0,
        data: basicJoin?.filter((u) => u.role === "vet"),
        error: basicJoinError,
      });

      if (basicJoinError) {
        console.error("Error in basic join:", basicJoinError);
      }

      // Step 4: Try the original query but with minimal fields
      const { data: finalData, error: finalError } = await supabase
        .from("users")
        .select("id, email, role, vets!inner(*)")
        .eq("role", "vet");

      console.log("Step 4 - Final query with inner join:", {
        count: finalData?.length || 0,
        data: finalData,
        error: finalError,
      });

      if (finalError) {
        console.error("Error in final query:", finalError);
        // If the inner join fails, try without the inner join
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("users")
          .select("id, email, role, vets(*)")
          .eq("role", "vet");

        console.log("Step 4b - Fallback query without inner join:", {
          count: fallbackData?.length || 0,
          data: fallbackData,
          error: fallbackError,
        });

        if (fallbackError) {
          console.error("Error in fallback query:", fallbackError);
          throw fallbackError;
        }

        return fallbackData;
      }

      return finalData;
    },
  });

  // Fetch appointments for availability check
  const { data: appointments } = useQuery({
    queryKey: ["vet-appointments"],
    queryFn: async () => {
      console.log("Fetching appointments...");
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .gte("appointment_date", new Date().toISOString().split("T")[0])
        .in("status", ["accepted", "pending"]);

      if (error) {
        console.error("Error fetching appointments:", error);
        throw error;
      }

      console.log("Fetched appointments:", data);
      return data;
    },
  });

  // Debug effect to log filtered results
  useEffect(() => {
    if (vets) {
      console.log("Total vets:", vets.length);
      console.log("Search term:", searchTerm);
      console.log("Active tab:", activeTab);
    }
  }, [vets, searchTerm, activeTab]);

  const filteredVets = vets?.filter((vet) => {
    const matchesSearch =
      !searchTerm || // If no search term, show all
      vet.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vet.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vet.vets?.[0]?.clinic_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      vet.vets?.[0]?.location?.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "available") {
      const vetAppointments =
        appointments?.filter((apt) => apt.vet_id === vet.id) || [];
      return matchesSearch && vetAppointments.length < 5;
    }
    if (activeTab === "busy") {
      const vetAppointments =
        appointments?.filter((apt) => apt.vet_id === vet.id) || [];
      return matchesSearch && vetAppointments.length >= 5;
    }
    return matchesSearch;
  });

  // Debug effect to log filtered results
  useEffect(() => {
    if (filteredVets) {
      console.log("Filtered vets:", filteredVets.length);
    }
  }, [filteredVets]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        <p className="font-semibold">Error loading vets:</p>
        <p>{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!vets || vets.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          No Veterinarians Found
        </h2>
        <p className="text-gray-600 mb-4">
          There are currently no veterinarians registered in the system.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-left max-w-2xl mx-auto mb-4">
          <h3 className="font-semibold mb-2">Debug Information:</h3>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(
              {
                dbStructure: dbStructure,
                error: error?.message,
                vetUsers: vets?.length || 0,
              },
              null,
              2
            )}
          </pre>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Available Veterinarians ({filteredVets?.length || 0})
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search vets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <Icon
              icon="mdi:magnify"
              className="absolute left-3 top-2.5 text-gray-400"
            />
          </div>
          <div className="flex gap-2">
            {["all", "available", "busy"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVets?.map((vet) => {
          const vetDetails = vet.vets?.[0];
          const vetAppointments =
            appointments?.filter((apt) => apt.vet_id === vet.id) || [];
          const isAvailable = vetAppointments.length < 5;

          return (
            <div
              key={vet.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {vet.full_name || "Unnamed Vet"}
                  </h2>
                  <p className="text-gray-600">
                    {vetDetails?.clinic_name || "No clinic name"}
                  </p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-500">
                      <Icon
                        icon="mdi:map-marker"
                        className="inline-block mr-1"
                      />
                      {vetDetails?.location || "Location not specified"}
                    </p>
                    <p className="text-sm text-gray-500">
                      <Icon icon="mdi:phone" className="inline-block mr-1" />
                      {vetDetails?.phone || "Phone not specified"}
                    </p>
                    <p className="text-sm text-gray-500">
                      <Icon
                        icon="mdi:certificate"
                        className="inline-block mr-1"
                      />
                      License: {vetDetails?.license_number || "Not specified"}
                    </p>
                    <p className="text-sm text-gray-500">
                      <Icon
                        icon="mdi:clock-outline"
                        className="inline-block mr-1"
                      />
                      Experience: {vetDetails?.years_of_experience || 0} years
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isAvailable
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isAvailable ? "Available" : "Busy"}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex flex-wrap gap-2 mb-4">
                  {vetDetails?.preferred_animals?.map((animal, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                    >
                      {animal}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/vet-profile/${vet.id}/book`)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                    disabled={!isAvailable}
                  >
                    Book Appointment
                  </button>
                  <button
                    onClick={() => navigate(`/vet-profile/${vet.id}`)}
                    className="flex-1 border border-green-600 text-green-600 py-2 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredVets?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            No veterinarians found matching your criteria
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setActiveTab("all");
            }}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
