import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "vet_appointments";

export default function BookAppointment() {
  const { id } = useParams();

  const vets = [
    { id: 1, name: "Vet Didi" },
    { id: 2, name: "Vet Daniel" },
    { id: 3, name: "Vet Henry" },
  ];

  const vet = vets.find((v) => v.id === parseInt(id));
  if (!vet) return <p className="p-4 text-red-600">Vet not found</p>;

  const [form, setForm] = useState({
    userName: "",
    phone: "",
    bookingDate: "",
    timeSlot: "morning",
    animalType: "Cattle",
    urgency: "Normal",
    reason: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [saving, setSaving] = useState(false);
  const [confirmationMsg, setConfirmationMsg] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const allAppointments = JSON.parse(stored);
      setAppointments(allAppointments);

      if (form.phone) {
        const filtered = allAppointments.filter(
          (a) => a.vetId === vet.id && a.phone === form.phone
        );
        setFilteredAppointments(filtered);
      }
    }
  }, []);

  useEffect(() => {
    if (appointments.length && form.phone) {
      const filtered = appointments.filter(
        (a) => a.vetId === vet.id && a.phone === form.phone
      );
      setFilteredAppointments(filtered);
    } else {
      setFilteredAppointments([]);
    }
  }, [form.phone, appointments]);

  const validate = () => {
    const errs = {};
    if (!form.userName.trim()) errs.userName = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    else if (!/^\+?\d{7,15}$/.test(form.phone.trim()))
      errs.phone = "Phone number invalid";
    if (!form.bookingDate) errs.bookingDate = "Date is required";
    else if (new Date(form.bookingDate) < new Date().setHours(0, 0, 0, 0))
      errs.bookingDate = "Date cannot be in the past";
    if (!form.reason.trim()) errs.reason = "Reason is required";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSaving(true);

    const newAppointment = {
      id: Date.now(),
      vetId: vet.id,
      vetName: vet.name,
      ...form,
      createdAt: new Date().toISOString(),
    };

    const updatedAppointments = [...appointments, newAppointment];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);

    setForm((f) => ({
      userName: "",
      phone: f.phone,
      bookingDate: "",
      timeSlot: "morning",
      animalType: "Cattle",
      urgency: "Normal",
      reason: "",
      notes: "",
    }));

    setConfirmationMsg("Appointment booked successfully!");
    setSaving(false);

    setFilteredAppointments((prev) => [...prev, newAppointment]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12 flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 bg-white shadow-xl rounded-lg p-8">
        {/* Left side - Form */}
        <div>
          <h2 className="text-3xl font-extrabold text-green-900 mb-6 text-center md:text-left">
            Book Appointment with <span className="text-green-700">{vet.name}</span>
          </h2>

          {confirmationMsg && (
            <div className="mb-6 bg-green-100 text-green-800 px-5 py-3 rounded text-center font-medium shadow-sm">
              {confirmationMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
              <input
                type="text"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                className={`w-full border rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 ${
                  errors.userName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.userName && (
                <p className="text-red-600 text-sm mt-1">{errors.userName}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`w-full border rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="+2347012345678"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Preferred Date</label>
              <input
                type="date"
                name="bookingDate"
                value={form.bookingDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className={`w-full border rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 ${
                  errors.bookingDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.bookingDate && (
                <p className="text-red-600 text-sm mt-1">{errors.bookingDate}</p>
              )}
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Preferred Time</label>
              <select
                name="timeSlot"
                value={form.timeSlot}
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
              <label className="block text-gray-700 font-semibold mb-2">Animal Type</label>
              <select
                name="animalType"
                value={form.animalType}
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
              <label className="block text-gray-700 font-semibold mb-2">Urgency</label>
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
              <label className="block text-gray-700 font-semibold mb-2">Reason for Visit</label>
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
              <label className="block text-gray-700 font-semibold mb-2">Additional Notes (Optional)</label>
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
            Your Previous Appointments with <span className="text-green-700">{vet.name}</span>
          </h3>

          {filteredAppointments.length === 0 ? (
            <p className="text-gray-600 italic text-center md:text-left">
              No previous appointments found.
            </p>
          ) : (
            <ul className="space-y-5 overflow-y-auto max-h-[520px] px-3 py-2 border border-gray-300 rounded-md bg-gray-50 shadow-inner">
              {filteredAppointments.map((appt) => (
                <li key={appt.id} className="bg-white rounded-md p-4 shadow-sm border border-gray-200">
                  <p className="font-medium text-green-800">
                    <strong>Date:</strong> {appt.bookingDate} ({appt.timeSlot})
                  </p>
                  <p className="text-gray-700">
                    <strong>Animal:</strong> {appt.animalType} | <strong>Urgency:</strong> {appt.urgency}
                  </p>
                  <p className="text-gray-700 mt-1">
                    <strong>Reason:</strong> {appt.reason}
                  </p>
                  {appt.notes && (
                    <p className="text-gray-600 mt-1 italic">
                      <strong>Notes:</strong> {appt.notes}
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
