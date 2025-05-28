// src/components/AddAnimalModal.jsx
import React, { useState } from "react";

const AddAnimalModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: "",
    tagId: "",
    species: "Cow",
    breed: "",
    gender: "Male",
    date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.breed || !formData.tagId) {
      alert("Please fill in all fields.");
      return;
    }

    // Note: Status is NOT included (assumed to come from device)
    const animalWithDeviceStatus = {
      ...formData,
      status: "Pending", // device will update later
      deviceStatus: "Active",
    };

    onSave(animalWithDeviceStatus);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Register Animal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="id"
            placeholder="Animal ID"
            value={formData.id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="text"
            name="tagId"
            placeholder="Tag ID"
            value={formData.tagId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="text"
            name="breed"
            placeholder="Breed"
            value={formData.breed}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <select
            name="species"
            value={formData.species}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="Cow">Cow</option>
            <option value="Goat">Goat</option>
            <option value="Sheep">Sheep</option>
            <option value="Pig">Pig</option>
          </select>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnimalModal;
