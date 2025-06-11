import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";

export default function VetAppointments() {
  const [activeTab, setActiveTab] = useState("pending");
  const [rescheduleId, setRescheduleId] = useState(null);
  const [rescheduleForm, setRescheduleForm] = useState({
    date: "",
    time_slot: "morning",
  });

  const queryClient = useQueryClient();
  const today = new Date().toISOString().split("T")[0];

  // Fetch appointments
  const {
    data: appointments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select(
          `
          *,
          farmer:farmer_id (
            email,
            raw_user_meta_data
          )
        `
        )
        .order("appointment_date", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  // Update appointment status mutation
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      const { data, error } = await supabase
        .from("appointments")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["appointments"]);
      toast.success("Appointment status updated successfully!");
    },
    onError: (error) => {
      toast.error("Error updating appointment: " + error.message);
    },
  });

  // Reschedule appointment mutation
  const rescheduleAppointment = useMutation({
    mutationFn: async ({ id, rescheduled_date, rescheduled_time_slot }) => {
      const { data, error } = await supabase
        .from("appointments")
        .update({
          status: "rescheduled",
          rescheduled_date,
          rescheduled_time_slot,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["appointments"]);
      toast.success("Appointment rescheduled successfully!");
      setRescheduleId(null);
      setRescheduleForm({ date: "", time_slot: "morning" });
    },
    onError: (error) => {
      toast.error("Error rescheduling appointment: " + error.message);
    },
  });

  const handleRescheduleSubmit = () => {
    if (!rescheduleForm.date) {
      toast.error("Please select a new date");
      return;
    }

    rescheduleAppointment.mutate({
      id: rescheduleId,
      rescheduled_date: new Date(rescheduleForm.date).toISOString(),
      rescheduled_time_slot: rescheduleForm.time_slot,
    });
  };

  const statusCounts = {
    pending: appointments?.filter((a) => a.status === "pending").length || 0,
    accepted: appointments?.filter((a) => a.status === "accepted").length || 0,
    rescheduled:
      appointments?.filter((a) => a.status === "rescheduled").length || 0,
  };

  const filtered = appointments
    ? activeTab === "all"
      ? appointments
      : appointments.filter((appt) => appt.status === activeTab)
    : [];

  if (isLoading) return <div>Loading appointments...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
            const isToday =
              new Date(appt.appointment_date).toISOString().split("T")[0] ===
              today;
            const farmerName =
              appt.farmer?.raw_user_meta_data?.full_name ||
              appt.farmer?.email ||
              "Unknown Farmer";

            return (
              <div
                key={appt.id}
                className="bg-white rounded-lg p-6 shadow-md border border-[#efeeee] flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-[#1d4719]">
                      {farmerName}
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
                    <strong>Phone:</strong> {appt.farmer_phone}
                  </p>
                  <p className="text-[#1d4719] text-sm mb-1">
                    <strong>Date:</strong>{" "}
                    {new Date(appt.appointment_date).toLocaleDateString()} (
                    {appt.time_slot})
                    {isToday && (
                      <span className="ml-2 text-xs font-semibold text-red-700">
                        Today
                      </span>
                    )}
                  </p>
                  <p className="text-[#1d4719] text-sm mb-1">
                    <strong>Animal:</strong> {appt.animal_type}
                  </p>
                  <p className="text-[#1d4719] text-sm mb-1">
                    <strong>Reason:</strong> {appt.reason}
                  </p>
                  {appt.notes && (
                    <p className="text-[#1d4719] text-sm italic mt-1">
                      <strong>Notes:</strong> {appt.notes}
                    </p>
                  )}
                  {appt.status === "rescheduled" && appt.rescheduled_date && (
                    <p className="text-blue-600 mt-1">
                      <strong>Rescheduled to:</strong>{" "}
                      {new Date(appt.rescheduled_date).toLocaleDateString()} (
                      {appt.rescheduled_time_slot})
                    </p>
                  )}
                </div>

                {activeTab === "pending" && (
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() =>
                        updateStatus.mutate({ id: appt.id, status: "accepted" })
                      }
                      className="flex-1 bg-green-700 text-white py-2 rounded font-semibold text-sm hover:bg-green-800 transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => setRescheduleId(appt.id)}
                      className="flex-1 bg-[#1d4719] text-white py-2 rounded font-semibold text-sm hover:bg-[#153614] transition-colors"
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
                      min={today}
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
                      value={rescheduleForm.time_slot}
                      onChange={(e) =>
                        setRescheduleForm({
                          ...rescheduleForm,
                          time_slot: e.target.value,
                        })
                      }
                    >
                      <option value="morning">Morning (8am - 12pm)</option>
                      <option value="afternoon">Afternoon (12pm - 4pm)</option>
                      <option value="evening">Evening (4pm - 7pm)</option>
                    </select>

                    <div className="flex gap-2">
                      <button
                        className="flex-1 bg-green-700 text-white py-2 rounded font-semibold text-sm hover:bg-green-800 transition-colors"
                        onClick={handleRescheduleSubmit}
                      >
                        Confirm
                      </button>
                      <button
                        className="flex-1 bg-red-700 text-white py-2 rounded font-semibold text-sm hover:bg-red-800 transition-colors"
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
    </div>
  );
}
