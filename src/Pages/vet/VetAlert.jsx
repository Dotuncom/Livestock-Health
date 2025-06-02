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
import React from 'react';

const alerts = [
  {
    id: 1,
    name: 'JA Cattle',
    message: 'Has requested Urgent veterinary assistance for Cow-001#',
    time: 'May 8, 10:50 AM',
    avatar: '/avatar1.jpg',
    actions: ['View'],
  },
  {
    id: 2,
    name: 'Debby Farms',
    message: 'Has requested Urgent veterinary assistance for Cow-001#',
    time: 'May 8, 10:50 AM',
    avatar: '/avatar2.jpg',
    actions: ['Accept', 'Accept'],
  },
  {
    id: 3,
    name: 'Sadri Livestock',
    message: 'Has requested Urgent veterinary assistance for Cow-001#',
    time: 'May 8, 10:50 AM',
    avatar: '/avatar3.jpg',
    actions: [],
  },
];

export default function AlertsPage() {
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Top section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-0">Alerts</h2>
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-full px-4 py-2"
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="px-4 py-2 rounded-full bg-green-800 text-white">All</button>
        <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-600">Disease</button>
        <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-600">Appointment</button>
      </div>

      {/* Alert Cards */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-white p-4 rounded-md shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
          >
            <div className="flex items-start">
              <img
                src={alert.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium text-sm sm:text-base">
                  <span className="text-gray-800">{alert.name}</span>. {alert.message}
                </p>
                <p className="text-sm text-gray-500 mt-1">{alert.time}</p>
              </div>
            </div>

            {alert.actions.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {alert.actions.map((action, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded text-sm ${
                      index === 0
                        ? 'bg-green-700 text-white'
                        : 'border border-green-700 text-green-700'
                    }`}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}