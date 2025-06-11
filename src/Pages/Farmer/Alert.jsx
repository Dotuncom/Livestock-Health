import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";

const Alert = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("alerts").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onError: (err) => {
      toast.error("Error fetching alerts data: " + err.message);
    },
  });

  const handleSuccess = () => {
    toast.success("Alerts data updated successfully!");
  };

  return (
    <div className="p-2 md:p-4 bg-white">
      <h1>Alert Overview</h1>
      {isLoading ? (
        <p>Loading alerts data…</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {data &&
            data.map((item) => (
              <li key={item.id}>
                Alert (ID: {item.id}) for Livestock ID: {item.livestock_id}{" "}
                (Message: {item.message}, Severity: {item.severity})
              </li>
            ))}
        </ul>
      )}
      <button onClick={handleSuccess}>Simulate Update</button>
    </div>
  );
};

export default Alert;
