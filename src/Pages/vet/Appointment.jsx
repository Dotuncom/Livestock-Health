// import { useState } from "react";

// const appointmentsData = [
//   {
//     id: 1,
//     userName: "Aminu Bello", // Hausa
//     phone: "+2348012345678",
//     date: "2025-06-01",
//     timeSlot: "morning",
//     animalType: "Cattle",
//     urgency: "Normal",
//     reason: "Fever and not eating",
//     notes: "Farmer suspects foot-and-mouth disease.",
//     status: "pending",
//   },
//   {
//     id: 2,
//     userName: "Ngozi Okafor", // Igbo
//     phone: "+2348098765432",
//     date: "2025-06-02",
//     timeSlot: "afternoon",
//     animalType: "Goats",
//     urgency: "Emergency",
//     reason: "Sudden loss of movement",
//     notes: "Seems neurological.",
//     status: "accepted",
//   },
//   {
//     id: 3,
//     userName: "Tunde Adebayo", // Yoruba
//     phone: "+2348076543210",
//     date: "2025-06-03",
//     timeSlot: "evening",
//     animalType: "Sheep",
//     urgency: "Normal",
//     reason: "Limping on one leg",
//     notes: "Possible injury from thorn.",
//     status: "rescheduled",
//   },
//   {
//     id: 4,
//     userName: "Fatima Yusuf", // Hausa
//     phone: "+2348061234567",
//     date: "2025-06-04",
//     timeSlot: "morning",
//     animalType: "Poultry",
//     urgency: "Emergency",
//     reason: "Sudden drop in egg production",
//     notes: "Suspected avian flu.",
//     status: "pending",
//   },
//   {
//     id: 5,
//     userName: "Chinwe Eze", // Igbo
//     phone: "+2348059876543",
//     date: "2025-06-05",
//     timeSlot: "afternoon",
//     animalType: "Goats",
//     urgency: "Normal",
//     reason: "Skin rash",
//     notes: "Farmer noticed itching.",
//     status: "pending",
//   },
//   {
//     id: 6,
//     userName: "Olufemi Adekunle", // Yoruba
//     phone: "+2348043210987",
//     date: "2025-06-06",
//     timeSlot: "evening",
//     animalType: "Cattle",
//     urgency: "Normal",
//     reason: "Loss of appetite",
//     notes: "",
//     status: "accepted",
//   },
//   {
//     id: 7,
//     userName: "Khadija Abubakar", // Hausa
//     phone: "+2348034567890",
//     date: "2025-06-07",
//     timeSlot: "morning",
//     animalType: "Sheep",
//     urgency: "Emergency",
//     reason: "Difficulty breathing",
//     notes: "Possible pneumonia.",
//     status: "rescheduled",
//   },
// ];

// export default function VetAppointments() {
//   const [appointments, setAppointments] = useState(appointmentsData);
//   const [activeTab, setActiveTab] = useState("pending");
//   const [rescheduleId, setRescheduleId] = useState(null);
//   const [rescheduleForm, setRescheduleForm] = useState({ date: "", timeSlot: "morning" });

//   const today = new Date().toISOString().split("T")[0];

//   const updateStatus = (id, newStatus) => {
//     setAppointments((prev) =>
//       prev.map((appt) => (appt.id === id ? { ...appt, status: newStatus } : appt))
//     );
//   };

//   const handleRescheduleSubmit = () => {
//     setAppointments((prev) =>
//       prev.map((appt) =>
//         appt.id === rescheduleId
//           ? { ...appt, date: rescheduleForm.date, timeSlot: rescheduleForm.timeSlot, status: "rescheduled" }
//           : appt
//       )
//     );
//     setRescheduleId(null);
//     setRescheduleForm({ date: "", timeSlot: "morning" });
//   };

//   const statusCounts = {
//     pending: appointments.filter((a) => a.status === "pending").length,
//     accepted: appointments.filter((a) => a.status === "accepted").length,
//     rescheduled: appointments.filter((a) => a.status === "rescheduled").length,
//   };

//   const filtered =
//     activeTab === "all"
//       ? appointments
//       : appointments.filter((appt) => appt.status === activeTab);

//   return (
//     <div className="min-h-screen bg-[#efeeee] px-4 py-6 md:px-8">
//       <h1 className="text-3xl md:text-4xl font-bold text-[#1d4719] mb-8 text-center">
//         Vet Appointment Dashboard
//       </h1>

