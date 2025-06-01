import AlertToolbar from "../../components/AlertToolbar";
import AlertSection from "../../components/AlertSection";

export default function AlertPage() {
 const alertsData = [
  {
    name: "JA Cattle",
    avatar: "/images/ja.jpg",
    time: "May 8, 10:50 AM",
    status: "pending",
  },
  {
    name: "Debby Farms",
    avatar: "/images/debby.jpg",
    time: "May 9, 11:20 AM",
    status: "accepted",
  },
];


  const pending = alertsData.filter((a) => a.status === "pending");
  const accepted = alertsData.filter((a) => a.status === "accepted");

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-6 flex justify-center font-nunito">
      <div className="w-full max-w-[1200px] space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">🚨 Vet Alert Dashboard</h1>

        <AlertToolbar />

        <AlertSection title="🟡 Pending Requests" alerts={pending} />
        <AlertSection title="✅ Accepted Alerts" alerts={accepted} />
      </div>
    </div>
  );
}
