//src/components/AppointmentList.jsx
// components/AppointmentList.jsx
import React from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";

const AppointmentList = ({ appointments }) => {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No appointments available
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rescheduled":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTimeSlotIcon = (timeSlot) => {
    switch (timeSlot.toLowerCase()) {
      case "morning":
        return "mdi:weather-sunny";
      case "afternoon":
        return "mdi:weather-partly-cloudy";
      case "evening":
        return "mdi:weather-night";
      default:
        return "mdi:clock-outline";
    }
  };

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-500 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Icon icon="mdi:calendar" className="w-5 h-5 text-gray-600" />
                <h4 className="font-medium text-gray-900">
                  {format(
                    new Date(appointment.appointment_date),
                    "MMMM d, yyyy"
                  )}
                </h4>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Icon
                  icon={getTimeSlotIcon(appointment.time_slot)}
                  className="w-5 h-5 text-gray-600"
                />
                <p className="text-gray-700">
                  {appointment.time_slot.charAt(0).toUpperCase() +
                    appointment.time_slot.slice(1)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:account" className="w-5 h-5 text-gray-600" />
                <p className="text-gray-700">
                  Farmer: {appointment.farmer_name || "Unknown"}
                </p>
              </div>
              {appointment.reason && (
                <p className="mt-2 text-sm text-gray-600">
                  Reason: {appointment.reason}
                </p>
              )}
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  appointment.status
                )}`}
              >
                {appointment.status.charAt(0).toUpperCase() +
                  appointment.status.slice(1)}
              </span>
              {appointment.urgency && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    appointment.urgency === "high"
                      ? "bg-red-100 text-red-800"
                      : appointment.urgency === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {appointment.urgency.charAt(0).toUpperCase() +
                    appointment.urgency.slice(1)}{" "}
                  Priority
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;