//       <div className="flex justify-center gap-2 flex-wrap mb-8">
//         {["pending", "accepted", "rescheduled", "all"].map((status) => (
//           <button
//             key={status}
//             onClick={() => setActiveTab(status)}
//             className={`px-4 py-2 rounded font-semibold text-sm md:text-base transition-colors duration-200 ${
//               activeTab === status
//                 ? "bg-green-700 text-white"
//                 : "bg-white text-[#1d4719] border border-[#1d4719]"
//             }`}
//           >
//             {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
//             {status !== "all" && (
//               <span className="ml-1 bg-[#1d4719] text-[#efeeee] rounded-full px-2 text-xs font-bold">
//                 {statusCounts[status]}
//               </span>
//             )}
//           </button>
//         ))}
//       </div>

//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
//         {filtered.length === 0 ? (
//           <p className="text-center text-lg font-medium text-[#1d4719] col-span-full">
//             No {activeTab} appointments.
//           </p>
//         ) : (
//           filtered.map((appt) => {
//             const isToday = appt.date === today;
//             return (
//               <div
//                 key={appt.id}
//                 className="bg-white rounded-lg p-6 shadow-md border border-[#efeeee] flex flex-col justify-between"
//               >
//                 <div>
//                   <div className="flex justify-between items-center mb-2">
//                     <h3 className="text-xl font-bold text-[#1d4719]">{appt.userName}</h3>
//                     <span
//                       className={`text-xs font-bold px-2 py-1 rounded-full ${
//                         appt.urgency === "Emergency"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-green-100 text-green-700"
//                       }`}
//                     >
//                       {appt.urgency}
//                     </span>
//                   </div>

//                   <p className="text-[#1d4719] text-sm mb-1">
//                     <strong>Phone:</strong> {appt.phone}
//                   </p>
//                   <p className="text-[#1d4719] text-sm mb-1">
//                     <strong>Date:</strong> {appt.date} ({appt.timeSlot})
//                     {isToday && (
//                       <span className="ml-2 text-xs font-semibold text-red-700">Today</span>
//                     )}
//                   </p>
//                   <p className="text-[#1d4719] text-sm mb-1">
//                     <strong>Animal:</strong> {appt.animalType}
//                   </p>
//                   <p className="text-[#1d4719] text-sm mb-1">
//                     <strong>Reason:</strong> {appt.reason}
//                   </p>
//                   {appt.notes && (
//                     <p className="text-[#1d4719] text-sm italic mt-1">
//                       <strong>Notes:</strong> {appt.notes}
//                     </p>
//                   )}
//                 </div>

//                 {activeTab === "pending" && (
//                   <div className="mt-4 flex gap-3">
//                     <button
//                       onClick={() => updateStatus(appt.id, "accepted")}
//                       className="flex-1 bg-green-700 text-white py-2 rounded font-semibold text-sm"
//                     >
//                       Accept
//                     </button>
//                     <button
//                       onClick={() => setRescheduleId(appt.id)}
//                       className="flex-1 bg-[#1d4719] text-white py-2 rounded font-semibold text-sm"
//                     >
//                       Reschedule
//                     </button>
//                   </div>
//                 )}

//                 {rescheduleId === appt.id && (
//                   <div className="mt-4 bg-[#efeeee] p-3 rounded">
//                     <label className="block text-sm text-[#1d4719] font-semibold mb-1">New Date</label>
//                     <input
//                       type="date"
//                       className="w-full p-2 rounded border border-[#1d4719] mb-2"
//                       value={rescheduleForm.date}
//                       onChange={(e) => setRescheduleForm({ ...rescheduleForm, date: e.target.value })}
//                     />

//                     <label className="block text-sm text-[#1d4719] font-semibold mb-1">New Time Slot</label>
//                     <select
//                       className="w-full p-2 rounded border border-[#1d4719] mb-3"
//                       value={rescheduleForm.timeSlot}
//                       onChange={(e) => setRescheduleForm({ ...rescheduleForm, timeSlot: e.target.value })}
//                     >
//                       <option value="morning">Morning (8am - 12pm)</option>
//                       <option value="afternoon">Afternoon (12pm - 4pm)</option>
//                       <option value="evening">Evening (4pm - 7pm)</option>
//                     </select>

//                     <div className="flex gap-2">
//                       <button
//                         className="flex-1 bg-green-700 text-white py-2 rounded font-semibold text-sm"
//                         onClick={handleRescheduleSubmit}
//                       >
//                         Confirm
//                       </button>
//                       <button
//                         className="flex-1 bg-red-700 text-white py-2 rounded font-semibold text-sm"
//                         onClick={() => setRescheduleId(null)}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }
import { useState } from "react";

