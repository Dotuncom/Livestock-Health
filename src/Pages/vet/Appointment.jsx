//src/Pages/vet/Appointment.jsx
import React, { useState } from "react";
const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(19);
  const [month] = useState("May");
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const renderCalendar = (selected) => (
    <div>
      <div className="grid grid-cols-7 text-center text-sm font-medium mb-2">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {dates.map((date) => (
          <div
            key={date}
            className={`p-2 rounded cursor-pointer ${
              selectedDate === date
                ? "bg-black text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setSelectedDate(date)}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl font-semibold mb-4">Appointment</h1>
      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search"
          className="border rounded px-3 py-1 w-full sm:w-auto"
        />
        <button className="bg-gray-200 rounded px-4 py-1">David Farms</button>
        <button className="bg-gray-200 rounded px-4 py-1">Fav Cattles</button>
        <button className="bg-gray-200 rounded px-4 py-1">Musa Bello</button>
      </div>
      {/* Appointment Table */}
      <div className="overflow-auto bg-white p-4 rounded shadow mb-6">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-700 border-b">
              <th>Animal ID</th>
              <th>Temperature</th>
              <th>Heart Rate (BPM)</th>
              <th>Motion (Steps)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Cow #001</td>
              <td>200</td>
              <td>80</td>
              <td>200 per day</td>
              <td className="text-red-600 font-semibold">Critical</td>
            </tr>
            <tr>
              <td className="py-2">Cow #005</td>
              <td>88</td>
              <td>80</td>
              <td>400 per day</td>
              <td className="text-yellow-600 font-semibold">At Risk</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Date Picker */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="mb-4 font-semibold">Select Date - {month}</div>
        {renderCalendar(true)}
        <div className="flex gap-4 mt-4">
          <button className="bg-green-700 text-white px-4 py-2 rounded">
            Accept Appointment
          </button>
          <button className="border border-green-700 text-green-700 px-4 py-2 rounded">
            Reschedule Appointment
          </button>
        </div>
      </div>
      {/* Reschedule Section */}
      <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center gap-2 mb-4">
          <label className="font-semibold">Reschedule Appointment -</label>
          <select className="border px-2 py-1 rounded">
            <option>{month}</option>
            {/* Add more months if needed */}
          </select>
        </div>
        {renderCalendar(false)}
        <div className="flex gap-4 mt-4">
          <button className="bg-green-700 text-white px-4 py-2 rounded">
            Send
          </button>
          <button className="border border-green-700 text-green-700 px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default Appointment;
