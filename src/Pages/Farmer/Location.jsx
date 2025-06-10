//src/Pages/Farmer/Location.jsx
import React from "react";
import LivestockTracker from "../../components/LivestockTracker";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";

const Location = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["livestock"],
    queryFn: async () => {
      const { data, error } = await supabase.from("livestock").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onError: (err) => {
      toast.error("Error fetching livestock (location) data: " + err.message);
    },
  });

  const handleSuccess = () => {
    toast.success("Livestock (location) data updated successfully!");
  };

  return (
    <div className="p-2 md:p-4 bg-white">
      <h1>Location Overview</h1>
      {isLoading ? (
        <p>Loading livestock (location) data…</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {data &&
            data.map((item) => (
              <li key={item.id}>
                {item.name} (Status: {item.status})
              </li>
            ))}
        </ul>
      )}
      <button onClick={handleSuccess}>Simulate Update</button>
    </div>
  );
};

export default Location;