const appointmentsData = [
  { id: 1, userName: "Aminu Bello", phone: "+2348012345678", date: "2025-06-01", timeSlot: "morning", animalType: "Cattle", urgency: "Normal", reason: "Fever and not eating", notes: "Farmer suspects foot-and-mouth disease.", status: "pending" },
  { id: 2, userName: "Ngozi Okafor", phone: "+2348098765432", date: "2025-06-02", timeSlot: "afternoon", animalType: "Goats", urgency: "Emergency", reason: "Sudden loss of movement", notes: "Seems neurological.", status: "accepted" },
  { id: 3, userName: "Tunde Adebayo", phone: "+2348076543210", date: "2025-06-03", timeSlot: "evening", animalType: "Sheep", urgency: "Normal", reason: "Limping on one leg", notes: "Possible injury from thorn.", status: "rescheduled" },
  { id: 4, userName: "Fatima Yusuf", phone: "+2348061234567", date: "2025-06-04", timeSlot: "morning", animalType: "Poultry", urgency: "Emergency", reason: "Sudden drop in egg production", notes: "Suspected avian flu.", status: "pending" },
  { id: 5, userName: "Chinwe Eze", phone: "+2348059876543", date: "2025-06-05", timeSlot: "afternoon", animalType: "Goats", urgency: "Normal", reason: "Skin rash", notes: "Farmer noticed itching.", status: "pending" },
  { id: 6, userName: "Olufemi Adekunle", phone: "+2348043210987", date: "2025-06-06", timeSlot: "evening", animalType: "Cattle", urgency: "Normal", reason: "Loss of appetite", notes: "", status: "accepted" },
  { id: 7, userName: "Khadija Abubakar", phone: "+2348034567890", date: "2025-06-07", timeSlot: "morning", animalType: "Sheep", urgency: "Emergency", reason: "Difficulty breathing", notes: "Possible pneumonia.", status: "rescheduled" },
];

