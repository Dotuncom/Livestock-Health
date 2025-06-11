import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../App";
import { toast } from "react-toastify";

export default function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    farmer_name: "",
    farmer_phone: "",
    booking_date: "",
    time_slot: "morning",
    animal_type: "Cattle",
    urgency: "Normal",
    reason: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // Fetch vet details
  const { data: vet, isLoading: vetLoading } = useQuery({
    queryKey: ["vet", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Fetch farmer's previous appointments with this vet
  const { data: previousAppointments, isLoading: appointmentsLoading } =
    useQuery({
      queryKey: ["appointments", id],
      queryFn: async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from("appointments")
          .select("*")
          .eq("vet_id", id)
          .eq("farmer_id", user.id)
          .order("appointment_date", { ascending: false });

        if (error) throw error;
        return data;
      },
    });

  // Create appointment mutation
  const createAppointment = useMutation({
    mutationFn: async (appointmentData) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("appointments")
        .insert([
          {
            ...appointmentData,
            farmer_id: user.id,
            vet_id: id,
            status: "pending",
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["appointments", id]);
      toast.success("Appointment booked successfully!");
      setForm({
        farmer_name: "",
        farmer_phone: "",
        booking_date: "",
        time_slot: "morning",
        animal_type: "Cattle",
        urgency: "Normal",
        reason: "",
        notes: "",
      });
    },
    onError: (error) => {
      toast.error("Error booking appointment: " + error.message);
    },
  });

  const validate = () => {
    const errs = {};
    if (!form.farmer_name.trim()) errs.farmer_name = "Name is required";
    if (!form.farmer_phone.trim()) errs.farmer_phone = "Phone is required";
    else if (!/^\+?\d{7,15}$/.test(form.farmer_phone.trim()))
      errs.farmer_phone = "Phone number invalid";
    if (!form.booking_date) errs.booking_date = "Date is required";
    else if (new Date(form.booking_date) < new Date().setHours(0, 0, 0, 0))
      errs.booking_date = "Date cannot be in the past";
    if (!form.reason.trim()) errs.reason = "Reason is required";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSaving(true);
    try {
      await createAppointment.mutateAsync({
        ...form,
        appointment_date: new Date(form.booking_date).toISOString(),
      });
    } finally {
      setSaving(false);
    }
  };

  if (vetLoading) return <div>Loading vet details...</div>;
  if (!vet) return <div>Vet not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12 flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 bg-white shadow-xl rounded-lg p-8">
        {/* Left side - Form */}
        <div>
          <h2 className="text-3xl font-extrabold text-green-900 mb-6 text-center md:text-left">
            Book Appointment with{" "}
            <span className="text-green-700">{vet.email}</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="farmer_name"
                value={form.farmer_name}
                onChange={handleChange}
                className={`w-full border rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 ${
                  errors.farmer_name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.farmer_name && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.farmer_name}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="farmer_phone"
                value={form.farmer_phone}
                onChange={handleChange}
                className={`w-full border rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 ${
                  errors.farmer_phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="+2347012345678"
              />
              {errors.farmer_phone && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.farmer_phone}
                </p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                name="booking_date"
                value={form.booking_date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className={`w-full border rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 ${
                  errors.booking_date ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.booking_date && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.booking_date}
                </p>
              )}
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Preferred Time
              </label>
              <select
                name="time_slot"
                value={form.time_slot}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="morning">Morning (8am - 12pm)</option>
                <option value="afternoon">Afternoon (12pm - 4pm)</option>
                <option value="evening">Evening (4pm - 7pm)</option>
              </select>
            </div>

            {/* Animal Type */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Animal Type
              </label>
              <select
                name="animal_type"
                value={form.animal_type}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="Cattle">Cattle</option>
                <option value="Birds">Birds</option>
                <option value="Goats">Goats</option>
                <option value="Sheep">Sheep</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Urgency
              </label>
              <select
                name="urgency"
                value={form.urgency}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="Normal">Normal</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Reason for Visit
              </label>
              <textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
                rows={4}
                className={`w-full border rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 ${
                  errors.reason ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Describe your concern"
              />
              {errors.reason && (
                <p className="text-red-600 text-sm mt-1">{errors.reason}</p>
              )}
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Any extra info"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-green-700 hover:bg-green-800 transition-colors text-white font-semibold rounded-md py-3 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Confirm Booking"}
            </button>
          </form>
        </div>

        {/* Right side - Previous Appointments */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold text-green-900 mb-6 text-center md:text-left">
            Your Previous Appointments
          </h3>

          {appointmentsLoading ? (
            <p>Loading appointments...</p>
          ) : previousAppointments?.length === 0 ? (
            <p className="text-gray-600 italic text-center md:text-left">
              No previous appointments found.
            </p>
          ) : (
            <ul className="space-y-5 overflow-y-auto max-h-[520px] px-3 py-2 border border-gray-300 rounded-md bg-gray-50 shadow-inner">
              {previousAppointments?.map((appt) => (
                <li
                  key={appt.id}
                  className="bg-white rounded-md p-4 shadow-sm border border-gray-200"
                >
                  <p className="font-medium text-green-800">
                    <strong>Date:</strong>{" "}
                    {new Date(appt.appointment_date).toLocaleDateString()} (
                    {appt.time_slot})
                  </p>
                  <p className="text-gray-700">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        appt.status === "pending"
                          ? "text-yellow-600"
                          : appt.status === "accepted"
                          ? "text-green-600"
                          : appt.status === "rescheduled"
                          ? "text-blue-600"
                          : appt.status === "completed"
                          ? "text-gray-600"
                          : "text-red-600"
                      }`}
                    >
                      {appt.status.charAt(0).toUpperCase() +
                        appt.status.slice(1)}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    <strong>Animal:</strong> {appt.animal_type} |{" "}
                    <strong>Urgency:</strong>{" "}
                    <span
                      className={
                        appt.urgency === "Emergency"
                          ? "text-red-600 font-semibold"
                          : ""
                      }
                    >
                      {appt.urgency}
                    </span>
                  </p>
                  <p className="text-gray-700 mt-1">
                    <strong>Reason:</strong> {appt.reason}
                  </p>
                  {appt.notes && (
                    <p className="text-gray-600 mt-1 italic">
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
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
