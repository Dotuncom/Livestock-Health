import React from "react";
import DeviceStatusTable from "../../components/DeviceStatusTable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";

const Devices = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      const { data, error } = await supabase.from("devices").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onError: (err) => {
      toast.error("Error fetching devices data: " + err.message);
    },
  });

  const handleSuccess = () => {
    toast.success("Devices data updated successfully!");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <DeviceStatusTable />
      <div className="p-2 md:p-4 bg-white">
        <h1>Devices Overview</h1>
        {isLoading ? (
          <p>Loading devices data…</p>
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
    </main>
  );
};

export default Devices;
