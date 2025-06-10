import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";

const appointmentsData = [
  {
    id: 1,
    userName: "Aminu Bello", // Hausa
    phone: "+2348012345678",
    date: "2025-06-01",
    timeSlot: "morning",
    animalType: "Cattle",
    urgency: "Normal",
    reason: "Fever and not eating",
    notes: "Farmer suspects foot-and-mouth disease.",
    status: "pending",
  },
  {
    id: 2,
    userName: "Ngozi Okafor", // Igbo
    phone: "+2348098765432",
    date: "2025-06-02",
    timeSlot: "afternoon",
    animalType: "Goats",
    urgency: "Emergency",
    reason: "Sudden loss of movement",
    notes: "Seems neurological.",
    status: "accepted",
  },
  {
    id: 3,
    userName: "Tunde Adebayo", // Yoruba
    phone: "+2348076543210",
    date: "2025-06-03",
    timeSlot: "evening",
    animalType: "Sheep",
    urgency: "Normal",
    reason: "Limping on one leg",
    notes: "Possible injury from thorn.",
    status: "rescheduled",
  },
  {
    id: 4,
    userName: "Fatima Yusuf", // Hausa
    phone: "+2348061234567",
    date: "2025-06-04",
    timeSlot: "morning",
    animalType: "Poultry",
    urgency: "Emergency",
    reason: "Sudden drop in egg production",
    notes: "Suspected avian flu.",
    status: "pending",
  },
  {
    id: 5,
    userName: "Chinwe Eze", // Igbo
    phone: "+2348059876543",
    date: "2025-06-05",
    timeSlot: "afternoon",
    animalType: "Goats",
    urgency: "Normal",
    reason: "Skin rash",
    notes: "Farmer noticed itching.",
    status: "pending",
  },
  {
    id: 6,
    userName: "Olufemi Adekunle", // Yoruba
    phone: "+2348043210987",
    date: "2025-06-06",
    timeSlot: "evening",
    animalType: "Cattle",
    urgency: "Normal",
    reason: "Loss of appetite",
    notes: "",
    status: "accepted",
  },
  {
    id: 7,
    userName: "Khadija Abubakar", // Hausa
    phone: "+2348034567890",
    date: "2025-06-07",
    timeSlot: "morning",
    animalType: "Sheep",
    urgency: "Emergency",
    reason: "Difficulty breathing",
    notes: "Possible pneumonia.",
    status: "rescheduled",
  },
];

export default function VetAppointments() {
  const [appointments, setAppointments] = useState(appointmentsData);
  const [activeTab, setActiveTab] = useState("pending");
  const [rescheduleId, setRescheduleId] = useState(null);
  const [rescheduleForm, setRescheduleForm] = useState({
    date: "",
    timeSlot: "morning",
  });

  const today = new Date().toISOString().split("T")[0];

  const updateStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );
  };

  const handleRescheduleSubmit = () => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === rescheduleId
          ? {
              ...appt,
              date: rescheduleForm.date,
              timeSlot: rescheduleForm.timeSlot,
              status: "rescheduled",
            }
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("appointments").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onError: (err) => {
      toast.error("Error fetching appointments data: " + err.message);
    },
  });

  const handleSuccess = () => {
    toast.success("Appointments data updated successfully!");
  };

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

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="text-center text-lg font-medium text-[#1d4719] col-span-full">
            No {activeTab} appointments.
          </p>
        ) : (
          filtered.map((appt) => {
            const isToday = appt.date === today;
            return (
              <div
                key={appt.id}
                className="bg-white rounded-lg p-6 shadow-md border border-[#efeeee] flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-[#1d4719]">
                      {appt.userName}
                    </h3>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        appt.urgency === "Emergency"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {appt.urgency}
                    </span>
                  </div>

                  <p className="text-[#1d4719] text-sm mb-1">
                    <strong>Phone:</strong> {appt.phone}
                  </p>
                  <p className="text-[#1d4719] text-sm mb-1">
                    <strong>Date:</strong> {appt.date} ({appt.timeSlot})
                    {isToday && (
                      <span className="ml-2 text-xs font-semibold text-red-700">
                        Today
                      </span>
                    )}
                  </p>
                  <p className="text-[#1d4719] text-sm mb-1">
                    <strong>Animal:</strong> {appt.animalType}
                  </p>
                  <p className="text-[#1d4719] text-sm mb-1">
                    <strong>Reason:</strong> {appt.reason}
                  </p>
                  {appt.notes && (
                    <p className="text-[#1d4719] text-sm italic mt-1">
                      <strong>Notes:</strong> {appt.notes}
                    </p>
                  )}
                </div>

                {activeTab === "pending" && (
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => updateStatus(appt.id, "accepted")}
                      className="flex-1 bg-green-700 text-white py-2 rounded font-semibold text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => setRescheduleId(appt.id)}
                      className="flex-1 bg-[#1d4719] text-white py-2 rounded font-semibold text-sm"
                    >
                      Reschedule
                    </button>
                  </div>
                )}

                {rescheduleId === appt.id && (
                  <div className="mt-4 bg-[#efeeee] p-3 rounded">
                    <label className="block text-sm text-[#1d4719] font-semibold mb-1">
                      New Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 rounded border border-[#1d4719] mb-2"
                      value={rescheduleForm.date}
                      onChange={(e) =>
                        setRescheduleForm({
                          ...rescheduleForm,
                          date: e.target.value,
                        })
                      }
                    />

                    <label className="block text-sm text-[#1d4719] font-semibold mb-1">
                      New Time Slot
                    </label>
                    <select
                      className="w-full p-2 rounded border border-[#1d4719] mb-3"
                      value={rescheduleForm.timeSlot}
                      onChange={(e) =>
                        setRescheduleForm({
                          ...rescheduleForm,
                          timeSlot: e.target.value,
                        })
                      }
                    >
                      <option value="morning">Morning (8am - 12pm)</option>
                      <option value="afternoon">Afternoon (12pm - 4pm)</option>
                      <option value="evening">Evening (4pm - 7pm)</option>
                    </select>

                    <div className="flex gap-2">
                      <button
                        className="flex-1 bg-green-700 text-white py-2 rounded font-semibold text-sm"
                        onClick={handleRescheduleSubmit}
                      >
                        Confirm
                      </button>
                      <button
                        className="flex-1 bg-red-700 text-white py-2 rounded font-semibold text-sm"
                        onClick={() => setRescheduleId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {isLoading ? (
        <p>Loading appointments data…</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="mt-4">
          <button onClick={handleSuccess}>Simulate Update</button>
        </div>
      )}
    </div>
  );
}
