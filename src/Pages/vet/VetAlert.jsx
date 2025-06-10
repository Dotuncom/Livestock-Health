// import AlertToolbar from "../../components/AlertToolbar";
// import AlertSection from "../../components/AlertSection";

// export default function AlertPage() {
//  const alertsData = [
//   {
//     name: "JA Cattle",
//     avatar: "/images/ja.jpg",
//     time: "May 8, 10:50 AM",
//     status: "pending",
//   },
//   {
//     name: "Debby Farms",
//     avatar: "/images/debby.jpg",
//     time: "May 9, 11:20 AM",
//     status: "accepted",
//   },
// ];

//   const pending = alertsData.filter((a) => a.status === "pending");
//   const accepted = alertsData.filter((a) => a.status === "accepted");

//   return (
//     <div className="w-full min-h-screen bg-gray-50 px-4 py-6 flex justify-center font-nunito">
//       <div className="w-full max-w-[1200px] space-y-8">
//         <h1 className="text-3xl font-bold text-gray-800">🚨 Vet Alert Dashboard</h1>

//         <AlertToolbar />

//         <AlertSection title="🟡 Pending Requests" alerts={pending} />
//         <AlertSection title="✅ Accepted Alerts" alerts={accepted} />
//       </div>
//     </div>
//   );
// }
// AlertsPage.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";

const VetAlert = () => {
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
    <div className="p-4 space-y-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold">Veterinarian Alerts</h1>

      <div className="bg-[#f8f9fa] rounded-lg p-4 shadow">
        <h2 className="font-semibold text-xl mb-4">Active Alerts</h2>
        {isLoading ? (
          <p>Loading alerts data...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="space-y-4">
            {data &&
              data.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded shadow ${
                    alert.severity === "high"
                      ? "bg-red-50 border-l-4 border-red-500"
                      : alert.severity === "medium"
                      ? "bg-yellow-50 border-l-4 border-yellow-500"
                      : "bg-green-50 border-l-4 border-green-500"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{alert.message}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Livestock ID: {alert.livestock_id}
                      </p>
                      <p className="text-sm text-gray-600">
                        Severity: {alert.severity}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        alert.severity === "high"
                          ? "bg-red-100 text-red-800"
                          : alert.severity === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => toast.info("Action taken on alert")}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      Take Action
                    </button>
                    <button
                      onClick={() => toast.info("Alert marked as resolved")}
                      className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
                    >
                      Mark Resolved
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
        Refresh Alerts
      </button>
    </div>
  );
};

export default VetAlert;