export default function VetAppointments() {
  const [appointments, setAppointments] = useState(appointmentsData);
  const [activeTab, setActiveTab] = useState("pending");
  const [rescheduleId, setRescheduleId] = useState(null);
  const [rescheduleForm, setRescheduleForm] = useState({ date: "", timeSlot: "morning" });

  const today = new Date().toISOString().split("T")[0];

  const updateStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, status: newStatus } : appt))
    );
  };

  const handleRescheduleSubmit = () => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === rescheduleId
          ? { ...appt, date: rescheduleForm.date, timeSlot: rescheduleForm.timeSlot, status: "rescheduled" }
          : appt
      )
    );
    setRescheduleId(null);
    setRescheduleForm({ date: "", timeSlot: "morning" });
  };

  const statusCounts = {
    pending: appointments.filter((a) => a.status === "pending").length,
    accepted: appointments.filter((a) => a.status === "accepted").length,
    rescheduled: appointments.filter((a) => a.status === "rescheduled").length,
  };

  const filtered =
    activeTab === "all"
      ? appointments
      : appointments.filter((appt) => appt.status === activeTab);

  return (
    <div className="min-h-screen bg-[#efeeee] px-4 py-6 md:px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[#1d4719] mb-8 text-center">
        Vet Appointment Dashboard
      </h1>

      <div className="flex justify-center gap-2 flex-wrap mb-8">
        {["pending", "accepted", "rescheduled", "all"].map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 rounded font-semibold text-sm md:text-base transition-colors duration-200 ${
              activeTab === status
                ? "bg-green-700 text-white"
                : "bg-white text-[#1d4719] border border-[#1d4719]"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
            {status !== "all" && (
              <span className="ml-1 bg-[#1d4719] text-[#efeeee] rounded-full px-2 text-xs font-bold">
                {statusCounts[status]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-[#1d4719] text-[#1d4719]">
          <thead className="bg-green-700 text-white text-left">
            <tr>
              <th className="p-3 border border-[#1d4719] hidden sm:table-cell">Name</th>
              <th className="p-3 border border-[#1d4719] hidden sm:table-cell">Phone</th>
              <th className="p-3 border border-[#1d4719] hidden md:table-cell">Date</th>
              <th className="p-3 border border-[#1d4719] hidden md:table-cell">Time Slot</th>
              <th className="p-3 border border-[#1d4719] hidden lg:table-cell">Animal</th>
              <th className="p-3 border border-[#1d4719] hidden lg:table-cell">Urgency</th>
              <th className="p-3 border border-[#1d4719] hidden xl:table-cell">Reason</th>
              <th className="p-3 border border-[#1d4719] hidden xl:table-cell">Notes</th>
              <th className="p-3 border border-[#1d4719]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center p-6">
                  No {activeTab} appointments.
                </td>
              </tr>
            ) : (
              filtered.map((appt) => {
                const isToday = appt.date === today;
                const isRescheduling = rescheduleId === appt.id;
                return (
                  <tr key={appt.id} className="border border-[#1d4719] sm:table-row block sm:table-row">
                    <td
                      className="p-3 border border-[#1d4719] sm:table-cell block sm:table-cell"
                      data-label="Name"
                    >
                      {appt.userName}
                    </td>
                    <td
                      className="p-3 border border-[#1d4719] sm:table-cell block sm:table-cell"
                      data-label="Phone"
                    >
                      {appt.phone}
                    </td>
                    <td
                      className="p-3 border border-[#1d4719] md:table-cell block md:table-cell"
                      data-label="Date"
                    >
                      {appt.date} {isToday && <span className="text-red-700 font-semibold"> (Today)</span>}
                    </td>
                    <td
                      className="p-3 border border-[#1d4719] md:table-cell block md:table-cell"
                      data-label="Time Slot"
                    >
                      {appt.timeSlot}
                    </td>
                    <td
                      className="p-3 border border-[#1d4719] lg:table-cell hidden lg:table-cell"
                      data-label="Animal"
                    >
                      {appt.animalType}
                    </td>
                    <td
                      className="p-3 border border-[#1d4719] lg:table-cell hidden lg:table-cell"
                      data-label="Urgency"
                    >
                      <span
                        className={`px-2 py-1 rounded-full font-semibold ${
                          appt.urgency === "Emergency"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {appt.urgency}
                      </span>
                    </td>
                    <td
                      className="p-3 border border-[#1d4719] xl:table-cell hidden xl:table-cell"
                      data-label="Reason"
                    >
                      {appt.reason}
                    </td>
                    <td
                      className="p-3 border border-[#1d4719] xl:table-cell hidden xl:table-cell"
                      data-label="Notes"
                    >
                      {appt.notes || "-"}
                    </td>
                    <td className="p-3 border border-[#1d4719]">
                      {activeTab === "pending" && !isRescheduling && (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => updateStatus(appt.id, "accepted")}
                            className="bg-green-700 text-white py-1 rounded font-semibold text-xs"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => setRescheduleId(appt.id)}
                            className="bg-[#1d4719] text-white py-1 rounded font-semibold text-xs"
                          >
                            Reschedule
                          </button>
                        </div>
                      )}

                      {isRescheduling && (
                        <div className="bg-[#efeeee] p-2 rounded">
                          <label className="block text-xs font-semibold mb-1">New Date</label>
                          <input
                            type="date"
                            className="w-full p-1 rounded border border-[#1d4719] mb-1 text-xs"
                            value={rescheduleForm.date}
                            onChange={(e) => setRescheduleForm({ ...rescheduleForm, date: e.target.value })}
                          />
                          <label className="block text-xs font-semibold mb-1">New Time Slot</label>
                          <select
                            className="w-full p-1 rounded border border-[#1d4719] mb-2 text-xs"
                            value={rescheduleForm.timeSlot}
                            onChange={(e) => setRescheduleForm({ ...rescheduleForm, timeSlot: e.target.value })}
                          >
                            <option value="morning">Morning (8am - 12pm)</option>
                            <option value="afternoon">Afternoon (12pm - 4pm)</option>
                            <option value="evening">Evening (4pm - 7pm)</option>
                          </select>
                          <div className="flex gap-1">
                            <button
                              className="flex-1 bg-green-700 text-white py-1 rounded font-semibold text-xs"
                              onClick={handleRescheduleSubmit}
                              disabled={!rescheduleForm.date}
                            >
                              Confirm
                            </button>
                            <button
                              className="flex-1 bg-red-700 text-white py-1 rounded font-semibold text-xs"
                              onClick={() => setRescheduleId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          /* Hide table headers on mobile */
          thead {
            display: none;
          }
          /* Make each row a block on mobile */
          tbody tr {
            display: block;
            border-bottom: 2px solid #1d4719;
            margin-bottom: 1rem;
          }
          /* Make each cell a block with label */
          tbody td {
            display: flex;
            justify-content: space-between;
            padding-left: 50%;
            position: relative;
            text-align: left;
            border: none;
            border-bottom: 1px solid #ccc;
          }
          tbody td::before {
            content: attr(data-label);
            position: absolute;
            left: 0.75rem;
            font-weight: 600;
            color: #1d4719;
            white-space: nowrap;
          }
        }
      `}</style>
    </div>
  );
}
